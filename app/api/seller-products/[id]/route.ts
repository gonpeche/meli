import { NextResponse } from 'next/server'
import sellerProducts from '@/data/sellerProducts.json'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id')
    const sellerId = searchParams.get('seller_id')
    /*
      Placing the ID and seller ID here just because the data is hardcoded. 
      In a real scenario, I would fetch the seller products from the database.
    */

    if (!Array.isArray(sellerProducts)) {
      throw new Error('Seller products data is not in the expected format')
    }

    // Simulate data fetching time to trigger the loading state
    await new Promise((resolve) => setTimeout(resolve, 1800))

    return NextResponse.json(
      {
        data: sellerProducts,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error fetching seller products:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch seller products',
        data: [],
      },
      {
        status: 500,
      }
    )
  }
}
