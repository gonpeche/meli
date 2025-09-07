'use client'

import React from 'react'
import { useContextProvider } from '@/app/context/ProductContext'

const PriceSection = () => {
  const {
    item: {
      page_content: { item_summary },
    },
  } = useContextProvider()

  return (
    <div className="flex flex-col gap-1 bg-white p-3 md:p-0">
      <span className="text-[36px] font-light">
        <span className="pr-2">$</span>
        {item_summary.pricing.price}
      </span>
      <p className="text-lg">
        {item_summary.pricing.installments} cuotas de{' '}
        <span className="font-semibold">$ {item_summary.pricing.installment_value}</span>
        <sup>11</sup> sin tarjeta
      </p>
      <p className="md:text-md text-xs text-gray-500">
        Precio sin impuestos nacionales: $ {item_summary.pricing.tax_free_price}
      </p>
      <a href="#" className="action-link">
        Ver los medios de pago
      </a>
    </div>
  )
}

export default PriceSection
