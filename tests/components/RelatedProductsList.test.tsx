import React from 'react'
import { render, screen } from '@testing-library/react'
import RelatedProductsList from '@/app/components/RelatedProductsList'
import { useContextProvider } from '@/app/context/ProductContext'
import { useRelatedProducts } from '@/app/hooks/useRelatedProducts'

// Mock the dependencies
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

jest.mock('@/app/hooks/useRelatedProducts', () => ({
  useRelatedProducts: jest.fn(),
}))

// Mock the LoadingSkeleton component
jest.mock('@/app/components/ui/LoadingSkeleton', () => {
  return function MockLoadingSkeleton({ type }: { type: string }) {
    return (
      <div data-testid="loading-skeleton" data-type={type}>
        Loading...
      </div>
    )
  }
})

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('RelatedProductsList', () => {
  const mockProductId = '123'
  const mockProducts = [
    {
      id: '1',
      title: 'Product 1',
      image: '/product1.jpg',
      price: 1000,
      originalPrice: 1200,
      discount: 17,
      installments: {
        amount: 12,
        value: 83.33,
      },
      freeShipping: true,
      fullDelivery: true,
    },
    {
      id: '2',
      title: 'Product 2',
      image: '/product2.jpg',
      price: 2000,
      originalPrice: 2000,
      discount: null,
      installments: {
        amount: 6,
        value: 333.33,
      },
      freeShipping: false,
      fullDelivery: false,
    },
  ]

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: { id: mockProductId },
    })
  })

  it('renders loading skeleton while fetching data', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      error: null,
    })

    render(<RelatedProductsList />)

    const skeleton = screen.getByTestId('loading-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-type', 'relatedProductsList')
  })

  it('renders nothing when there is an error', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error('Failed to fetch'),
    })

    const { container } = render(<RelatedProductsList />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when data is empty', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    })

    const { container } = render(<RelatedProductsList />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders related products correctly', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<RelatedProductsList />)

    // Check title and subtitle
    expect(screen.getByText('Productos relacionados')).toBeInTheDocument()
    expect(screen.getByText('Promocionado')).toBeInTheDocument()

    // Check product titles
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()

    // Check product images
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', '/product1.jpg')
    expect(images[1]).toHaveAttribute('src', '/product2.jpg')

    // Check first product details
    expect(screen.getByText('$ 1.200')).toHaveClass('text-gray-400', 'line-through')
    expect(screen.getByText('$ 1.000')).toBeInTheDocument()
    expect(screen.getByText('17% OFF')).toHaveClass('text-green-500')
    expect(screen.getByText('12 cuotas de $ 83,33')).toBeInTheDocument()
    expect(screen.getByText('Envío gratis ⚡ FULL')).toHaveClass('text-green-500')

    // Check second product details (no discount, no free shipping)
    expect(screen.getByText('$ 2.000')).toBeInTheDocument()
    expect(screen.getByText('6 cuotas de $ 333,33')).toBeInTheDocument()
    expect(screen.queryByText('Envío gratis')).not.toBeInTheDocument()
    expect(screen.queryByText('⚡ FULL')).not.toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<RelatedProductsList />)

    // Check container classes
    const container = screen.getByText('Productos relacionados').closest('div.space-y-4')
    expect(container).toHaveClass('space-y-4')

    // Check title classes
    const title = screen.getByText('Productos relacionados')
    expect(title).toHaveClass('text-md', 'font-medium')

    // Check subtitle classes
    const subtitle = screen.getByText('Promocionado')
    expect(subtitle).toHaveClass('text-sm', 'text-gray-500')

    // Check product list container classes
    const productList = screen.getByText('Product 1').closest('div.space-y-6')
    expect(productList).toHaveClass('space-y-6')

    // Check product card classes
    const productLink = screen.getByText('Product 1').closest('a')
    expect(productLink).toHaveClass('block', 'hover:no-underline')

    // Check product image container classes
    const imageContainer = screen.getAllByRole('img')[0].parentElement
    expect(imageContainer).toHaveClass('h-20', 'w-20', 'flex-shrink-0')

    // Check product title classes
    const productTitle = screen.getByText('Product 1')
    expect(productTitle).toHaveClass('line-clamp-2', 'text-sm', 'text-gray-600')
  })
})
