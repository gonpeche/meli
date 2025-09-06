import { NextResponse } from 'next/server'
import relatedProducts from '@/data/relatedProducts.json'

export async function GET(request: Request) {
  try {
    /*
      const { searchParams } = new URL(request.url)
      const productId = searchParams.get('id')
      Placing the ID here just because the data is hardcoded. 
      In a real scenario, I would fetch the related products from the database.
    */

    if (!Array.isArray(relatedProducts)) {
      throw new Error('Related products data is not in the expected format')
    }

    return NextResponse.json(
      {
        data: relatedProducts,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error fetching related products:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch related products',
        data: [],
      },
      {
        status: 500,
      }
    )
  }
}
