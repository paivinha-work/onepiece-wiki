import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CharactersPage from '../../src/pages/CharactersPage'

const { getCharacters } = vi.hoisted(() => ({
  getCharacters: vi.fn(),
}))

vi.mock('../../src/features/characters/services/characterApi', () => ({
  getCharacters,
  getCharacter: vi.fn(),
}))

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <CharactersPage />
    </QueryClientProvider>,
  )
}

describe('CharactersPage request states', () => {
  afterEach(() => {
    getCharacters.mockReset()
  })

  it('shows a loading message while the catalog is pending', () => {
    getCharacters.mockReturnValueOnce(new Promise(() => undefined))

    renderPage()

    expect(screen.getByText('Carregando personagens...')).toBeVisible()
  })

  it('shows a clear empty catalog state', async () => {
    getCharacters.mockResolvedValueOnce([])

    renderPage()

    expect(
      await screen.findByRole('status'),
    ).toHaveTextContent('Nenhum personagem está disponível no momento.')
  })

  it('allows retrying a failed catalog request', async () => {
    const user = userEvent.setup()
    getCharacters
      .mockRejectedValueOnce(new Error('Serviço indisponível'))
      .mockResolvedValueOnce([{ id: '1', name: 'Luffy' }])

    renderPage()

    expect(
      await screen.findByRole('heading', {
        name: 'Não foi possível carregar os personagens',
      }),
    ).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(await screen.findByRole('button', { name: 'Luffy' })).toBeVisible()
  })
})
