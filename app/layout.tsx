import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mercado Libre',
  description: 'Product Page Mockup',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
