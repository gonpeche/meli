import { renderHook, waitFor } from '@testing-library/react'
import { useProductData, fetchProductData } from '@/app/hooks/useProductData'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// Mock fetch
global.fetch = jest.fn()

describe('useProductData', () => {
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

  it('fetches product data successfully', async () => {
    const mockData = {
      data: {
        id: '123',
        header: {
          breadcrumbs: ['Home', 'Electronics'],
          suggestions: ['iPhone', 'Samsung'],
        },
        page_content: {
          item_summary: {
            header: {
              title: 'Test Product',
              rating: 4.5,
              reviews: 100,
            },
            attributes: {
              condition: 'New',
              sold: 50,
              color: 'Black',
              other_colors: ['/color1.jpg'],
            },
            product_specifications: {
              memory_ram: '8GB',
              internal_memory: '256GB',
            },
            buy_options: {
              new_products: 5,
              used_products: 2,
            },
            pricing: {
              price: '999.99',
            },
          },
          item_image: {
            images: ['/image1.jpg'],
          },
        },
      },
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() => useProductData(), { wrapper })

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual({})
    expect(result.current.error).toBeNull()

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData.data)
    expect(result.current.error).toBeNull()
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/products')
  })

  it('handles fetch error correctly', async () => {
    const errorMessage = 'Failed to fetch product data'
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useProductData(), { wrapper })

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual({})
    expect(result.current.error).toBeNull()

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual({})
    expect(result.current.error).toBe(errorMessage)
  })

  it('handles non-ok response correctly', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    const { result } = renderHook(() => useProductData(), { wrapper })

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual({})
    expect(result.current.error).toBe('Failed to fetch product data')
  })

  describe('fetchProductData', () => {
    it('fetches and returns data correctly', async () => {
      const mockData = {
        data: {
          id: '123',
          header: {
            breadcrumbs: ['Home', 'Electronics'],
          },
          page_content: {
            item_summary: {
              header: {
                title: 'Test Product',
              },
            },
          },
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchProductData()
      expect(result).toEqual(mockData.data)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/products')
    })

    it('throws error for non-ok response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(fetchProductData()).rejects.toThrow('Failed to fetch product data')
    })

    it('throws error when fetch fails', async () => {
      const errorMessage = 'Network error'
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

      await expect(fetchProductData()).rejects.toThrow(errorMessage)
    })
  })
})
