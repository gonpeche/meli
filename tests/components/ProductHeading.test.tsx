import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductHeading from '@/app/components/ProductHeading'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

describe('ProductHeading', () => {
  const mockData = {
    item: {
      page_content: {
        item_summary: {
          header: {
            title: 'Test Product',
            rating: 4.5,
            reviews: 100,
          },
          attributes: {
            condition: 'New',
            sold: 50,
          },
        },
      },
    },
  }

  beforeEach(() => {
    // Mock the context data before each test
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders mobile view correctly', () => {
    render(<ProductHeading />)

    // Check if title is rendered (should be in both views)
    const titles = screen.getAllByText('Test Product')
    expect(titles).toHaveLength(2)

    // Check if condition and sold count are rendered (should be in both views)
    const conditions = screen.getAllByText('New')
    expect(conditions).toHaveLength(2)

    const soldCounts = screen.getAllByText('+50 vendidos')
    expect(soldCounts).toHaveLength(2)

    // Check if rating and reviews are rendered (should be in both views)
    const ratings = screen.getAllByText('4.5')
    expect(ratings).toHaveLength(2)

    const reviews = screen.getAllByText('(100)')
    expect(reviews).toHaveLength(2)
  })

  it('renders correct number of stars based on rating', () => {
    render(<ProductHeading />)

    // Since rating is 4.5, it should round up to 5 stars (should be in both views)
    const stars = screen.getAllByText('★★★★★')
    expect(stars).toHaveLength(2)
  })

  // Add more test cases as needed to achieve better coverage
})
