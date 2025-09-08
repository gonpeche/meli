import { GET } from '@/app/api/products/route'
import mockedItem from '@/data/item.json'

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

describe('Products API', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns mocked item data with cache information', async () => {
    const promise = GET()
    jest.runAllTimers()
    const response = await promise

    const data = await response.json()

    expect(data).toEqual({
      data: mockedItem,
      cache: {
        hit: true,
        location: 'edge',
        ttl: 600,
      },
    })
    expect(response.status).toBe(200)
  })
})
