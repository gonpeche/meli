import { render, screen } from '@testing-library/react'
import { useProductData } from '@/app/hooks/useProductData'
import Home from '@/app/(routes)/page'

jest.mock('@/app/hooks/useProductData')
jest.mock('@/app/context/ProductContext', () => ({
  ContextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useContextProvider: () => ({
    item: {
      item_image: {
        images: [
          {
            url: 'test-image.jpg',
          },
        ],
      },
    },
  }),
}))
jest.mock('@/app/(routes)/components/DesktopTemplate', () => ({
  __esModule: true,
  default: () => <div data-testid="desktop-template">Desktop Template</div>,
}))
jest.mock('@/app/(routes)/components/MobileTemplate', () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-template">Mobile Template</div>,
}))
jest.mock('@/app/components/ui/LoadingScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-screen">Loading...</div>,
}))

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading screen when data is loading', () => {
    ;(useProductData as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(<Home />)

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('renders error message when there is an error', () => {
    const error = 'Test error'
    ;(useProductData as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    })

    render(<Home />)

    expect(screen.getByText(`Error loading product data: ${error}`)).toBeInTheDocument()
  })

  it('renders desktop and mobile templates when data is loaded', () => {
    const mockData = {
      id: '1',
      title: 'Test Product',
      price: 100,
      item_image: {
        images: [
          {
            url: 'test-image.jpg',
          },
        ],
      },
      seller: {
        id: '1',
        name: 'Test Seller',
        rating: 4.5,
        sales: 100,
      },
      specifications: [],
      description: 'Test description',
      condition: 'new',
      sold_count: 10,
      rating: 4.5,
      reviews: 100,
      installments: {
        quantity: 12,
        amount: 10,
      },
    }
    ;(useProductData as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    })

    render(<Home />)

    // Desktop template should be hidden on mobile
    const desktopContainer = screen.getByTestId('desktop-template').parentElement?.parentElement
    expect(desktopContainer).toHaveClass('hidden', 'md:block')

    // Mobile template should be hidden on desktop
    const mobileContainer = screen.getByTestId('mobile-template').parentElement
    expect(mobileContainer).toHaveClass('block', 'bg-white', 'md:hidden')
  })
})
