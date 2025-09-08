import { NextResponse } from 'next/server'
import paymentOptions from '@/data/paymentOptions.json'

export async function GET(request: Request) {
  try {
    /*
      const { searchParams } = new URL(request.url)
      const productId = searchParams.get('id')
      Placing the ID here just because the data is hardcoded. 
      In a real scenario, I would fetch the payment options from the database.
    */

    // Simulate data fetching time to trigger the loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!Array.isArray(paymentOptions)) {
      throw new Error('Payment options data is not in the expected format')
    }

    return NextResponse.json(
      {
        data: paymentOptions,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error fetching payment options:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch payment options',
        data: [],
      },
      {
        status: 500,
      }
    )
  }
}
