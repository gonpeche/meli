import React from 'react'
import BuySection from './components/BuySection'
import OtherSellersBuyOptions from './components/OtherSellersBuyOptions'
import PaymentOptions from './components/PaymentOptions'
import RelatedProductsList from './components/RelatedProductsList'
import SellerDetails from './components/SellerDetails'

const LeftContainer = () => {
  return (
    <div>
      <BuySection />
      <SellerDetails />
      <OtherSellersBuyOptions />
      <PaymentOptions />
      <RelatedProductsList />
    </div>
  )
}

export default LeftContainer
