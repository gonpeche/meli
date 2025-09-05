import React from 'react'
import BuySection from './components/BuySection'
import OtherSellersBuyOptions from './components/OtherSellersBuyOptions'
import PaymentOptions from './components/PaymentOptions'
import RelatedProductsList from './components/RelatedProductsList'
import SellerDetails from './components/SellerDetails'

const LeftContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <BuySection />
      <SellerDetails />
      <OtherSellersBuyOptions />
      <PaymentOptions />
      <RelatedProductsList />
    </div>
  )
}

export default LeftContainer
