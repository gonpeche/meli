import HeaderContainer from './components/HeaderContainer'
import ProductContainer from './components/ProductContainer'

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1184px] min-w-[1184px] px-4">
      <HeaderContainer />
      <ProductContainer />
    </div>
  )
}
