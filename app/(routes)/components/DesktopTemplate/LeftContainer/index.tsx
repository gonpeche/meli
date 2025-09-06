import React from 'react'
import RelatedProductsCarrousel from '@components/RelatedProductsCarrousel'
import SellerProductsCarrousel from '@/app/components/SellerProductsCarrousel'
import ProductSpecifications from '@components/ProductSpecifications'
import ProductDescription from '@components/ProductDescription'
import ProductImage from '@components/ProductImage'
import ProductSummary from '@components/ProductSummary'

const LeftContainer = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <ProductImage />
        </div>
        <div className="max-w-[340px]">
          <ProductSummary />
        </div>
      </div>
      <RelatedProductsCarrousel />
      <SellerProductsCarrousel />
      <ProductSpecifications />
      <ProductDescription />
    </>
  )
}

export default LeftContainer
