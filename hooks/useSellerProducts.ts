import { SellerProduct } from '@/types'
import { useQuery } from '@tanstack/react-query'

export async function fetchSellerProducts(
  productId: string,
  sellerId: string
): Promise<SellerProduct[]> {
  const response = await fetch(`/api/seller-products/${productId}&seller_id=${sellerId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch seller products')
  }
  const { data } = await response.json()
  return data
}

export function useSellerProducts(productId: string, sellerId: string) {
  const {
    data = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['sellerProducts'],
    queryFn: () => fetchSellerProducts(productId, sellerId),
    staleTime: 5 * 60 * 1000, // cached for 5 minutes
  })

  return {
    data,
    isLoading: isLoading || isFetching,
    error: error instanceof Error ? error.message : null,
  }
}
