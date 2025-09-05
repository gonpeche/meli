import HeaderContainer from "./components/HeaderContainer";
import ProductContainer from "./components/ProductContainer";

export default function Home() {
  return (
    <div className="flex flex-col border border-red-500 max-w-[1184px] mx-auto w-full">
      <HeaderContainer />
      <ProductContainer />
    </div>
  );
}
