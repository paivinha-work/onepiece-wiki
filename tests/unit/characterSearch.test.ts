import { describe, expect, it } from 'vitest'
import { searchCharacters } from '../../src/features/characters/services/searchCharacters'
import type { Character } from '../../src/features/characters/types/character'

const characters: Character[] = [
  { id: '1', name: 'Monkey D. Luffy' },
  { id: '2', name: 'Roronoa Zoro' },
  { id: '3', name: 'Éclair' },
  { id: '4', name: 'Luffy (East Blue)' },
]

describe('searchCharacters', () => {
  it('matches names without case, surrounding whitespace, or diacritic differences', () => {
    expect(searchCharacters(characters, '  ECLAIR ')).toEqual([
      characters[2],
    ])
    expect(searchCharacters(characters, 'MONKEY D. LUFFY')).toEqual([
      characters[0],
    ])
  })

  it('matches a name even when the query has punctuation absent from the source name', () => {
    expect(
      searchCharacters([{ id: '1', name: 'Monkey D Luffy' }], 'Monkey D. Luffy'),
    ).toEqual([{ id: '1', name: 'Monkey D Luffy' }])
  })

  it('returns all matching names and preserves their original order', () => {
    expect(searchCharacters(characters, 'luffy')).toEqual([
      characters[0],
      characters[3],
    ])
  })

  it('returns the full catalog for an empty query', () => {
    expect(searchCharacters(characters, '  ')).toEqual(characters)
  })

  it('returns an empty array when no name matches', () => {
    expect(searchCharacters(characters, 'Shanks')).toEqual([])
  })
})
