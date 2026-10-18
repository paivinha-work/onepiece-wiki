import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CharacterList } from '../../src/features/characters/components/CharacterList'
import type { Character } from '../../src/features/characters/types/character'

const characters: Character[] = [
  { id: '1', name: 'Monkey D. Luffy' },
  { id: '2', name: 'Roronoa Zoro' },
]

describe('CharacterList', () => {
  it('renders characters and lets the visitor select one by keyboard', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <CharacterList
        characters={characters}
        selectedId={null}
        onSelect={onSelect}
      />,
    )

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')

    expect(onSelect).toHaveBeenCalledWith('1')
    expect(
      screen.getByRole('heading', { name: 'Personagens' }),
    ).toBeVisible()
  })

  it('marks the selected character', () => {
    render(
      <CharacterList
        characters={characters}
        selectedId="2"
        onSelect={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Roronoa Zoro' })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  it('filters characters and displays an empty search state', () => {
    render(
      <CharacterList
        characters={characters}
        selectedId={null}
        onSelect={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: ' zOrO ' },
    })
    expect(
      screen.getByRole('button', { name: 'Roronoa Zoro' }),
    ).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Monkey D. Luffy' }),
    ).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Shanks' },
    })
    expect(screen.getByRole('status')).toHaveTextContent(
      'Nenhum personagem encontrado.',
    )
  })

  it('matches names without diacritics', () => {
    render(
      <CharacterList
        characters={[{ id: '3', name: 'Éclair' }]}
        selectedId={null}
        onSelect={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'eclair' },
    })

    expect(screen.getByRole('button', { name: 'Éclair' })).toBeVisible()
  })
})
