import { NextResponse } from 'next/server'
import mockedItem from '@/data/item.json'

export async function GET() {
  // Simulate edge processing time (100-300ms is realistic for CDN)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100))

  return NextResponse.json(
    {
      data: mockedItem,
      cache: {
        hit: true,
        location: 'edge',
        ttl: 600,
      },
    },
    {
      status: 200,
    }
  )
}
