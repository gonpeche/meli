import React from 'react'
import { render, screen } from '@testing-library/react'
import SellerDetails from '@/app/components/SellerDetails'

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Check: () => <div data-testid="check-icon">Check Icon</div>,
  Truck: () => <div data-testid="truck-icon">Truck Icon</div>,
  Clock: () => <div data-testid="clock-icon">Clock Icon</div>,
  BadgeCheck: () => <div data-testid="badge-check-icon">Badge Check Icon</div>,
}))

describe('SellerDetails', () => {
  it('renders seller information correctly', () => {
    render(<SellerDetails />)

    // Check seller name and status
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('Tienda oficial de Mercado Libre')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('+50')).toBeInTheDocument()

    // Check seller badge
    expect(screen.getByText('MercadoLider Platinum')).toBeInTheDocument()
    expect(screen.getByText('¡Uno de los mejores del sitio!')).toBeInTheDocument()

    // Check metrics
    expect(screen.getByText('+1 M')).toBeInTheDocument()
    expect(screen.getByText('Ventas')).toBeInTheDocument()
    expect(screen.getByText('Buena atención')).toBeInTheDocument()
    expect(screen.getByText('Entrega a tiempo')).toBeInTheDocument()

    // Check icons
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
    expect(screen.getByTestId('truck-icon')).toBeInTheDocument()
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument()
    expect(screen.getByTestId('badge-check-icon')).toBeInTheDocument()

    // Check seller logo
    const logo = screen.getByAltText('Samsung')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/seller/logo.jpg')

    // Check CTA button
    expect(screen.getByText('Ir a la tienda oficial')).toBeInTheDocument()
  })

  it('renders with correct layout classes', () => {
    render(<SellerDetails />)

    // Check main container classes
    const mainContainer = screen.getByRole('button', { name: 'Ir a la tienda oficial' })
      .parentElement?.parentElement
    expect(mainContainer).toHaveClass(
      'w-full',
      'max-w-sm',
      'cursor-pointer',
      'overflow-hidden',
      'rounded-lg',
      'bg-white'
    )

    // Check metrics section classes
    const metricsSection = screen.getByText('Ventas').parentElement?.parentElement?.parentElement
    expect(metricsSection).toHaveClass('rounded-lg', 'bg-gray-50', 'p-4')

    // Check header classes
    const header = screen.getByAltText('Samsung').parentElement?.parentElement
    expect(header).toHaveClass('relative', 'h-20', 'bg-black')
  })

  it('renders seller metrics in correct layout', () => {
    render(<SellerDetails />)

    // Check metrics container layout
    const metricsContainer =
      screen.getByText('Ventas').parentElement?.parentElement?.parentElement?.firstChild
    expect(metricsContainer).toHaveClass('flex', 'items-center', 'justify-between')

    // Check individual metric sections
    const salesMetric = screen.getByText('+1 M').parentElement
    expect(salesMetric).toHaveClass('flex-1', 'text-center')

    const attentionMetric = screen.getByText('Buena atención').parentElement
    expect(attentionMetric).toHaveClass('flex', 'flex-1', 'flex-col', 'items-center', 'text-center')

    const deliveryMetric = screen.getByText('Entrega a tiempo').parentElement
    expect(deliveryMetric).toHaveClass('flex', 'flex-1', 'flex-col', 'items-center', 'text-center')
  })
})
