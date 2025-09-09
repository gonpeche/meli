import React from 'react'
import { render, screen } from '@testing-library/react'
import PaymentOptions from '@/app/components/PaymentOptions'
import { useContextProvider } from '@/app/context/ProductContext'
import { usePaymentOptions } from '@/app/hooks/usePaymentOptions'

// Mock the context provider and hooks
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

jest.mock('@/app/hooks/usePaymentOptions', () => ({
  usePaymentOptions: jest.fn(),
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

describe('PaymentOptions', () => {
  const mockProductId = '123'
  const mockPaymentData = [
    {
      id: 'credit',
      title: 'Tarjetas de crédito',
      methods: [
        {
          name: 'visa',
          logo: '/visa.png',
          alt: 'Visa',
          width: 40,
          height: 25,
        },
        {
          name: 'mastercard',
          logo: '/mastercard.png',
          alt: 'Mastercard',
          width: 40,
          height: 25,
        },
      ],
    },
    {
      id: 'debit',
      title: 'Tarjetas de débito',
      methods: [
        {
          name: 'visa-debit',
          logo: '/visa-debit.png',
          alt: 'Visa Débito',
          width: 40,
          height: 25,
        },
      ],
    },
  ]

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Mock the context provider to return a product ID
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: { id: mockProductId },
    })
  })

  it('renders loading skeleton while fetching data', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      error: null,
    })

    render(<PaymentOptions />)

    const skeleton = screen.getByTestId('loading-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-type', 'paymentOptions')
  })

  it('renders nothing when there is an error', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error('Failed to fetch'),
    })

    const { container } = render(<PaymentOptions />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when data is empty', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    })

    const { container } = render(<PaymentOptions />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders payment methods correctly', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockPaymentData,
      error: null,
    })

    render(<PaymentOptions />)

    // Check main heading
    expect(screen.getByText('Medios de pago')).toBeInTheDocument()

    // Check section titles
    expect(screen.getByText('Tarjetas de crédito')).toBeInTheDocument()
    expect(screen.getByText('Tarjetas de débito')).toBeInTheDocument()

    // Check payment method images
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3) // Total number of payment methods

    // Check specific payment methods
    expect(screen.getByAltText('Visa')).toBeInTheDocument()
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument()
    expect(screen.getByAltText('Visa Débito')).toBeInTheDocument()

    // Check "More payment methods" button
    expect(screen.getByText('Conocé otros medios de pago')).toBeInTheDocument()
  })

  it('calls usePaymentOptions with correct product ID', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockPaymentData,
      error: null,
    })

    render(<PaymentOptions />)

    expect(usePaymentOptions).toHaveBeenCalledWith(mockProductId)
  })

  it('handles undefined data by using empty array default value', () => {
    ;(usePaymentOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: null,
    })

    const { container } = render(<PaymentOptions />)
    expect(container).toBeEmptyDOMElement()
  })
})
