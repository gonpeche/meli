'use client'

import React from 'react'
import Card from '@components/ui/Card'
import Image from 'next/image'
import { useRelatedProducts } from '@/app/hooks/useRelatedProducts'
import { useContextProvider } from '@/app/context/ProductContext'
import LoadingSkeleton from '@components/ui/LoadingSkeleton'

const RelatedProductsCarrousel = () => {
  const { item } = useContextProvider()
  const { data = [], isLoading, error } = useRelatedProducts(item.id)

  if (isLoading) {
    return <LoadingSkeleton type="relatedProducts" />
  }

  if (error || data.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-medium">Productos relacionados</h2>
      <p className="mb-6 text-gray-600">Promocionado</p>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.map((product) => (
          <Card
            key={product.id}
            className="max-w-[230px] cursor-pointer transition-shadow hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={192}
                className="h-48 w-full object-contain"
              />
              <p className="mt-1 line-clamp-2 text-sm text-gray-700">{product.title}</p>
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">$ {product.price.toLocaleString()}</span>
                  {product.discount && (
                    <span className="text-green-500">{product.discount}% OFF</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    $ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.installments && (
                  <p className="text-sm text-gray-600">
                    en {product.installments.amount} cuotas sin tarjeta de ${' '}
                    {product.installments.value.toLocaleString()}
                  </p>
                )}
                {product.freeShipping && (
                  <p className="mt-1 text-green-500">Envío gratis ⚡ FULL</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RelatedProductsCarrousel
