'use client'

import { useContent } from '@/app/context/ProductContext'
import React from 'react'

const ProductDescription = () => {
  const {
    item: {
      page_content: {
        item_summary: { product_description },
      },
    },
  } = useContent()
  return (
    <div className="pt-8">
      <h2 className="mb-8 text-2xl font-medium">Descripción</h2>
      <div className="flex flex-col gap-6">
        {product_description.sections.map((section, index) => (
          <div key={index}>
            <h3 className="mb-2 text-lg text-gray-600">{section.title}</h3>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDescription
