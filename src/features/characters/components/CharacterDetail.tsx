import { useState } from 'react'
import { useCharacter } from '../hooks/useCharacter'

interface CharacterDetailProps {
  id: string | null
}

interface FactProps {
  label: string
  value?: string
}

function Fact({ label, value }: FactProps) {
  if (!value) {
    return null
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-base font-medium text-slate-100">
        {value}
      </dd>
    </div>
  )
}

function getNestedName(value: Readonly<Record<string, unknown>> | undefined) {
  const name = value?.name
  return typeof name === 'string' && name.trim() ? name.trim() : undefined
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  const [showSpoilers, setShowSpoilers] = useState(false)
  const { data, error, isError, isPending, refetch } = useCharacter(id)

  if (id === null) {
    return (
      <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
        <span aria-hidden="true" className="text-5xl">
          ☠
        </span>
        <h2 className="mt-4 text-2xl font-bold text-white">
          Escolha um personagem
        </h2>
        <p className="mt-2 max-w-sm text-slate-400">
          Selecione alguém na lista para descobrir os dados disponíveis.
        </p>
      </section>
    )
  }

  if (isPending) {
    return (
      <section
        aria-live="polite"
        className="flex min-h-72 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-slate-300"
      >
        Carregando perfil...
      </section>
    )
  }

  if (isError) {
    return (
      <section
        role="alert"
        className="rounded-2xl border border-rose-300/20 bg-rose-950/30 p-6"
      >
        <h2 className="text-xl font-semibold text-rose-100">
          Não foi possível carregar este perfil
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
    )
  }

  if (!data) {
    return (
      <section
        role="status"
        className="rounded-2xl border border-amber-200/20 bg-amber-950/20 p-6 text-amber-100"
      >
        Personagem não encontrado na fonte de dados.
      </section>
    )
  }

  const crewName = getNestedName(data.crew)
  const fruitName = getNestedName(data.fruit)
  const hasSpoilerFields = Boolean(
    data.bounty || data.status || crewName || fruitName,
  )

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/20">
      <div className="border-b border-white/10 bg-gradient-to-br from-amber-300/15 via-orange-400/5 to-transparent p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
          Perfil de personagem
        </p>
        <h2 className="mt-3 break-words text-3xl font-black tracking-tight text-white sm:text-4xl">
          {data.name}
        </h2>
        {data.job && <p className="mt-2 text-lg text-slate-300">{data.job}</p>}
      </div>

      <div className="p-5 sm:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Informações disponíveis
        </h3>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Fact label="Idade" value={data.age} />
          <Fact label="Altura" value={data.size} />
          <Fact label="Aniversário" value={data.birthday} />
          {showSpoilers ? (
            <>
              <Fact label="Recompensa" value={data.bounty} />
              <Fact label="Estado" value={data.status} />
              <Fact label="Tripulação" value={crewName} />
              <Fact label="Fruta" value={fruitName} />
            </>
          ) : (
            hasSpoilerFields && (
              <div className="rounded-xl border border-amber-200/20 bg-amber-300/5 p-4 sm:col-span-2">
                <p className="text-sm text-amber-100">
                  Recompensa, estado, tripulação e fruta podem revelar
                  informações da trama.
                </p>
                <button
                  type="button"
                  onClick={() => setShowSpoilers(true)}
                  className="mt-3 rounded-lg border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-200/10"
                >
                  Revelar informações com spoilers
                </button>
              </div>
            )
          )}
        </dl>

        <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
          Dados fornecidos pela{' '}
          <a
            href="https://api-onepiece.com/en"
            target="_blank"
            rel="noreferrer"
            className="text-amber-200 underline underline-offset-2 hover:text-amber-100"
          >
            One Piece API
          </a>
          . Campos indisponíveis ou inválidos são omitidos.
        </p>
      </div>
    </article>
  )
}
