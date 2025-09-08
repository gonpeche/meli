import React from 'react'
import { render, screen } from '@testing-library/react'
import Navigation from '@/app/components/Navigation'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ActionItems from '@/app/components/ActionItems'

// Mock the child components
jest.mock('@/app/components/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs">Breadcrumbs Component</div>
  }
})

jest.mock('@/app/components/ActionItems', () => {
  return function MockActionItems() {
    return <div data-testid="action-items">Action Items Component</div>
  }
})

describe('Navigation', () => {
  it('renders child components correctly', () => {
    render(<Navigation />)

    // Check if both child components are rendered
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    expect(screen.getByTestId('action-items')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<Navigation />)

    // Check container classes
    const container = screen.getByTestId('breadcrumbs').parentElement?.parentElement
    expect(container).toHaveClass('w-full', 'py-2')

    // Check flex container classes
    const flexContainer = screen.getByTestId('breadcrumbs').parentElement
    expect(flexContainer).toHaveClass('flex', 'justify-between')
  })
})
