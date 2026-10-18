import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CharacterDetail } from '../../src/features/characters/components/CharacterDetail'
import type { Character } from '../../src/features/characters/types/character'

const { getCharacter } = vi.hoisted(() => ({
  getCharacter: vi.fn(),
}))

vi.mock('../../src/features/characters/services/characterApi', () => ({
  getCharacter,
  getCharacters: vi.fn(),
}))

const character: Character = {
  id: '1',
  name: 'Monkey D. Luffy',
  age: '19',
  job: 'Pirate',
  bounty: '3000000000',
  status: 'Alive',
  crew: { name: 'Straw Hat Pirates' },
  fruit: { name: 'Gomu Gomu no Mi' },
}

function renderDetail() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <CharacterDetail id="1" />
    </QueryClientProvider>,
  )
}

describe('CharacterDetail', () => {
  afterEach(() => {
    getCharacter.mockReset()
  })

  it('prompts the visitor to choose a character when none is selected', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterDetail id={null} />
      </QueryClientProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Escolha um personagem' })).toBeVisible()
    expect(getCharacter).not.toHaveBeenCalled()
  })

  it('shows available fields and hides spoiler-classified facts until requested', async () => {
    getCharacter.mockResolvedValueOnce(character)

    renderDetail()

    expect(
      await screen.findByRole('heading', { name: 'Monkey D. Luffy' }),
    ).toBeVisible()
    expect(screen.getByText('19')).toBeVisible()
    expect(screen.queryByText('3000000000')).not.toBeInTheDocument()
    expect(screen.queryByText('Straw Hat Pirates')).not.toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Revelar informações com spoilers' }),
    )

    expect(screen.getByText('3000000000')).toBeVisible()
    expect(screen.getByText('Straw Hat Pirates')).toBeVisible()
    expect(screen.getByText('Gomu Gomu no Mi')).toBeVisible()
  })

  it('omits unavailable optional fields', async () => {
    getCharacter.mockResolvedValueOnce({ id: '2', name: 'Nami' })

    renderDetail()

    expect(await screen.findByRole('heading', { name: 'Nami' })).toBeVisible()
    expect(screen.queryByText('Idade')).not.toBeInTheDocument()
    expect(screen.queryByText('Altura')).not.toBeInTheDocument()
  })

  it('allows retrying a failed profile request', async () => {
    const user = userEvent.setup()
    getCharacter
      .mockRejectedValueOnce(new Error('Serviço indisponível'))
      .mockResolvedValueOnce(character)

    renderDetail()

    expect(
      await screen.findByRole('heading', {
        name: 'Não foi possível carregar este perfil',
      }),
    ).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(
      await screen.findByRole('heading', { name: 'Monkey D. Luffy' }),
    ).toBeVisible()
  })
})
