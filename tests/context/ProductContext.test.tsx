import React from 'react'
import { render, screen } from '@testing-library/react'
import { useContextProvider, ContextProvider } from '@/app/context/ProductContext'

describe('ProductContext', () => {
  const mockItem = {
    id: '123',
    header: {
      breadcrumbs: ['Home', 'Electronics'],
    },
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
          color: 'Black',
          other_colors: ['/color1.jpg', '/color2.jpg'],
        },
        product_specifications: {
          memory_ram: '8GB',
          internal_memory: '256GB',
        },
        buy_options: {
          new_products: 5,
          used_products: 2,
        },
        pricing: {
          price: '999.99',
        },
      },
      item_image: {
        images: ['/image1.jpg', '/image2.jpg'],
      },
    },
  }

  // Test component that uses the context
  const TestComponent = () => {
    const { item } = useContextProvider()
    return <div data-testid="test-component">{item.page_content.item_summary.header.title}</div>
  }

  it('provides context value to children', () => {
    render(
      <ContextProvider item={mockItem}>
        <TestComponent />
      </ContextProvider>
    )

    expect(screen.getByTestId('test-component')).toHaveTextContent('Test Product')
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useContext must be used within a ContextProvider')

    consoleSpy.mockRestore()
  })

  it('updates context value when provider value changes', () => {
    const { rerender } = render(
      <ContextProvider item={mockItem}>
        <TestComponent />
      </ContextProvider>
    )

    expect(screen.getByTestId('test-component')).toHaveTextContent('Test Product')

    const updatedItem = {
      ...mockItem,
      page_content: {
        ...mockItem.page_content,
        item_summary: {
          ...mockItem.page_content.item_summary,
          header: {
            ...mockItem.page_content.item_summary.header,
            title: 'Updated Product',
          },
        },
      },
    }

    rerender(
      <ContextProvider item={updatedItem}>
        <TestComponent />
      </ContextProvider>
    )

    expect(screen.getByTestId('test-component')).toHaveTextContent('Updated Product')
  })
})
