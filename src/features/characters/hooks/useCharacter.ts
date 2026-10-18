import { useQuery } from '@tanstack/react-query'
import { getCharacter } from '../services/characterApi'

export function useCharacter(id: string | null) {
  return useQuery({
    queryKey: ['characters', id],
    queryFn: ({ signal }) => {
      if (id === null) {
        throw new Error('Selecione um personagem para carregar o perfil.')
      }

      return getCharacter(id, signal)
    },
    enabled: id !== null,
  })
}
