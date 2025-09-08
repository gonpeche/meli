import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductSummary from '@/app/components/ProductSummary'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the dependencies
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

jest.mock('@/app/components/ProductHeading', () => {
  return function MockProductHeading() {
    return <div data-testid="product-heading">Product Heading</div>
  }
})

jest.mock('@/app/components/PriceSection', () => {
  return function MockPriceSection() {
    return <div data-testid="price-section">Price Section</div>
  }
})

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('ProductSummary', () => {
  const mockData = {
    item: {
      page_content: {
        item_summary: {
          attributes: {
            color: 'Space Gray',
            other_colors: ['/color1.jpg', '/color2.jpg', '/color3.jpg'],
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
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders all main components', () => {
    render(<ProductSummary />)

    // Check if main components are rendered
    expect(screen.getByTestId('product-heading')).toBeInTheDocument()
    expect(screen.getByTestId('price-section')).toBeInTheDocument()
  })

  it('displays color selection correctly', () => {
    render(<ProductSummary />)

    // Check color display
    expect(screen.getByText('Color:')).toBeInTheDocument()
    expect(screen.getByText('Space Gray')).toBeInTheDocument()

    // Check color variants
    const colorButtons = screen.getAllByRole('button')
    expect(colorButtons).toHaveLength(3)

    // First color should be selected by default
    expect(colorButtons[0]).toHaveClass('border-blue-500')
    expect(colorButtons[1]).toHaveClass('border-gray-300')
    expect(colorButtons[2]).toHaveClass('border-gray-300')
  })

  it('handles color selection correctly', () => {
    render(<ProductSummary />)

    const colorButtons = screen.getAllByRole('button')

    // Click second color
    fireEvent.click(colorButtons[1])
    expect(colorButtons[0]).toHaveClass('border-gray-300')
    expect(colorButtons[1]).toHaveClass('border-blue-500')
    expect(colorButtons[2]).toHaveClass('border-gray-300')

    // Click third color
    fireEvent.click(colorButtons[2])
    expect(colorButtons[0]).toHaveClass('border-gray-300')
    expect(colorButtons[1]).toHaveClass('border-gray-300')
    expect(colorButtons[2]).toHaveClass('border-blue-500')
  })

  it('displays product specifications correctly', () => {
    render(<ProductSummary />)

    // Check specifications heading
    expect(screen.getByText('Lo que tenés que saber de este producto')).toBeInTheDocument()

    // Check RAM specification
    expect(screen.getByText(/Memoria RAM: 8GB/)).toBeInTheDocument()

    // Check internal memory specification
    expect(screen.getByText(/Memoria interna de 256GB/)).toBeInTheDocument()

    // Check unlocked device text
    expect(
      screen.getByText('Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.')
    ).toBeInTheDocument()

    // Check "Ver características" link
    expect(screen.getByText('Ver características')).toBeInTheDocument()
  })

  it('displays buy options correctly', () => {
    render(<ProductSummary />)

    // Check buy options heading
    expect(screen.getByText('Opciones de compra:')).toBeInTheDocument()

    // Check new products option
    expect(screen.getByText(/5 productos nuevos desde \$ 999.99/)).toBeInTheDocument()

    // Check used products option
    expect(screen.getByText(/2 producto usado y reacondicionado/)).toBeInTheDocument()
  })
})
