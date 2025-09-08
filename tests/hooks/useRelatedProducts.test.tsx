import { renderHook, waitFor } from '@testing-library/react'
import { useRelatedProducts, fetchRelatedProducts } from '@/app/hooks/useRelatedProducts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// Mock fetch
global.fetch = jest.fn()

describe('useRelatedProducts', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    ;(global.fetch as jest.Mock).mockClear()
  })

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('fetches related products successfully', async () => {
    const mockData = {
      data: [
        {
          id: '1',
          title: 'Product 1',
          image: '/product1.jpg',
          price: 1000,
          originalPrice: 1200,
          discount: 17,
          installments: {
            amount: 12,
            value: 83.33,
          },
          freeShipping: true,
          fullDelivery: true,
        },
        {
          id: '2',
          title: 'Product 2',
          image: '/product2.jpg',
          price: 2000,
          originalPrice: 2000,
          discount: null,
          installments: {
            amount: 6,
            value: 333.33,
          },
          freeShipping: false,
          fullDelivery: false,
        },
      ],
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() => useRelatedProducts('123'), { wrapper })

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual([])
    expect(result.current.error).toBeNull()

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData.data)
    expect(result.current.error).toBeNull()
    expect(global.fetch).toHaveBeenCalledWith('/api/related-products/123')
  })

  it('handles fetch error correctly', async () => {
    const errorMessage = 'Failed to fetch related products'
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useRelatedProducts('123'), { wrapper })

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual([])
    expect(result.current.error).toBeNull()

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.error).toBe(errorMessage)
  })

  it('handles non-ok response correctly', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    const { result } = renderHook(() => useRelatedProducts('123'), { wrapper })

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.error).toBe('Failed to fetch related products')
  })

  describe('fetchRelatedProducts', () => {
    it('fetches and returns data correctly', async () => {
      const mockData = {
        data: [
          {
            id: '1',
            title: 'Product 1',
            image: '/product1.jpg',
            price: 1000,
            originalPrice: 1200,
            discount: 17,
            installments: {
              amount: 12,
              value: 83.33,
            },
            freeShipping: true,
            fullDelivery: true,
          },
        ],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchRelatedProducts('123')
      expect(result).toEqual(mockData.data)
      expect(global.fetch).toHaveBeenCalledWith('/api/related-products/123')
    })

    it('throws error for non-ok response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(fetchRelatedProducts('123')).rejects.toThrow('Failed to fetch related products')
    })

    it('throws error when fetch fails', async () => {
      const errorMessage = 'Network error'
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

      await expect(fetchRelatedProducts('123')).rejects.toThrow(errorMessage)
    })
  })
})
