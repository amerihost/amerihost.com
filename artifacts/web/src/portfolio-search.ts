export function portfolioIndustryTokens(project: { industry: string }): string[] {
  return portfolioSearchTokens(project.industry);
}

export function portfolioSearchTokens(query: string): string[] {
  // Punctuation (including commas, slashes, ampersands and hyphens)
  // separates words, as does whitespace. Preserve Unicode letters/digits.
  return query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}

export function matchesPortfolioSearch(industryTokens: string[], tokens: string[]): boolean {
  return tokens.every((token) => industryTokens.includes(token));
}
