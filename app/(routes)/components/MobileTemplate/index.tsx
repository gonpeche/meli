import ProductHeading from '@/app/components/ProductHeading'
import ProductImage from '@/app/components/ProductImage'
import BuySection from '@/app/components/BuySection'
import RelatedProductsCarrousel from '@/app/components/RelatedProductsCarrousel'
import ProductSummary from '@/app/components/ProductSummary'
import ProductSpecifications from '@/app/components/ProductSpecifications'
import SellerDetails from '@/app/components/SellerDetails'
import SellerProductsCarrousel from '@/app/components/SellerProductsCarrousel'
import PaymentOptions from '@/app/components/PaymentOptions'
import React from 'react'

const MobileTemplate = () => {
  return (
    <>
      <ProductHeading />
      <ProductImage />
      <BuySection />
      <ProductSummary />
      <ProductSpecifications />
      <RelatedProductsCarrousel />
      <SellerDetails />
      <SellerProductsCarrousel />
      <PaymentOptions />
    </>
  )
}

export default MobileTemplate
