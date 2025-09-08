import React from 'react'
import { render, screen } from '@testing-library/react'
import ActionItems from '@/app/components/ActionItems'

describe('ActionItems', () => {
  it('renders action links correctly', () => {
    render(<ActionItems />)

    // Check if both links are rendered
    const sellLink = screen.getByText('Vender uno igual')
    expect(sellLink).toBeInTheDocument()
    expect(sellLink).toHaveAttribute('href', '#')
    expect(sellLink).toHaveClass('text-sky-600', 'hover:underline')

    const shareLink = screen.getByText('Compartir')
    expect(shareLink).toBeInTheDocument()
    expect(shareLink).toHaveAttribute('href', '#')
    expect(shareLink).toHaveClass('text-sky-600', 'hover:underline')

    // Check separator
    const separator = screen.getByText('|')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveClass('mx-3', 'text-gray-300')
  })

  it('applies correct styling classes', () => {
    render(<ActionItems />)

    // Check container classes
    const container = screen.getByText('Vender uno igual').parentElement
    expect(container).toHaveClass('flex', 'items-center', 'text-sm')
  })
})
