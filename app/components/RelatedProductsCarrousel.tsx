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
    <div className="w-full p-4 md:p-0">
      <h2 className="mb-1 text-lg font-normal md:mb-4 md:text-2xl md:font-medium">
        Productos relacionados
      </h2>
      <p className="mb-4 text-xs text-gray-600 md:mb-6 md:text-lg">Promocionado</p>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.map((product) => (
          <Card
            key={product.id}
            className="max-w-[200px] min-w-[200px] cursor-pointer transition-shadow hover:shadow-lg md:max-w-[250px] md:min-w-[250px]"
          >
            <div className="flex flex-col gap-2">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={192}
                className="h-48 w-full object-contain"
              />
              <p className="mt-1 line-clamp-2 text-xs text-gray-700 md:text-sm">{product.title}</p>
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-2xl">${product.price.toLocaleString()}</span>
                  {product.discount && (
                    <span className="text-xs text-green-500 md:text-lg">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through md:text-lg">
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
                  <p className="mt-1 text-xs text-green-500 md:text-lg">Envío gratis ⚡ FULL</p>
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
