import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CharacterList } from '../../src/features/characters/components/CharacterList'

describe('character list accessibility', () => {
  it('exposes a named section and buttons operable through native keyboard controls', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <CharacterList
        characters={[{ id: '1', name: 'Luffy' }]}
        selectedId={null}
        onSelect={onSelect}
      />,
    )

    const button = screen.getByRole('button', { name: 'Luffy' })
    expect(
      screen.getByRole('region', { name: 'Personagens' }),
    ).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('1')
  })
})
