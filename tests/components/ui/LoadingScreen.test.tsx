import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingScreen from '@/app/components/ui/LoadingScreen'

describe('LoadingScreen', () => {
  it('renders loading screen with spinner and message', () => {
    render(<LoadingScreen />)

    // Check if loading message is displayed
    expect(screen.getByText('Fetching pre-rendered HTML from server...')).toBeInTheDocument()

    // Check if spinner element exists
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('border-t-2', 'border-b-2', 'border-blue-500')

    // Check container classes
    const container = screen.getByText('Fetching pre-rendered HTML from server...').parentElement
      ?.parentElement
    expect(container).toHaveClass(
      'flex',
      'min-h-screen',
      'flex-col',
      'items-center',
      'justify-center'
    )
  })
})
