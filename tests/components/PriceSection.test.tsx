import React from 'react'
import { render, screen } from '@testing-library/react'
import PriceSection from '@/app/components/PriceSection'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

describe('PriceSection', () => {
  const mockData = {
    item: {
      page_content: {
        item_summary: {
          pricing: {
            price: '999.99',
            installments: '12',
            installment_value: '83.33',
            tax_free_price: '826.44',
          },
        },
      },
    },
  }

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders price information correctly', () => {
    render(<PriceSection />)

    // Check main price
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('999.99')).toBeInTheDocument()

    // Check installments
    const installmentsText = screen.getByText((content) => content.includes('12 cuotas de'))
    expect(installmentsText).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('83.33'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('sin tarjeta'))).toBeInTheDocument()

    // Check tax-free price
    const taxFreePrice = screen.getByText((content) =>
      content.includes('Precio sin impuestos nacionales:')
    )
    expect(taxFreePrice).toBeInTheDocument()
    expect(taxFreePrice).toHaveTextContent('826.44')

    // Check payment methods link
    expect(screen.getByText('Ver los medios de pago')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<PriceSection />)

    // Check container classes
    const container = screen.getByText((content) => content.includes('999.99')).closest('div')
    expect(container).toHaveClass('flex', 'flex-col', 'gap-1', 'bg-white', 'p-3', 'md:p-0')

    // Check price classes
    const priceElement = screen.getByText((content) => content.includes('999.99')).closest('span')
    expect(priceElement).toHaveClass('text-[36px]', 'font-light')

    // Check tax-free price classes
    const taxFreePrice = screen.getByText((content) =>
      content.includes('Precio sin impuestos nacionales:')
    )
    expect(taxFreePrice).toHaveClass('text-xs', 'text-gray-500', 'md:text-md')

    // Check payment methods link classes
    const paymentLink = screen.getByText('Ver los medios de pago')
    expect(paymentLink).toHaveClass('action-link')
  })
})
