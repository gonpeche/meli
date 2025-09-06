import { ContextProvider } from '../context/ProductContext'
import DesktopTemplate from './components/DesktopTemplate'
import MobileTemplate from './components/MobileTemplate'

export default async function Home() {
  // Fetch from our mock Edge CDN API
  const response = await fetch('http://localhost:3000/api/products')
  const { data } = await response.json()

  return (
    <ContextProvider item={data}>
      <div>
        <div className="hidden md:block">
          <div className="mx-auto w-full max-w-[1184px] min-w-[1184px] px-4">
            <DesktopTemplate />
          </div>
        </div>
        <div className="block md:hidden">
          <MobileTemplate />
        </div>
      </div>
    </ContextProvider>
  )
}
