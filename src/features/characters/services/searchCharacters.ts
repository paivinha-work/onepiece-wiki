import type { Character } from '../types/character'

function normalizeSearchTerm(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}]/gu, '')
}

export function searchCharacters(
  characters: readonly Character[],
  query: string,
): Character[] {
  const normalizedQuery = normalizeSearchTerm(query)

  if (!normalizedQuery) {
    return [...characters]
  }

  return characters.filter((character) =>
    normalizeSearchTerm(character.name).includes(normalizedQuery),
  )
}
