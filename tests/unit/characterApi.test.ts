import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getCharacter,
  getCharacters,
} from '../../src/features/characters/services/characterApi'
import {
  parseCharacter,
  parseCharacterList,
} from '../../src/features/characters/types/character'

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get })),
  },
}))

describe('character API parsing', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('normalizes API ids and known numeric text fields', () => {
    expect(
      parseCharacter({
        id: 1,
        name: 'Luffy',
        age: 19,
        bounty: 3000000000,
      }),
    ).toEqual({
      id: '1',
      name: 'Luffy',
      age: '19',
      bounty: '3000000000',
    })
  })

  it('omits invalid records and optional values from a catalog response', () => {
    expect(
      parseCharacterList([
        { id: 1, name: 'Luffy', job: null },
        { id: 2, name: '   ' },
        null,
        { id: 3, name: 'Zoro', crew: 'not an object' },
      ]),
    ).toEqual([
      { id: '1', name: 'Luffy' },
      { id: '3', name: 'Zoro' },
    ])
  })

  it('rejects a non-array catalog response', () => {
    expect(() => parseCharacterList({ id: 1, name: 'Luffy' })).toThrow(
      'A API retornou um catálogo de personagens inválido.',
    )
  })

  it('surfaces Axios failures instead of converting them into successful data', async () => {
    get.mockRejectedValueOnce(new Error('Network unavailable'))

    await expect(getCharacters()).rejects.toThrow('Network unavailable')
  })

  it('treats a null detail response as a missing character', async () => {
    get.mockResolvedValueOnce({ data: null })

    await expect(getCharacter('404')).resolves.toBeNull()
  })

  it('rejects malformed detail data', async () => {
    get.mockResolvedValueOnce({ data: { id: 1, name: ' ' } })

    await expect(getCharacter('1')).rejects.toThrow(
      'A API retornou dados inválidos para este personagem.',
    )
  })

  it('requests the documented catalog and detail endpoints', async () => {
    get.mockResolvedValueOnce({ data: [{ id: 1, name: 'Luffy' }] })
    get.mockResolvedValueOnce({ data: { id: 1, name: 'Luffy' } })

    await getCharacters()
    await getCharacter('1/2')

    expect(get).toHaveBeenNthCalledWith(1, '/characters/en', {
      signal: undefined,
    })
    expect(get).toHaveBeenNthCalledWith(2, '/characters/en/1%2F2', {
      signal: undefined,
    })
  })
})
