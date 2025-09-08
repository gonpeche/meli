import { GET } from '@/app/api/seller-products/[id]/route'
import sellerProducts from '@/data/sellerProducts.json'

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

jest.mock('@/data/sellerProducts.json', () => ({
  __esModule: true,
  default: [
    {
      id: '1',
      title: 'Product 1',
      price: 100,
      installments: { quantity: 6, amount: 16.67 },
    },
  ],
}))

describe('Seller Products API', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('returns seller products data', async () => {
    const promise = GET(new Request('http://localhost/api/seller-products/123?seller_id=456'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      data: [
        {
          id: '1',
          title: 'Product 1',
          price: 100,
          installments: { quantity: 6, amount: 16.67 },
        },
      ],
    })
    expect(response.status).toBe(200)
  })

  it('handles invalid data format', async () => {
    // Mock sellerProducts to be non-array
    jest.resetModules()
    jest.mock('@/data/sellerProducts.json', () => 'invalid data', { virtual: true })

    // Re-import the GET function to use the new mock
    const { GET } = require('@/app/api/seller-products/[id]/route')

    const promise = GET(new Request('http://localhost/api/seller-products/123?seller_id=456'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      error: 'Failed to fetch seller products',
      data: [],
    })
    expect(response.status).toBe(500)
    expect(console.error).toHaveBeenCalledWith('Error fetching seller products:', expect.any(Error))
  })
})
