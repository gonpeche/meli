import { Item } from '@/types'
import { useQuery } from '@tanstack/react-query'

export async function fetchProductData(): Promise<Item> {
  const response = await fetch(`http://localhost:3000/api/products`)
  if (!response.ok) {
    throw new Error('Failed to fetch product data')
  }
  const { data } = await response.json()
  return data
}

export function useProductData(): {
  data: Item
  isLoading: boolean
  error: string | null
} {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['productData'],
    queryFn: () => fetchProductData(),
    staleTime: 5 * 60 * 1000, // cached for 5 minutes
  })

  return {
    data: data ?? ({} as Item), // Provide default empty Item if data is undefined
    isLoading: isLoading || isFetching,
    error: error instanceof Error ? error.message : null,
  }
}
