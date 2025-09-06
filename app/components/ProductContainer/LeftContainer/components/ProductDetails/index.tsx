import React from 'react'
import ProductImage from './components/ProductImage'
import ProductSummary from './components/ProductSummary'

const ProductDetails = () => {
  return (
    <div className="flex justify-between">
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
