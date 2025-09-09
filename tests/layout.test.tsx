import RootLayout, { metadata } from '@/app/layout'

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    variable: '--font-inter',
  }),
}))

jest.mock('@/lib/providers', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('RootLayout', () => {
  it('exports correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Mercado Libre',
      description: 'Product Page Mockup',
      icons: {
        icon: [{ url: '/favicon.png' }, { url: '/favicon.png', type: 'image/png' }],
      },
    })
  })

  it('has correct props and structure', () => {
    const layout = RootLayout({
      children: <div>Test Content</div>,
    })

    // Check that the root element is an html element with lang="en"
    expect(layout.type).toBe('html')
    expect(layout.props.lang).toBe('en')

    // Check that the first child is a body element with correct classes
    const body = layout.props.children
    expect(body.type).toBe('body')
    expect(body.props.className).toMatch(/antialiased/)
    expect(body.props.className).toMatch(/inter-font/)

    // Check that the content is wrapped in QueryProvider
    const queryProvider = body.props.children
    expect(queryProvider.type.name).toBe('QueryProvider')
    expect(queryProvider.props.children).toEqual(<div>Test Content</div>)
  })
})
