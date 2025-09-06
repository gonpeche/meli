import HeaderContainer from './components/HeaderContainer'
import ProductContainer from './components/ProductContainer'

export default async function Home() {
  // Fetch from our mock Edge CDN API
  const response = await fetch('http://localhost:3000/api/products')

  const { data } = await response.json()
  console.log('🚀 ~ Home ~ data:', data)

  return (
    <div className="mx-auto w-full max-w-[1184px] min-w-[1184px] px-4">
      <HeaderContainer />
      <ProductContainer />
    </div>
  )
}
