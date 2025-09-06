import { PaymentMethodGroup } from '@/types'
import { useQuery } from '@tanstack/react-query'

export async function fetchPaymentOptions(productId: string): Promise<PaymentMethodGroup[]> {
  const response = await fetch(`/api/payment-options/${productId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch payment options')
  }
  const { data } = await response.json()
  return data
}

export function usePaymentOptions(productId: string) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['paymentOptions', productId],
    queryFn: () => fetchPaymentOptions(productId),
    staleTime: 5 * 60 * 1000, // cached for 5 minutes
  })

  return {
    data,
    isLoading: isLoading || isFetching,
    error: error instanceof Error ? error.message : null,
  }
}
