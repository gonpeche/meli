import { RelatedProduct } from '@/types'
import { useQuery } from '@tanstack/react-query'

export async function fetchRelatedProducts(productId: string): Promise<RelatedProduct[]> {
  const response = await fetch(`/api/related-products/${productId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch related products')
  }
  const { data } = await response.json()
  return data
}

export function useRelatedProducts(productId: string) {
  const {
    data = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['relatedProducts'],
    queryFn: () => fetchRelatedProducts(productId),
    staleTime: 5 * 60 * 1000, // cached for 5 minutes
  })

  return {
    data,
    isLoading: isLoading || isFetching,
    error: error instanceof Error ? error.message : null,
  }
}
