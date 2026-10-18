export interface Character {
  id: string
  name: string
  job?: string
  size?: string
  birthday?: string
  age?: string
  bounty?: string
  status?: string
  crew?: Readonly<Record<string, unknown>>
  fruit?: Readonly<Record<string, unknown>>
}

const optionalTextFields = [
  'job',
  'size',
  'birthday',
  'age',
  'bounty',
  'status',
] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return undefined
}

function normalizeNestedRecord(
  value: unknown,
): Readonly<Record<string, unknown>> | undefined {
  return isRecord(value) ? value : undefined
}

export function parseCharacter(value: unknown): Character | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const id = normalizeText(value.id)
  const name = normalizeText(value.name)

  if (!id || !name) {
    return undefined
  }

  const character: Character = { id, name }

  for (const field of optionalTextFields) {
    const normalized = normalizeText(value[field])
    if (normalized) {
      character[field] = normalized
    }
  }

  const crew = normalizeNestedRecord(value.crew)
  if (crew) {
    character.crew = crew
  }

  const fruit = normalizeNestedRecord(value.fruit)
  if (fruit) {
    character.fruit = fruit
  }

  return character
}

export function parseCharacterList(value: unknown): Character[] {
  if (!Array.isArray(value)) {
    throw new Error('A API retornou um catálogo de personagens inválido.')
  }

  return value.flatMap((item) => {
    const character = parseCharacter(item)
    return character ? [character] : []
  })
}
