import { matchesPortfolioSearch, portfolioIndustryTokens, portfolioSearchTokens } from './portfolio-search.ts';

type PortfolioProject = {
  site_name: string;
  website_url: string;
  short_description: string;
  industry: string;
  project_type: string;
  services: string[];
  platform: string;
  launch_year: string;
  featured: boolean;
  display_order: number;
  image_url: string;
  image_alt_text: string;
};

const search = document.querySelector<HTMLInputElement>('#portfolio-search')!;
const reset = document.querySelector<HTMLButtonElement>('#portfolio-reset')!;
const controls = document.querySelector<HTMLFieldSetElement>('#portfolio-controls')!;
const count = document.querySelector<HTMLElement>('#portfolio-count')!;
const state = document.querySelector<HTMLElement>('#portfolio-state')!;
const grid = document.querySelector<HTMLElement>('#portfolio-grid')!;
const empty = document.querySelector<HTMLElement>('#portfolio-empty')!;

const text = (value: unknown): string => typeof value === 'string' ? value.trim() : '';
function safeUrl(value: unknown): string {
  try {
    const url = new URL(text(value));
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function readProjects(payload: unknown): PortfolioProject[] {
  if (!Array.isArray(payload)) throw new Error('Unexpected portfolio response');
  return payload.filter((value): value is Record<string, unknown> => {
    if (!value || typeof value !== 'object') return false;
    // The public endpoint owns publication eligibility. Respect explicit flags
    // too if they are included in a future version of the response.
    return value.active !== false && value.is_active !== false &&
      value.public !== false && value.is_public !== false &&
      Boolean(text(value.site_name));
  }).map((value) => ({
    site_name: text(value.site_name),
    website_url: safeUrl(value.website_url),
    short_description: text(value.short_description),
    industry: text(value.industry),
    project_type: text(value.project_type),
    services: Array.isArray(value.services) ? value.services.map(text).filter(Boolean) : [],
    platform: text(value.platform),
    launch_year: typeof value.launch_year === 'number' ? String(value.launch_year) : text(value.launch_year),
    featured: value.featured === true,
    display_order: typeof value.display_order === 'number' ? value.display_order : Number.MAX_SAFE_INTEGER,
    image_url: safeUrl(value.image_url),
    image_alt_text: text(value.image_alt_text),
  })).sort((a, b) => Number(b.featured) - Number(a.featured) || a.display_order - b.display_order);
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K, className: string, content?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (content) node.textContent = content;
  return node;
}

function card(project: PortfolioProject): HTMLElement {
  const article = element('article', 'portfolio-card');
  if (project.image_url) {
    const image = element('img', 'portfolio-card__image');
    image.src = project.image_url;
    image.alt = project.image_alt_text;
    image.width = 1600;
    image.height = 1000;
    image.loading = 'lazy';
    image.decoding = 'async';
    article.append(image);
  }
  const body = element('div', 'portfolio-card__body');
  body.append(element('h2', 'portfolio-card__title', project.site_name));
  if (project.short_description) {
    body.append(element('p', 'portfolio-card__description', project.short_description));
  }
  const details = element('dl', 'portfolio-card__details');
  const fields = [
    ['Industry', project.industry],
    ['Project type', project.project_type],
    ['Services', project.services.join(', ')],
    ['Launch year', project.launch_year],
  ];
  for (const [label, value] of fields) {
    if (!value) continue;
    const row = element('div', '');
    row.append(element('dt', '', label), element('dd', '', value));
    details.append(row);
  }
  if (details.childElementCount) body.append(details);
  if (project.website_url) {
    const link = element('a', 'context-link portfolio-card__link', 'Visit Website');
    link.href = project.website_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Visit ${project.site_name} website (opens in a new tab)`);
    body.append(link);
  }
  article.append(body);
  return article;
}

async function loadPortfolio(): Promise<void> {
  try {
    const apiUrl = import.meta.env.DEV
      ? `${import.meta.env.BASE_URL}__portfolio-preview/api/public/portfolio`
      : 'https://portfolio.smbportals.com/api/public/portfolio';
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      credentials: 'omit',
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error('Portfolio unavailable');
    const projects = readProjects(await response.json());
    const cards = projects.map((project) => ({
      project,
      node: card(project),
      searchable: portfolioIndustryTokens(project),
    }));
    grid.replaceChildren(...cards.map(({ node }) => node));
    function filter(): void {
      const tokens = portfolioSearchTokens(search.value);
      let visible = 0;
      for (const { node, searchable } of cards) {
        const matches = matchesPortfolioSearch(searchable, tokens);
        node.hidden = !matches;
        if (matches) visible++;
      }
      count.textContent = `${visible} of ${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`;
      empty.hidden = visible !== 0 || projects.length === 0;
    }
    search.addEventListener('input', filter);
    reset.addEventListener('click', () => {
      search.value = '';
      filter();
      search.focus();
    });
    controls.disabled = projects.length === 0;
    state.hidden = projects.length > 0;
    if (!projects.length) state.textContent = 'Portfolio projects will be available here soon. Please check back later.';
    filter();
  } catch {
    state.textContent = 'Our portfolio is temporarily unavailable. Please try again later.';
    count.textContent = '';
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}

void loadPortfolio();
