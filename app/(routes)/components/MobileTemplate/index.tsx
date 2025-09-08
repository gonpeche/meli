import ProductHeading from '@/app/components/ProductHeading'
import ProductImage from '@/app/components/ProductImage'
import BuySection from '@/app/components/BuySection'
import RelatedProductsCarrousel from '@/app/components/RelatedProductsCarrousel'
import ProductSpecifications from '@/app/components/ProductSpecifications'
import SellerDetails from '@/app/components/SellerDetails'
import SellerProductsCarrousel from '@/app/components/SellerProductsCarrousel'
import PaymentOptions from '@/app/components/PaymentOptions'
import React from 'react'
import PriceSection from '@/app/components/PriceSection'
import OtherSellersBuyOptions from '@/app/components/OtherSellersBuyOptions'
import ProductDescription from '@/app/components/ProductDescription'

const MobileTemplate = () => {
  return (
    <div data-testid="mobile-template">
      <ProductHeading />
      <ProductImage />
      <PriceSection />
      <BuySection />
      <OtherSellersBuyOptions />
      <ProductSpecifications />
      <RelatedProductsCarrousel />
      <SellerDetails />
      <ProductDescription />
      <SellerProductsCarrousel />
      <PaymentOptions />
    </div>
  )
}

export default MobileTemplate
