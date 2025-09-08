import React from 'react'
import { render, screen } from '@testing-library/react'
import RelatedSearch from '@/app/components/RelatedSearch'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

describe('RelatedSearch', () => {
  const mockData = {
    item: {
      header: {
        suggestions: ['iPhone 14', 'iPhone 13', 'iPhone 12'],
      },
    },
  }

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders related search suggestions correctly', () => {
    render(<RelatedSearch />)

    // Check heading text
    expect(screen.getByText('También puede interesarte:')).toHaveClass('font-semibold')

    // Check suggestions
    expect(screen.getByText('iPhone 14')).toBeInTheDocument()
    expect(screen.getByText('iPhone 13')).toBeInTheDocument()
    expect(screen.getByText('iPhone 12')).toBeInTheDocument()

    // Check separators
    const separators = screen.getAllByText('-')
    expect(separators).toHaveLength(2) // Should have 2 separators for 3 items
  })

  it('renders suggestions as links', () => {
    render(<RelatedSearch />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)

    links.forEach((link) => {
      expect(link).toHaveClass('hover:underline')
    })
  })

  it('handles empty suggestions gracefully', () => {
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: {
        header: {
          suggestions: [],
        },
      },
    })

    render(<RelatedSearch />)

    // Heading should still be present
    expect(screen.getByText('También puede interesarte:')).toBeInTheDocument()

    // No separators should be present
    expect(screen.queryByText('-')).not.toBeInTheDocument()
  })

  it('handles undefined suggestions gracefully', () => {
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: {
        header: {
          suggestions: undefined,
        },
      },
    })

    render(<RelatedSearch />)

    // Heading should still be present
    expect(screen.getByText('También puede interesarte:')).toBeInTheDocument()

    // No separators should be present
    expect(screen.queryByText('-')).not.toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<RelatedSearch />)

    // Check container classes
    const container = screen.getByText('También puede interesarte:').closest('div.w-full')
    expect(container).toHaveClass('w-full')

    // Check inner container classes
    const innerContainer = screen.getByText('También puede interesarte:').closest('div.py-3')
    expect(innerContainer).toHaveClass('py-3')

    // Check text container classes
    const textContainer = screen.getByText('También puede interesarte:').closest('p')
    expect(textContainer).toHaveClass('text-sm', 'text-gray-900')

    // Check suggestion text classes
    const suggestionContainer = screen.getByText('iPhone 14').closest('span')
    expect(suggestionContainer).toHaveClass('text-gray-700')
  })
})
