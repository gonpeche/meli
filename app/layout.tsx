import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Mercado Libre',
  description: 'Product Page Mockup',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
