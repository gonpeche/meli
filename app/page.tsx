import HeaderContainer from './components/HeaderContainer'
import ProductContainer from './components/ProductContainer'
import { ContextProvider } from './context/ProductContext'

export default async function Home() {
  // Fetch from our mock Edge CDN API
  const response = await fetch('http://localhost:3000/api/products')
  const { data } = await response.json()

  return (
    <ContextProvider item={data}>
      <div className="mx-auto w-full max-w-[1184px] min-w-[1184px] px-4">
        <HeaderContainer />
        <ProductContainer />
      </div>
    </ContextProvider>
  )
}
