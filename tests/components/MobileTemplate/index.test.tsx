import { render, screen } from '@testing-library/react'
import MobileTemplate from '@/app/(routes)/components/MobileTemplate'

jest.mock('@/app/components/ProductHeading', () => ({
  __esModule: true,
  default: () => <div data-testid="product-heading">Product Heading</div>,
}))

jest.mock('@/app/components/ProductImage', () => ({
  __esModule: true,
  default: () => <div data-testid="product-image">Product Image</div>,
}))

jest.mock('@/app/components/PriceSection', () => ({
  __esModule: true,
  default: () => <div data-testid="price-section">Price Section</div>,
}))

jest.mock('@/app/components/BuySection', () => ({
  __esModule: true,
  default: () => <div data-testid="buy-section">Buy Section</div>,
}))

jest.mock('@/app/components/OtherSellersBuyOptions', () => ({
  __esModule: true,
  default: () => <div data-testid="other-sellers-buy-options">Other Sellers Buy Options</div>,
}))

jest.mock('@/app/components/ProductSpecifications', () => ({
  __esModule: true,
  default: () => <div data-testid="product-specifications">Product Specifications</div>,
}))

jest.mock('@/app/components/RelatedProductsCarrousel', () => ({
  __esModule: true,
  default: () => <div data-testid="related-products-carrousel">Related Products Carrousel</div>,
}))

jest.mock('@/app/components/SellerDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="seller-details">Seller Details</div>,
}))

jest.mock('@/app/components/ProductDescription', () => ({
  __esModule: true,
  default: () => <div data-testid="product-description">Product Description</div>,
}))

jest.mock('@/app/components/SellerProductsCarrousel', () => ({
  __esModule: true,
  default: () => <div data-testid="seller-products-carrousel">Seller Products Carrousel</div>,
}))

jest.mock('@/app/components/PaymentOptions', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-options">Payment Options</div>,
}))

describe('MobileTemplate', () => {
  it('renders all components in the correct order', () => {
    render(<MobileTemplate />)

    // Check if all components are rendered
    expect(screen.getByTestId('mobile-template')).toBeInTheDocument()
    expect(screen.getByTestId('product-heading')).toBeInTheDocument()
    expect(screen.getByTestId('product-image')).toBeInTheDocument()
    expect(screen.getByTestId('price-section')).toBeInTheDocument()
    expect(screen.getByTestId('buy-section')).toBeInTheDocument()
    expect(screen.getByTestId('other-sellers-buy-options')).toBeInTheDocument()
    expect(screen.getByTestId('product-specifications')).toBeInTheDocument()
    expect(screen.getByTestId('related-products-carrousel')).toBeInTheDocument()
    expect(screen.getByTestId('seller-details')).toBeInTheDocument()
    expect(screen.getByTestId('product-description')).toBeInTheDocument()
    expect(screen.getByTestId('seller-products-carrousel')).toBeInTheDocument()
    expect(screen.getByTestId('payment-options')).toBeInTheDocument()

    // Check the order of components
    const container = screen.getByTestId('mobile-template')
    const children = Array.from(container.children)
    const expectedOrder = [
      'product-heading',
      'product-image',
      'price-section',
      'buy-section',
      'other-sellers-buy-options',
      'product-specifications',
      'related-products-carrousel',
      'seller-details',
      'product-description',
      'seller-products-carrousel',
      'payment-options',
    ]

    children.forEach((child, index) => {
      expect(child).toHaveAttribute('data-testid', expectedOrder[index])
    })
  })
})
