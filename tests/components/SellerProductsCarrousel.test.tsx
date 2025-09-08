import React from 'react'
import { render, screen } from '@testing-library/react'
import SellerProductsCarrousel from '@/app/components/SellerProductsCarrousel'
import { useContextProvider } from '@/app/context/ProductContext'
import { useSellerProducts } from '@/app/hooks/useSellerProducts'

// Mock the dependencies
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

jest.mock('@/app/hooks/useSellerProducts', () => ({
  useSellerProducts: jest.fn(),
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

describe('SellerProductsCarrousel', () => {
  const mockProductId = '123'
  const mockSellerId = 'seller123'
  const mockProducts = [
    {
      id: '1',
      title: 'Product 1',
      image: '/product1.jpg',
      price: 1000,
      installments: {
        quantity: 12,
        amount: 83.33,
      },
    },
    {
      id: '2',
      title: 'Product 2',
      image: '/product2.jpg',
      price: 2000,
      installments: {
        quantity: 6,
        amount: 333.33,
      },
    },
  ]

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: {
        id: mockProductId,
        seller: {
          id: mockSellerId,
        },
      },
    })
  })

  it('renders loading skeleton while fetching data', () => {
    ;(useSellerProducts as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      error: null,
    })

    render(<SellerProductsCarrousel />)

    const skeleton = screen.getByTestId('loading-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-type', 'sellerProducts')
  })

  it('renders nothing when there is an error', () => {
    ;(useSellerProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error('Failed to fetch'),
    })

    const { container } = render(<SellerProductsCarrousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when data is empty', () => {
    ;(useSellerProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    })

    const { container } = render(<SellerProductsCarrousel />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders seller products correctly', () => {
    ;(useSellerProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<SellerProductsCarrousel />)

    // Check title
    expect(screen.getByText('Productos de Samsung')).toBeInTheDocument()

    // Check product titles
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()

    // Check product images
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('src', '/product1.jpg')
    expect(images[1]).toHaveAttribute('src', '/product2.jpg')

    // Check prices and installments
    const price1 = screen.getByText((content) => content === '$ 1,000')
    expect(price1).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes('12 cuotas sin tarjeta de'))
    ).toBeInTheDocument()
    expect(screen.getByText((content) => content === '$ 2,000')).toBeInTheDocument()
    expect(
      screen.getByText((content) => content.includes('6 cuotas sin tarjeta de'))
    ).toBeInTheDocument()

    // Check free shipping
    const freeShippingTexts = screen.getAllByText('Envío gratis')
    expect(freeShippingTexts).toHaveLength(2)
    freeShippingTexts.forEach((text) => {
      expect(text).toHaveClass('text-xs', 'text-green-500')
    })

    // Check "View more" link
    expect(screen.getByText('Ver más productos de Samsung')).toHaveClass(
      'action-link',
      'text-sm',
      'text-blue-500',
      'hover:text-blue-600'
    )
  })

  it('applies correct styling classes', () => {
    ;(useSellerProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      error: null,
    })

    render(<SellerProductsCarrousel />)

    // Check container classes
    const container = screen.getByText('Productos de Samsung').parentElement
    expect(container).toHaveClass('md:text-md', 'space-y-4', 'p-4', 'md:p-0', 'md:pt-3')

    // Check title classes
    const title = screen.getByText('Productos de Samsung')
    expect(title).toHaveClass('text-lg', 'font-normal', 'md:text-2xl', 'md:font-medium')

    // Check products container classes
    const productsContainer = screen.getByText('Product 1').closest('div.flex.flex-col.gap-4')
    expect(productsContainer).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'pb-4',
      'md:flex-row',
      'md:overflow-x-auto'
    )

    // Check product card classes
    const productCard = screen.getByText('Product 1').closest('div.w-full')
    expect(productCard).toHaveClass(
      'w-full',
      'cursor-pointer',
      'transition-shadow',
      'hover:shadow-md',
      'md:h-[140px]',
      'md:w-[350px]'
    )

    // Check product image container classes
    const imageContainer = screen.getAllByRole('img')[0].parentElement
    expect(imageContainer).toHaveClass(
      'relative',
      'h-[140px]',
      'w-[140px]',
      'flex-shrink-0',
      'md:h-full',
      'md:w-[110px]'
    )

    // Check product title classes
    const productTitle = screen.getByText('Product 1')
    expect(productTitle).toHaveClass('line-clamp-1', 'text-sm')

    // Check product price classes
    const productPrice = screen.getByText((content) => content === '$ 1,000')
    expect(productPrice).toHaveClass('text-xl', 'font-medium')

    // Check installments text classes
    const installmentsText = screen.getByText((content) =>
      content.includes('12 cuotas sin tarjeta de')
    )
    expect(installmentsText).toHaveClass('text-xs', 'text-gray-600')
  })
})
