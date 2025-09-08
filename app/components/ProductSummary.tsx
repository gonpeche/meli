'use client'

import React from 'react'
import Image from 'next/image'
import ProductHeading from './ProductHeading'
import { useContextProvider } from '@/app/context/ProductContext'
import PriceSection from './PriceSection'

const ProductSummary = () => {
  const {
    item: {
      page_content: { item_summary },
    },
  } = useContextProvider()

  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0)

  return (
    <div className="flex flex-col gap-1 text-sm">
      <ProductHeading />
      {/* Price Section */}
      <PriceSection />

      {/* Color Selection */}
      <div className="flex flex-col gap-3">
        <span>
          Color: <span className="font-bold">{item_summary.attributes.color}</span>
        </span>
        <div className="flex gap-2">
          {item_summary.attributes.other_colors.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedColorIndex(index)}
              className={`h-9 w-9 cursor-pointer overflow-hidden rounded-lg border-1 ${
                selectedColorIndex === index ? 'border-blue-500' : 'border-gray-300'
              } hover:border-blue-500`}
            >
              <Image
                src={imageUrl}
                alt={`Color variant ${index + 1}`}
                className="h-full w-full object-cover"
                width={36}
                height={36}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Features */}
      <div className="flex flex-col gap-3 text-sm">
        <h2 className="font-semibold">Lo que tenés que saber de este producto</h2>
        <ul className="flex list-disc flex-col gap-2 text-gray-600 md:pl-4">
          <li>Memoria RAM: {item_summary.product_specifications.memory_ram}.</li>
          <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
          <li>Memoria interna de {item_summary.product_specifications.internal_memory}.</li>
        </ul>
        <a href="#" className="action-link">
          Ver características
        </a>
      </div>

      {/* Buy Options */}
      <div className="flex flex-col gap-2 text-sm font-normal md:pt-4">
        <h2>Opciones de compra:</h2>
        <div className="flex flex-col gap-1">
          <a href="#" className="action-link">
            {item_summary.buy_options.new_products} productos nuevos desde ${' '}
            {item_summary.pricing.price}
          </a>
          <a href="#" className="action-link">
            {item_summary.buy_options.used_products} producto usado y reacondicionado
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
