const search = document.querySelector<HTMLInputElement>('[data-glossary-search]');
const clear = document.querySelector<HTMLButtonElement>('[data-glossary-clear]');
const printButton = document.querySelector<HTMLButtonElement>('[data-glossary-print]');
const count = document.querySelector<HTMLElement>('#glossary-count');
const empty = document.querySelector<HTMLElement>('#glossary-empty');

if (search && clear && count && empty) {
  const categories = Array.from(
    document.querySelectorAll<HTMLElement>('[data-glossary-category]'),
    (element) => ({
      element,
      entries: Array.from(
        element.querySelectorAll<HTMLElement>('[data-glossary-entry]'),
        (entry) => ({
          element: entry,
          text: (entry.textContent ?? '').toLowerCase(),
        }),
      ),
    }),
  );
  const total = categories.reduce((sum, category) => sum + category.entries.length, 0);

  const filter = () => {
    const query = search.value.trim().toLowerCase();
    let matches = 0;
    for (const category of categories) {
      let categoryMatches = 0;
      for (const entry of category.entries) {
        const visible = entry.text.includes(query);
        entry.element.hidden = !visible;
        if (visible) categoryMatches++;
      }
      category.element.hidden = categoryMatches === 0;
      matches += categoryMatches;
    }
    count.textContent = query
      ? `${matches} of ${total} terms shown.`
      : `${total} terms across ${categories.length} categories.`;
    empty.hidden = matches !== 0;
  };

  search.addEventListener('input', filter);
  // Some browsers emit "search" when their native search-field Clear control is used.
  search.addEventListener('search', filter);
  clear.addEventListener('click', () => {
    search.value = '';
    filter();
    search.focus();
  });
  window.addEventListener('pageshow', filter);
  filter();
}

printButton?.addEventListener('click', () => window.print());

export {};
