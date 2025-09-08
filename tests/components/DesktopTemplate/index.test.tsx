import { render, screen } from '@testing-library/react'
import DesktopTemplate from '@/app/(routes)/components/DesktopTemplate'

jest.mock('@/app/components/RelatedSearch', () => ({
  __esModule: true,
  default: () => <div data-testid="related-search">Related Search</div>,
}))

jest.mock('@/app/components/Navigation', () => ({
  __esModule: true,
  default: () => <div data-testid="navigation">Navigation</div>,
}))

jest.mock('@/app/components/ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}))

jest.mock('@/app/(routes)/components/DesktopTemplate/LeftContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="left-container">Left Container</div>,
}))

jest.mock('@/app/(routes)/components/DesktopTemplate/RightContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="right-container">Right Container</div>,
}))

describe('DesktopTemplate', () => {
  it('renders all components with correct layout', () => {
    render(<DesktopTemplate />)

    // Check if all components are rendered
    expect(screen.getByTestId('desktop-template')).toBeInTheDocument()
    expect(screen.getByTestId('related-search')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('left-container')).toBeInTheDocument()
    expect(screen.getByTestId('right-container')).toBeInTheDocument()

    // Check layout classes
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('flex', 'flex-col', 'gap-4', 'md:flex-row')

    const leftContainer = screen.getByTestId('left-container').parentElement
    expect(leftContainer).toHaveClass('flex-1')

    const rightContainer = screen.getByTestId('right-container').parentElement
    expect(rightContainer).toHaveClass('w-full', 'flex-none', 'md:w-[325px]')
  })
})
