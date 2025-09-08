import React from 'react'
import { render, screen } from '@testing-library/react'
import RelatedProductsCarrousel from '@/app/components/RelatedProductsCarrousel'
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

describe('RelatedProductsCarrousel', () => {
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
    },
    {
      id: '2',
      title: 'Product 2',
      image: '/product2.jpg',
      price: 2000,
      installments: null,
      freeShipping: false,
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

    render(<RelatedProductsCarrousel />)

    const skeleton = screen.getByTestId('loading-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-type', 'relatedProducts')
  })

  it('renders nothing when there is an error', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error('Failed to fetch'),
    })

    const { container } = render(<RelatedProductsCarrousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when data is empty', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    })

    const { container } = render(<RelatedProductsCarrousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders related products correctly', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<RelatedProductsCarrousel />)

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

    // Check prices and discounts for first product
    expect(screen.getByText('$ 1,200')).toHaveClass('text-gray-400', 'line-through')
    expect(screen.getByText('$1,000')).toBeInTheDocument()
    expect(screen.getByText('17% OFF')).toHaveClass('text-green-500')

    // Check installments for first product
    const installmentsText = screen.getByText((content) =>
      content.includes('12 cuotas sin tarjeta de')
    )
    expect(installmentsText).toBeInTheDocument()
    expect(installmentsText).toHaveTextContent('83.33')

    // Check free shipping for first product
    expect(screen.getByText('Envío gratis')).toHaveClass('text-green-600')

    // Check price for second product (no discounts or installments)
    expect(screen.getByText((content) => content === '$2,000')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    ;(useRelatedProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<RelatedProductsCarrousel />)

    // Check container classes
    const container = screen.getByText('Productos relacionados').parentElement
    expect(container).toHaveClass('w-full', 'p-4', 'md:mt-8', 'md:p-0')

    // Check title classes
    const title = screen.getByText('Productos relacionados')
    expect(title).toHaveClass(
      'mb-1',
      'text-lg',
      'font-normal',
      'md:mb-1',
      'md:text-2xl',
      'md:font-medium'
    )

    // Check subtitle classes
    const subtitle = screen.getByText('Promocionado')
    expect(subtitle).toHaveClass('md:text-md', 'mb-4', 'text-xs', 'text-gray-600', 'md:mb-6')

    // Check products container classes
    const productsContainer = screen.getByText('Product 1').closest('div.flex.gap-4')
    expect(productsContainer).toHaveClass('flex', 'gap-4', 'overflow-x-auto', 'pb-4')

    // Check product card classes
    const productCard = screen.getByText('Product 1').closest('div[class*="max-w-[200px]"]')
    expect(productCard).toHaveClass(
      'max-w-[200px]',
      'min-w-[200px]',
      'cursor-pointer',
      'transition-shadow',
      'hover:shadow-lg',
      'md:max-w-[250px]',
      'md:min-w-[250px]'
    )
  })
})
