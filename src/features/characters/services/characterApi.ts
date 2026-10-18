import axios from 'axios'
import { parseCharacter, parseCharacterList } from '../types/character'
import type { Character } from '../types/character'

const charactersApi = axios.create({
  baseURL: 'https://api.api-onepiece.com/v2',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
})

export async function getCharacters(
  signal?: AbortSignal,
): Promise<Character[]> {
  const response = await charactersApi.get<unknown>('/characters/en', {
    signal,
  })

  return parseCharacterList(response.data)
}

export async function getCharacter(
  id: string,
  signal?: AbortSignal,
): Promise<Character | null> {
  const response = await charactersApi.get<unknown>(
    `/characters/en/${encodeURIComponent(id)}`,
    { signal },
  )

  if (response.data === null) {
    return null
  }

  const character = parseCharacter(response.data)
  if (!character) {
    throw new Error('A API retornou dados inválidos para este personagem.')
  }

  return character
}
