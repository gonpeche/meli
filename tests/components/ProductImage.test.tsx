import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductImage from '@/app/components/ProductImage'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    className,
    onError,
  }: {
    src: string
    alt: string
    className?: string
    onError?: (e: any) => void
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={(e) => {
          if (onError) {
            onError(e)
          }
        }}
      />
    )
  }
})

describe('ProductImage', () => {
  const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg']

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Mock the context provider to return test images
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: {
        page_content: {
          item_image: {
            images: mockImages,
          },
        },
      },
    })
  })

  it('renders main image and thumbnails correctly', () => {
    render(<ProductImage />)

    // Check main image
    const mainImage = screen.getByAltText('Product image')
    expect(mainImage).toBeInTheDocument()
    expect(mainImage).toHaveAttribute('src', mockImages[0]) // First image should be selected by default

    // Check thumbnails
    const thumbnails = screen.getAllByAltText(/Product thumbnail \d+/)
    expect(thumbnails).toHaveLength(mockImages.length)

    // Check thumbnail sources
    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail).toHaveAttribute('src', mockImages[index])
    })
  })

  it('changes selected image when clicking thumbnails', () => {
    render(<ProductImage />)

    const thumbnails = screen.getAllByAltText(/Product thumbnail \d+/)
    const mainImage = screen.getByAltText('Product image')

    // Click second thumbnail
    fireEvent.click(thumbnails[1])
    expect(mainImage).toHaveAttribute('src', mockImages[1])

    // Click third thumbnail
    fireEvent.click(thumbnails[2])
    expect(mainImage).toHaveAttribute('src', mockImages[2])
  })

  it('changes selected image on thumbnail hover', () => {
    render(<ProductImage />)

    const thumbnails = screen.getAllByAltText(/Product thumbnail \d+/)
    const mainImage = screen.getByAltText('Product image')

    // Hover over second thumbnail
    fireEvent.mouseEnter(thumbnails[1].parentElement!)
    expect(mainImage).toHaveAttribute('src', mockImages[1])

    // Hover over third thumbnail
    fireEvent.mouseEnter(thumbnails[2].parentElement!)
    expect(mainImage).toHaveAttribute('src', mockImages[2])
  })

  it('applies correct styles to selected thumbnail', () => {
    render(<ProductImage />)

    const thumbnailButtons = screen.getAllByRole('button')

    // First thumbnail should be selected by default
    expect(thumbnailButtons[0]).toHaveClass('border-blue-500')
    expect(thumbnailButtons[1]).toHaveClass('border-gray-200')

    // Click second thumbnail
    fireEvent.click(thumbnailButtons[1])
    expect(thumbnailButtons[0]).toHaveClass('border-gray-200')
    expect(thumbnailButtons[1]).toHaveClass('border-blue-500')
  })

  it('handles empty images array gracefully', () => {
    // Mock empty images array
    ;(useContextProvider as jest.Mock).mockReturnValue({
      item: {
        page_content: {
          item_image: {
            images: [],
          },
        },
      },
    })

    render(<ProductImage />)

    // Should not throw error and render empty containers
    expect(screen.queryByAltText('Product image')).not.toBeInTheDocument()
    expect(screen.queryByAltText(/Product thumbnail/)).not.toBeInTheDocument()
  })

  it('handles image loading errors by showing placeholder image', () => {
    render(<ProductImage />)

    // Get all images (main image and thumbnails)
    const mainImage = screen.getByAltText('Product image')
    const thumbnails = screen.getAllByAltText(/Product thumbnail \d+/)

    // Simulate error on main image
    fireEvent.error(mainImage)
    expect(mainImage).toHaveAttribute('src', '/placeholder-image.webp')

    // Simulate error on thumbnail
    fireEvent.error(thumbnails[0])
    expect(thumbnails[0]).toHaveAttribute('src', '/placeholder-image.webp')
  })
})
