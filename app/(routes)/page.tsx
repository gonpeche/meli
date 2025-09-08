'use client'

import { ContextProvider } from '../context/ProductContext'
import { useProductData } from '../hooks/useProductData'
import LoadingScreen from '../components/ui/LoadingScreen'
import DesktopTemplate from './components/DesktopTemplate'
import MobileTemplate from './components/MobileTemplate'

export default function Home() {
  const { data, isLoading, error } = useProductData()

  if (isLoading) {
    return LoadingScreen()
  }

  if (error) {
    // Ideally, render a fallback HTML with a 500 error page
    return <div>Error loading product data: {error}</div>
  }

  return (
    <ContextProvider item={data}>
      <div className="hidden md:block">
        <div className="mx-auto w-full max-w-[1184px] min-w-[1184px] px-4">
          <DesktopTemplate />
        </div>
      </div>
      <div className="block bg-white md:hidden">
        <MobileTemplate />
      </div>
    </ContextProvider>
  )
}
