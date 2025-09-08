import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductDescription from '@/app/components/ProductDescription'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

describe('ProductDescription', () => {
  const mockData = {
    item: {
      page_content: {
        item_summary: {
          product_description: {
            sections: [
              {
                title: 'Features',
                content: 'Amazing product features',
              },
              {
                title: 'Specifications',
                content: 'Detailed specifications',
              },
              {
                title: "What's in the box",
                content: 'Package contents',
              },
            ],
          },
        },
      },
    },
  }

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders description title and sections correctly', () => {
    render(<ProductDescription />)

    // Check main title
    expect(screen.getByText('Descripción')).toBeInTheDocument()

    // Check section titles
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Specifications')).toBeInTheDocument()
    expect(screen.getByText("What's in the box")).toBeInTheDocument()

    // Check section contents
    expect(screen.getByText('Amazing product features')).toBeInTheDocument()
    expect(screen.getByText('Detailed specifications')).toBeInTheDocument()
    expect(screen.getByText('Package contents')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<ProductDescription />)

    // Check container classes
    const container = screen.getByText('Descripción').parentElement
    expect(container).toHaveClass('p-4', 'pt-8', 'md:p-0', 'md:pt-8')

    // Check main title classes
    const mainTitle = screen.getByText('Descripción')
    expect(mainTitle).toHaveClass(
      'mb-6',
      'text-lg',
      'font-normal',
      'md:mb-8',
      'md:p-0',
      'md:text-xl',
      'md:font-medium'
    )

    // Check sections container classes
    const sectionsContainer = screen.getByText('Features').parentElement?.parentElement
    expect(sectionsContainer).toHaveClass('flex', 'flex-col', 'gap-6')

    // Check section title classes
    const sectionTitle = screen.getByText('Features')
    expect(sectionTitle).toHaveClass(
      'text-md',
      'md:font-semilight',
      'mb-2',
      'font-normal',
      'text-gray-600',
      'md:mb-1',
      'md:text-lg'
    )

    // Check section content classes
    const sectionContent = screen.getByText('Amazing product features')
    expect(sectionContent).toHaveClass('text-sm', 'font-light', 'text-gray-600', 'md:text-lg')
  })

  it('renders correctly with empty sections', () => {
    const emptyData = {
      item: {
        page_content: {
          item_summary: {
            product_description: {
              sections: [],
            },
          },
        },
      },
    }

    ;(useContextProvider as jest.Mock).mockReturnValue(emptyData)

    render(<ProductDescription />)

    // Main title should still be present
    expect(screen.getByText('Descripción')).toBeInTheDocument()

    // Sections container should be empty but present
    const sectionsContainer = screen
      .getByText('Descripción')
      .parentElement?.querySelector('.flex.flex-col')
    expect(sectionsContainer).toBeInTheDocument()
    expect(sectionsContainer?.children).toHaveLength(0)
  })
})
