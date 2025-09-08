import React from 'react'
import { render, screen } from '@testing-library/react'
import OtherSellersBuyOptions from '@/app/components/OtherSellersBuyOptions'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronRight: () => <div data-testid="chevron-right-icon">Chevron Right Icon</div>,
}))

describe('OtherSellersBuyOptions', () => {
  it('renders title and options correctly', () => {
    render(<OtherSellersBuyOptions />)

    // Check title
    expect(screen.getByText('Otras opciones de compra')).toBeInTheDocument()

    // Check options text with formatted price
    expect(screen.getByText('Ver 29 opciones desde $ 1.679.999')).toBeInTheDocument()

    // Check chevron icon
    expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<OtherSellersBuyOptions />)

    // Check container classes
    const container = screen.getByText('Otras opciones de compra').closest('div.bg-white')
    expect(container).toHaveClass('bg-white', 'p-0')

    // Check inner container classes
    const innerContainer = screen.getByText('Otras opciones de compra').parentElement
    expect(innerContainer).toHaveClass('space-y-2')

    // Check title classes
    const title = screen.getByText('Otras opciones de compra')
    expect(title).toHaveClass('text-md', 'font-medium')

    // Check button classes
    const button = screen.getByText((content) => content.includes('Ver 29 opciones')).parentElement
    expect(button).toHaveClass('action-link', 'flex', 'w-full', 'items-center')
  })
})
