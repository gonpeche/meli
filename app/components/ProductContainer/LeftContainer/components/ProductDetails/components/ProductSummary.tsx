'use client'

import React from 'react'
import ProductHeading from './ProductHeading'
import { useContent } from '@/app/context/ProductContext'

const ProductSummary = () => {
  const {
    item: {
      page_content: { item_summary },
    },
  } = useContent()

  return (
    <div className="flex flex-col gap-1 text-sm">
      <ProductHeading />
      {/* Price Section */}
      <div className="flex flex-col gap-1">
        <span className="text-[36px] font-light">$ {item_summary.pricing.price}</span>
        <p className="text-lg">
          {item_summary.pricing.installments} cuotas de{' '}
          <span className="font-semibold">$ {item_summary.pricing.installment_value}</span>
          <sup>11</sup> sin tarjeta
        </p>
        <p className="text-gray-500">
          Precio sin impuestos nacionales: $ {item_summary.pricing.tax_free_price}
        </p>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Ver los medios de pago
        </a>
      </div>

      {/* Color Selection */}
      <div className="flex flex-col gap-3">
        <span>
          Color: <span className="font-bold">{item_summary.attributes.color}</span>
        </span>
        <div className="flex gap-2">
          {item_summary.attributes.other_colors.map((color, index) => (
            <button
              key={index}
              className={`h-9 w-9 rounded-lg border-1 border-blue-500 hover:border-blue-500 ${color} overflow-hidden`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Product Features */}
      <div className="flex flex-col gap-3 text-sm">
        <h2 className="font-semibold">Lo que tenés que saber de este producto</h2>
        <ul className="flex list-disc flex-col gap-2 text-gray-600">
          <li>Memoria RAM: {item_summary.product_specifications.memory_ram}.</li>
          <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
          <li>Memoria interna de {item_summary.product_specifications.internal_memory}.</li>
        </ul>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Ver características
        </a>
      </div>

      {/* Buy Options */}
      <div className="flex flex-col gap-2 text-sm font-medium">
        <h2>Opciones de compra:</h2>
        <div className="flex flex-col gap-1">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            {item_summary.buy_options.new_products} productos nuevos desde ${' '}
            {item_summary.pricing.price}
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-600">
            {item_summary.buy_options.used_products} producto usado y reacondicionado
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
