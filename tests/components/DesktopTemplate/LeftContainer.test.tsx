import { render, screen } from '@testing-library/react'
import LeftContainer from '@/app/(routes)/components/DesktopTemplate/LeftContainer'

jest.mock('@/app/components/RelatedProductsCarrousel', () => ({
  __esModule: true,
  default: () => <div data-testid="related-products-carrousel">Related Products Carrousel</div>,
}))

jest.mock('@/app/components/SellerProductsCarrousel', () => ({
  __esModule: true,
  default: () => <div data-testid="seller-products-carrousel">Seller Products Carrousel</div>,
}))

jest.mock('@/app/components/ProductSpecifications', () => ({
  __esModule: true,
  default: () => <div data-testid="product-specifications">Product Specifications</div>,
}))

jest.mock('@/app/components/ProductDescription', () => ({
  __esModule: true,
  default: () => <div data-testid="product-description">Product Description</div>,
}))

jest.mock('@/app/components/ProductImage', () => ({
  __esModule: true,
  default: () => <div data-testid="product-image">Product Image</div>,
}))

jest.mock('@/app/components/ProductSummary', () => ({
  __esModule: true,
  default: () => <div data-testid="product-summary">Product Summary</div>,
}))

describe('LeftContainer', () => {
  it('renders all components with correct layout', () => {
    render(<LeftContainer />)

    // Check if all components are rendered
    expect(screen.getByTestId('product-image')).toBeInTheDocument()
    expect(screen.getByTestId('product-summary')).toBeInTheDocument()
    expect(screen.getByTestId('related-products-carrousel')).toBeInTheDocument()
    expect(screen.getByTestId('seller-products-carrousel')).toBeInTheDocument()
    expect(screen.getByTestId('product-specifications')).toBeInTheDocument()
    expect(screen.getByTestId('product-description')).toBeInTheDocument()

    // Check layout classes
    const imageAndSummaryContainer = screen.getByTestId('product-image').parentElement
    expect(imageAndSummaryContainer).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'md:flex-row',
      'md:border-b',
      'md:border-gray-200',
      'md:pb-10'
    )

    const summaryContainer = screen.getByTestId('product-summary').parentElement
    expect(summaryContainer).toHaveClass('max-w-[340px]')
  })
})
