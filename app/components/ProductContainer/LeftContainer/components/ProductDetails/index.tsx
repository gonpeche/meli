import React from 'react'
import ProductImage from './components/ProductImage'
import ProductSummary from './components/ProductSummary'

const ProductDetails = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div>
        <ProductImage />
      </div>
      <div className="max-w-[340px]">
        <ProductSummary />
      </div>
    </div>
  )
}

export default ProductDetails
