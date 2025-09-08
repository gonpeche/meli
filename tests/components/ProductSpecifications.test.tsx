import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductSpecifications from '@/app/components/ProductSpecifications'
import { useContextProvider } from '@/app/context/ProductContext'

// Mock the context provider
jest.mock('@/app/context/ProductContext', () => ({
  useContextProvider: jest.fn(),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Scaling: () => <div data-testid="scaling-icon">Scaling Icon</div>,
  MemoryStick: () => <div data-testid="memory-stick-icon">Memory Stick Icon</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone Icon</div>,
  SmartphoneNfc: () => <div data-testid="smartphone-nfc-icon">Smartphone NFC Icon</div>,
  Fingerprint: () => <div data-testid="fingerprint-icon">Fingerprint Icon</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">Chevron Down Icon</div>,
}))

describe('ProductSpecifications', () => {
  const mockData = {
    item: {
      page_content: {
        item_summary: {
          product_specifications: {
            screen_size: {
              value: '6.7"',
              dimensions: '2796 x 1290 px',
              scale: 4,
            },
            internal_memory: '256 GB',
            main_front_camera: '12 Mpx',
            main_rear_camera: '48 Mpx',
            unlock_methods: 'Face ID',
            nfc: 'Sí',
          },
        },
      },
    },
  }

  beforeEach(() => {
    ;(useContextProvider as jest.Mock).mockReturnValue(mockData)
  })

  it('renders product specifications correctly', () => {
    render(<ProductSpecifications />)

    // Check title
    expect(screen.getByText('Características del producto')).toBeInTheDocument()

    // Check screen size section
    expect(screen.getByText('Tamaño de la pantalla: 6.7"')).toBeInTheDocument()
    expect(screen.getByText('2796 x 1290 px')).toBeInTheDocument()
    expect(screen.getByText('PEQUEÑO')).toBeInTheDocument()
    expect(screen.getByText('GRANDE')).toBeInTheDocument()

    // Check progress bar width (4/5 = 80%)
    const progressBar = document.querySelector('.bg-\\[\\#3483fa\\]')
    expect(progressBar).toHaveStyle({ width: '80%' })

    // Check specification items
    expect(screen.getByText((content) => content.includes('Memoria interna'))).toBeInTheDocument()
    expect(screen.getByText('256 GB')).toBeInTheDocument()

    expect(
      screen.getByText((content) => content.includes('Cámara frontal principal'))
    ).toBeInTheDocument()
    expect(screen.getByText('12 Mpx')).toBeInTheDocument()

    expect(
      screen.getByText((content) => content.includes('Cámara trasera principal'))
    ).toBeInTheDocument()
    expect(screen.getByText('48 Mpx')).toBeInTheDocument()

    expect(screen.getByText((content) => content.includes('Desbloqueo'))).toBeInTheDocument()
    expect(screen.getByText('Face ID')).toBeInTheDocument()

    expect(screen.getByText((content) => content.includes('Con NFC'))).toBeInTheDocument()
    expect(screen.getByText('Sí')).toBeInTheDocument()

    // Check icons
    expect(screen.getByTestId('scaling-icon')).toBeInTheDocument()
    expect(screen.getByTestId('memory-stick-icon')).toBeInTheDocument()
    expect(screen.getAllByTestId('smartphone-icon')).toHaveLength(2) // Two smartphone icons
    expect(screen.getByTestId('smartphone-nfc-icon')).toBeInTheDocument()
    expect(screen.getByTestId('fingerprint-icon')).toBeInTheDocument()
    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()

    // Check "View All" button
    expect(
      screen.getByText((content) => content.includes('Ver todas las características'))
    ).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<ProductSpecifications />)

    // Check container classes
    const container = screen.getByText('Características del producto').parentElement
    expect(container).toHaveClass('p-4', 'md:p-0', 'md:pt-8')

    // Check title classes
    const title = screen.getByText('Características del producto')
    expect(title).toHaveClass('mb-4', 'text-lg', 'font-medium', 'md:text-xl')

    // Check screen size section classes
    const screenSizeSection = screen
      .getByText((content) => content.includes('Tamaño de la pantalla'))
      .closest('div.mb-2')
    expect(screenSizeSection).toHaveClass('mb-2', 'flex', 'items-center', 'gap-4')

    // Check progress bar container classes
    const progressBarContainer = screen.getByText('PEQUEÑO').parentElement
    expect(progressBarContainer).toHaveClass('flex', 'max-w-[400px]', 'items-center')

    // Check specifications grid classes
    const specificationsGrid = screen
      .getByText((content) => content.includes('Memoria interna'))
      .closest('div.flex.flex-col')
    expect(specificationsGrid).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'md:grid',
      'md:grid-cols-2',
      'md:gap-x-16',
      'md:gap-y-6'
    )

    // Check specification item classes
    const specificationItem = screen
      .getByText((content) => content.includes('Memoria interna'))
      .closest('div.flex.items-center')
    expect(specificationItem).toHaveClass('flex', 'items-center', 'gap-3', 'md:gap-4')

    // Check "View All" button classes
    const viewAllButton = screen.getByText((content) =>
      content.includes('Ver todas las características')
    ).parentElement
    expect(viewAllButton).toHaveClass('action-link', 'flex', 'items-center', 'gap-2', 'pt-10')
  })
})
