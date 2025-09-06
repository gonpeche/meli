'use client'

import React from 'react'
import { useContent } from '@/app/context/ProductContext'

const ProductHeading = () => {
  const {
    item: {
      page_content: {
        item_summary: { header, attributes },
      },
    },
  } = useContent()

  return (
    <div className="flex flex-col gap-1 text-sm">
      {/* Status and Favorite */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <span>{attributes.condition}</span>
          <span>|</span>
          <span>{attributes.sold} vendidos</span>
        </div>
        <button className="text-2xl text-gray-400 hover:text-blue-500">
          {attributes.favorite ? '♥' : '♡'}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-md leading-7 font-semibold md:text-[22px]">{header.title}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-md">{header.rating}</span>
        <div className="flex text-blue-500">{'★'.repeat(Math.ceil(header.rating))}</div>
        <span className="text-gray-500">({header.reviews})</span>
      </div>
    </div>
  )
}

export default ProductHeading
