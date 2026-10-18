import { useState } from 'react'
import { CharacterDetail } from '../features/characters/components/CharacterDetail'
import { CharacterList } from '../features/characters/components/CharacterList'
import { useCharacters } from '../features/characters/hooks/useCharacters'

export default function CharactersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, error, isError, isPending, refetch } = useCharacters()

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-300 text-xl text-slate-950 shadow-lg shadow-amber-400/20"
          >
            ☠
          </span>
          <div>
            <a
              href="/"
              className="text-lg font-black tracking-tight text-white sm:text-xl"
            >
              One Piece Wiki
            </a>
            <p className="text-xs text-slate-400">Guia de personagens</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            O mundo de One Piece
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Conheça a tripulação.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Explore personagens e consulte as informações disponíveis na fonte
            de dados.
          </p>
        </div>

        {isPending ? (
          <section
            aria-live="polite"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-slate-300"
          >
            Carregando personagens...
          </section>
        ) : isError ? (
          <section
            role="alert"
            className="rounded-2xl border border-rose-300/20 bg-rose-950/30 p-6"
          >
            <h2 className="text-xl font-semibold text-rose-100">
              Não foi possível carregar os personagens
            </h2>
            <p className="mt-2 break-words text-sm text-rose-100/80">
              {error.message}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-lg bg-rose-100 px-4 py-2 font-semibold text-rose-950 hover:bg-white"
            >
              Tentar novamente
            </button>
          </section>
        ) : data.length === 0 ? (
          <section
            role="status"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300"
          >
            Nenhum personagem está disponível no momento.
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.7fr)]">
            <aside className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
              <CharacterList
                characters={data}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </aside>
            <CharacterDetail key={selectedId} id={selectedId} />
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-slate-500 sm:px-6 lg:px-8">
        Projeto de fã não oficial. Dados fornecidos pela One Piece API.
      </footer>
    </div>
  )
}
