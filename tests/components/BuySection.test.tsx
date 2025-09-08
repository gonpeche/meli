import React from 'react'
import { render, screen } from '@testing-library/react'
import BuySection from '@/app/components/BuySection'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  BadgeCheck: () => <div data-testid="badge-check-icon">Badge Check Icon</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">Chevron Down Icon</div>,
  RotateCcw: () => <div data-testid="rotate-ccw-icon">Rotate CCW Icon</div>,
  ShieldCheck: () => <div data-testid="shield-check-icon">Shield Check Icon</div>,
}))

describe('BuySection', () => {
  it('renders delivery information correctly', () => {
    render(<BuySection />)

    // Check delivery title and subtitle
    expect(screen.getByText('Envío gratis')).toHaveClass('font-bold', 'text-[#00a650]')
    expect(screen.getByText('a todo el país')).toHaveClass('font-medium')

    // Check delivery info text
    expect(screen.getByText('Conoce los tiempos y las formas de envío.')).toBeInTheDocument()

    // Check delivery calculation button
    const calcButton = screen.getByText('Calcular cuándo llega')
    expect(calcButton).toHaveClass('text-sm', 'font-light', 'text-[#3483fa]', 'hover:text-blue-600')
  })

  it('renders stock information correctly', () => {
    render(<BuySection />)

    // Check stock title
    expect(screen.getByText('Stock disponible')).toHaveClass('text-md', 'mb-4', 'font-bold')

    // Check quantity selector
    expect(screen.getByText('Cantidad:')).toBeInTheDocument()
    expect(screen.getByText('1 unidad')).toBeInTheDocument()
    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()

    // Check available stock
    expect(screen.getByText('(+50 disponibles)')).toHaveClass('text-gray-400')
  })

  it('renders action buttons correctly', () => {
    render(<BuySection />)

    // Check buy now button
    const buyNowButton = screen.getByText('Comprar ahora')
    expect(buyNowButton).toHaveClass('btn-primary')

    // Check add to cart button
    const addToCartButton = screen.getByText('Agregar al carrito')
    expect(addToCartButton).toHaveClass('btn-secondary')
  })

  it('renders seller information correctly', () => {
    render(<BuySection />)

    // Check seller name and badge
    expect(screen.getByText('Vendido por')).toBeInTheDocument()
    const sellerButton = screen.getByText('Samsung').closest('button')
    expect(sellerButton).toHaveClass('text-[#3483fa]', 'hover:text-blue-600')
    expect(screen.getByTestId('badge-check-icon')).toBeInTheDocument()

    // Check seller sales
    expect(screen.getByText('+100 ventas')).toHaveClass('text-sm', 'font-bold')
  })

  it('renders protection information correctly', () => {
    render(<BuySection />)

    // Check return policy
    expect(screen.getByText('Devolución gratis.')).toHaveClass('text-[#3483fa]')
    expect(screen.getByText('Tenés 30 días desde que lo recibís.')).toHaveClass('text-gray-500')
    expect(screen.getByTestId('rotate-ccw-icon')).toBeInTheDocument()

    // Check purchase protection
    expect(screen.getByText('Compra Protegida,')).toHaveClass('text-[#3483fa]')
    expect(
      screen.getByText('recibí el producto que esperabas o te devolvemos tu dinero.')
    ).toHaveClass('text-gray-500')
    expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<BuySection />)

    // Check main container classes
    const container = screen.getByText('Stock disponible').closest('div.rounded-lg')
    expect(container).toHaveClass(
      'rounded-lg',
      'border-0',
      'bg-white',
      'p-2',
      'md:border-1',
      'md:p-6'
    )

    // Check delivery section classes
    const deliverySection = screen.getByText('Envío gratis').closest('div.mb-6')
    expect(deliverySection).toHaveClass('mb-6')

    // Check stock section classes
    const stockSection = screen.getByText('Stock disponible').closest('div.mb-6')
    expect(stockSection).toHaveClass('mb-6')

    // Check action buttons container classes
    const buttonsContainer = screen.getByText('Comprar ahora').parentElement
    expect(buttonsContainer).toHaveClass('mb-6', 'flex', 'flex-col', 'gap-3')

    // Check seller section classes
    const sellerSection = screen.getByText('Vendido por').closest('div.mb-6')
    expect(sellerSection).toHaveClass('mb-6')

    // Check protection info container classes
    const protectionContainer = screen.getByText('Devolución gratis.').closest('div.flex.flex-col')
    expect(protectionContainer).toHaveClass('flex', 'flex-col', 'gap-4', 'text-sm')
  })
})
