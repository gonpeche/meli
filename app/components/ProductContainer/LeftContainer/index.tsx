import React from 'react'
import ProductDetails from './components/ProductDetails'
import RelatedProductsCarrousel from './components/RelatedProductsCarrousel'
import SellerProductsCarrousel from './components/SellerProductsCarrousel'
import ProductSpecifications from './components/ProductSpecifications'
import ProductDescription from './components/ProductDescription'


const LeftContainer = () => {
  return (
    <div>
      <ProductDetails />
      <RelatedProductsCarrousel />
      <SellerProductsCarrousel />
      <ProductSpecifications />
      <ProductDescription />
    </div>
  )
}

export default LeftContainer