import React from 'react'
import { render, screen } from '@testing-library/react'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

describe('Breadcrumbs', () => {
  it('renders breadcrumbs correctly with multiple items', () => {
    const mockData = {
      item: {
        header: {
          breadcrumbs: ['Home', 'Electronics', 'Phones', 'iPhone'],
        },
      },
    }

    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)

    render(<Breadcrumbs />)

    // Check "Back to list" link
    expect(screen.getByText('Volver al listado')).toBeInTheDocument()

    // Check separator
    expect(screen.getByText('|')).toBeInTheDocument()

    // Check breadcrumb items
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Phones')).toBeInTheDocument()
    expect(screen.getByText('iPhone')).toBeInTheDocument()

    // Check breadcrumb separators (›)
    const separators = screen.getAllByText('›')
    expect(separators).toHaveLength(3) // Should have 3 separators for 4 items
  })

  it('renders correctly with empty breadcrumbs', () => {
    const mockData = {
      item: {
        header: {
          breadcrumbs: [],
        },
      },
    }

    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)

    render(<Breadcrumbs />)

    // Check "Back to list" link is still present
    expect(screen.getByText('Volver al listado')).toBeInTheDocument()

    // Check separator is still present
    expect(screen.getByText('|')).toBeInTheDocument()

    // Check that no breadcrumb separators are present
    const separators = screen.queryAllByText('›')
    expect(separators).toHaveLength(0)
  })

  it('handles undefined breadcrumbs gracefully', () => {
    const mockData = {
      item: {
        header: {
          breadcrumbs: undefined,
        },
      },
    }

    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)

    render(<Breadcrumbs />)

    // Check "Back to list" link is still present
    expect(screen.getByText('Volver al listado')).toBeInTheDocument()

    // Check separator is still present
    expect(screen.getByText('|')).toBeInTheDocument()

    // Check that no breadcrumb separators are present
    const separators = screen.queryAllByText('›')
    expect(separators).toHaveLength(0)
  })
})
