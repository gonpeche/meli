import { render, screen } from '@testing-library/react'
import RightContainer from '@/app/(routes)/components/DesktopTemplate/RightContainer'

jest.mock('@/app/components/SellerDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="seller-details">Seller Details</div>,
}))

jest.mock('@/app/components/BuySection', () => ({
  __esModule: true,
  default: () => <div data-testid="buy-section">Buy Section</div>,
}))

jest.mock('@/app/components/OtherSellersBuyOptions', () => ({
  __esModule: true,
  default: () => <div data-testid="other-sellers-buy-options">Other Sellers Buy Options</div>,
}))

jest.mock('@/app/components/PaymentOptions', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-options">Payment Options</div>,
}))

jest.mock('@/app/components/RelatedProductsList', () => ({
  __esModule: true,
  default: () => <div data-testid="related-products-list">Related Products List</div>,
}))

describe('RightContainer', () => {
  it('renders all components with correct layout', () => {
    render(<RightContainer />)

    // Check if all components are rendered
    expect(screen.getByTestId('buy-section')).toBeInTheDocument()
    expect(screen.getByTestId('seller-details')).toBeInTheDocument()
    expect(screen.getByTestId('other-sellers-buy-options')).toBeInTheDocument()
    expect(screen.getByTestId('payment-options')).toBeInTheDocument()
    expect(screen.getByTestId('related-products-list')).toBeInTheDocument()

    // Check layout classes
    const container = screen.getByTestId('buy-section').parentElement
    expect(container).toHaveClass('flex', 'flex-col', 'gap-4')
  })
})
