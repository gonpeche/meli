import { GET } from '@/app/api/payment-options/[id]/route'

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

jest.mock('@/data/paymentOptions.json', () => ({
  __esModule: true,
  default: [
    {
      id: '1',
      name: 'Credit Card',
      installments: [
        { quantity: 6, amount: 16.67 },
        { quantity: 12, amount: 8.33 },
      ],
    },
  ],
}))

describe('Payment Options API', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('returns payment options data', async () => {
    const promise = GET(new Request('http://localhost/api/payment-options/123'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      data: [
        {
          id: '1',
          name: 'Credit Card',
          installments: [
            { quantity: 6, amount: 16.67 },
            { quantity: 12, amount: 8.33 },
          ],
        },
      ],
    })
    expect(response.status).toBe(200)
  })

  it('handles errors', async () => {
    // Mock paymentOptions to be a non-array value
    jest.resetModules()
    jest.mock('@/data/paymentOptions.json', () => ({
      __esModule: true,
      default: 'not an array',
    }))

    // Re-import the GET function to use the new mock
    const { GET } = require('@/app/api/payment-options/[id]/route')

    const promise = GET(new Request('http://localhost/api/payment-options/123'))
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      error: 'Failed to fetch payment options',
      data: [],
    })
    expect(response.status).toBe(500)
    expect(console.error).toHaveBeenCalledWith('Error fetching payment options:', expect.any(Error))
  })
})
