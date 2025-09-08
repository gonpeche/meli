import { GET } from '@/app/api/related-products/[id]/route'
import relatedProducts from '@/data/relatedProductsCarrousel.json'

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: ResponseInit) => {
      const response = new Response(JSON.stringify(data), {
        ...init,
        headers: {
          ...init?.headers,
          'content-type': 'application/json',
        },
      })
      return response
    },
  },
}))

jest.mock('@/data/relatedProductsCarrousel.json', () => ({
  __esModule: true,
  default: [
    {
      id: '1',
      title: 'Product 1',
      price: 100,
      installments: { amount: 6, value: 16.67 },
    },
  ],
}))

describe('Related Products API', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('returns related products data', async () => {
    const promise = GET(new Request('http://localhost/api/related-products/123'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      data: [
        {
          id: '1',
          title: 'Product 1',
          price: 100,
          installments: { amount: 6, value: 16.67 },
        },
      ],
    })
    expect(response.status).toBe(200)
  })

  it('handles invalid data format', async () => {
    // Mock relatedProducts to be non-array
    jest.resetModules()
    jest.mock('@/data/relatedProductsCarrousel.json', () => 'invalid data', { virtual: true })

    // Re-import the GET function to use the new mock
    const { GET } = require('@/app/api/related-products/[id]/route')

    const promise = GET(new Request('http://localhost/api/related-products/123'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      error: 'Failed to fetch related products',
      data: [],
    })
    expect(response.status).toBe(500)
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching related products:',
      expect.any(Error)
    )
  })
})
