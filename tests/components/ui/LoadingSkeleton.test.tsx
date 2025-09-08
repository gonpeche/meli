import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSkeleton from '@/app/components/ui/LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('renders related products skeleton correctly', () => {
    render(<LoadingSkeleton type="relatedProducts" />)

    // Check if container has animation class
    const container = document.querySelector('.w-full.animate-pulse')
    expect(container).toBeInTheDocument()

    // Check if product cards exist (3 items)
    const productCards = document.querySelectorAll('.min-w-\\[230px\\]')
    expect(productCards).toHaveLength(3)

    // Check if each card has the expected skeleton elements
    productCards.forEach((card) => {
      expect(card.querySelector('.h-48')).toBeInTheDocument() // Image placeholder
      expect(card.querySelector('.h-4')).toBeInTheDocument() // Text placeholder
      expect(card.querySelector('.h-6')).toBeInTheDocument() // Price placeholder
    })
  })

  it('renders seller products skeleton correctly', () => {
    render(<LoadingSkeleton type="sellerProducts" />)

    // Check if container has animation class
    const container = document.querySelector('.w-full.animate-pulse')
    expect(container).toBeInTheDocument()

    // Check if product cards exist (2 items)
    const productCards = document.querySelectorAll('.cursor-pointer')
    expect(productCards).toHaveLength(2)

    // Check if each card has the expected skeleton elements
    productCards.forEach((card) => {
      expect(card.querySelector('.w-\\[140px\\]')).toBeInTheDocument() // Image placeholder
      expect(card.querySelector('.h-6.w-24')).toBeInTheDocument() // Price placeholder
      expect(card.querySelector('.h-4.w-48')).toBeInTheDocument() // Installments placeholder
    })
  })

  it('renders payment options skeleton correctly', () => {
    render(<LoadingSkeleton type="paymentOptions" />)

    // Check if container has animation class
    const container = document.querySelector('.w-full.animate-pulse')
    expect(container).toBeInTheDocument()

    // Check if title placeholder exists
    const titlePlaceholder = document.querySelector('.h-4.w-1\\/3')
    expect(titlePlaceholder).toBeInTheDocument()

    // Check if payment method sections exist (3 sections)
    const sections = document.querySelectorAll('.space-y-2')
    expect(sections).toHaveLength(3)

    // Check if each section has payment method placeholders
    sections.forEach((section) => {
      const methodPlaceholders = section.querySelectorAll('.h-8.w-12')
      expect(methodPlaceholders).toHaveLength(3)
    })
  })

  it('renders related products list skeleton correctly', () => {
    render(<LoadingSkeleton type="relatedProductsList" />)

    // Check if container has animation class
    const container = document.querySelector('.w-full.animate-pulse')
    expect(container).toBeInTheDocument()

    // Check if list items exist (4 items)
    const listItems = document.querySelectorAll('.space-6')
    expect(listItems).toHaveLength(4)

    // Check if each item has image and text placeholders
    listItems.forEach((item) => {
      expect(item.querySelector('.w-1\\/4')).toBeInTheDocument() // Image placeholder
      expect(item.querySelector('.w-3\\/4')).toBeInTheDocument() // Text placeholder
    })
  })

  it('defaults to payment options skeleton for unknown type', () => {
    // @ts-expect-error Testing invalid type
    render(<LoadingSkeleton type="unknown" />)

    // Should render payment options skeleton
    const container = document.querySelector('.w-full.animate-pulse')
    expect(container).toBeInTheDocument()

    const titlePlaceholder = document.querySelector('.h-4.w-1\\/3')
    expect(titlePlaceholder).toBeInTheDocument()
  })
})
