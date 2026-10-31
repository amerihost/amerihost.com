import assert from 'node:assert/strict';
import { test } from 'node:test';
import { matchesPortfolioSearch, portfolioIndustryTokens, portfolioSearchTokens } from './portfolio-search.ts';

// Synthetic fixtures only; public portfolio records are never bundled locally.
const project = {
  site_name: 'Example Precision',
  short_description: 'Custom components for global teams',
  industry: 'Defense, Aircraft, Commercial Manufacturing',
  project_type: 'Website Modernization',
  services: ['Website Design', 'DNS Management'],
  platform: 'Static HTML',
  website_url: 'https://example.com',
};
const matches = (query: string, value = project) =>
  matchesPortfolioSearch(portfolioIndustryTokens(value), portfolioSearchTokens(query));

for (const query of ['Defense', 'defense', 'Aircraft', 'Commercial', 'Manufacturing', 'Commercial Manufacturing']) {
  test(`Industry whole-word match: ${query}`, () => assert.equal(matches(query), true));
}

test('Land matches Land Development but not Sea Islands in the description', () => {
  assert.equal(matches('Land', { ...project, industry: 'Land Development' }), true);
  const taxi = {
    ...project, site_name: 'Happy Taxi Cab Co.',
    short_description: 'Serving Beaufort, the Lowcountry & Sea Islands in SC',
    industry: 'Transportation',
  };
  assert.equal(matches('Land', taxi), false);
  assert.equal(matches('Islands', taxi), false);
});

for (const [field, query] of [
  ['Site Name', 'Precision'],
  ['Short Description', 'components'],
  ['Project Type', 'Modernization'],
  ['Services', 'DNS'],
  ['Platform', 'HTML'],
  ['Website URL', 'example'],
]) {
  test(`does not search ${field}`, () => assert.equal(matches(query), false));
}

test('rejects arbitrary substrings and longer words', () => {
  for (const query of ['air', 'manufact', 'defenses']) assert.equal(matches(query), false);
  assert.equal(matches('Land', { ...project, industry: 'Islands' }), false);
});

test('requires all tokens in Industry, in any order', () => {
  assert.equal(matches('manufacturing defense'), true);
  assert.equal(matches('Commercial unavailable'), false);
  assert.equal(matches('Defense Precision'), false);
});

test('commas, slashes, ampersands, hyphens and whitespace separate words', () => {
  const value = { ...project, industry: 'Defense/Aircraft, Commercial&Manufacturing-Land\tDevelopment' };
  assert.deepEqual(portfolioIndustryTokens(value), ['defense', 'aircraft', 'commercial', 'manufacturing', 'land', 'development']);
  assert.equal(matches('DEFENSE, Aircraft/Commercial & Manufacturing-Land\nDevelopment', value), true);
});

test('empty search restores all results including blank Industry', () => {
  assert.equal(matches(' \t\n '), true);
  assert.equal(matches('', { ...project, industry: '' }), true);
  assert.equal(matches('Defense', { ...project, industry: '' }), false);
});

test('tokenization supports Unicode words and does not modify source records', () => {
  assert.deepEqual(portfolioSearchTokens('Énergie / Santé'), ['énergie', 'santé']);
  const before = JSON.stringify(project);
  assert.equal(matches('Defense'), true);
  assert.equal(JSON.stringify(project), before);
});
