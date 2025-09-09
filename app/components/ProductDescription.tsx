'use client'

import { useContextProvider } from '@/app/context/ProductContext'
import React from 'react'

const ProductDescription = () => {
  const {
    item: {
      page_content: {
        item_summary: { product_description },
      },
    },
  } = useContextProvider()
  return (
    <div className="p-4 pt-8 md:p-0 md:pt-8">
      <h2 className="section-title mb-6">Descripción</h2>
      <div className="flex flex-col gap-6">
        {product_description.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-md md:font-semilight mb-2 font-normal text-gray-600 md:mb-1 md:text-lg">
              {section.title}
            </h3>
            <p className="text-sm font-light text-gray-600 md:text-lg">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDescription
