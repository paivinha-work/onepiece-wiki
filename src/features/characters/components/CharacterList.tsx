import { useMemo, useState } from 'react'
import { searchCharacters } from '../services/searchCharacters'
import type { Character } from '../types/character'

interface CharacterListProps {
  characters: Character[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function CharacterList({
  characters,
  selectedId,
  onSelect,
}: CharacterListProps) {
  const [query, setQuery] = useState('')
  const filteredCharacters = useMemo(
    () => searchCharacters(characters, query),
    [characters, query],
  )

  return (
    <section aria-labelledby="character-list-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="character-list-heading"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200"
        >
          Personagens
        </h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {characters.length}
        </span>
      </div>

      <label
        htmlFor="character-search"
        className="mb-3 block text-sm font-medium text-slate-300"
      >
        Pesquisar personagem
      </label>
      <input
        id="character-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Ex.: Luffy"
        autoComplete="off"
        className="mb-3 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-base text-white placeholder:text-slate-500"
      />

      {filteredCharacters.length === 0 ? (
        <p role="status" className="rounded-xl bg-white/5 p-4 text-sm text-slate-300">
          Nenhum personagem encontrado.
        </p>
      ) : (
        <ul className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {filteredCharacters.map((character) => {
            const isSelected = character.id === selectedId

            return (
              <li key={character.id}>
                <button
                  type="button"
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelect(character.id)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? 'bg-amber-300 text-slate-950'
                      : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isSelected
                        ? 'bg-slate-950/10 text-slate-950'
                        : 'bg-amber-300/10 text-amber-200'
                    }`}
                  >
                    {character.name.slice(0, 1).toLocaleUpperCase()}
                  </span>
                  <span className="truncate font-medium">
                    {character.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
