import { useQuery } from '@tanstack/react-query'
import { getCharacters } from '../services/characterApi'

export function useCharacters() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: ({ signal }) => getCharacters(signal),
  })
}
