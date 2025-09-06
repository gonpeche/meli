'use client'

import React from 'react'
import Image from 'next/image'
import Card from '@components/ui/Card'
import { useRelatedProducts } from '@/app/hooks/useRelatedProducts'
import { useContextProvider } from '@/app/context/ProductContext'
import LoadingSkeleton from '@components/ui/LoadingSkeleton'
import { RelatedProduct } from '@/types'

const ProductCard = ({ product }: { product: RelatedProduct }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR').format(price)
  }

  return (
    <a href="#" className="block hover:no-underline">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="h-20 w-20 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Price Section */}
          <div className="mb-1">
            {product.originalPrice !== product.price && (
              <span className="text-sm text-gray-400 line-through">
                $ {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xl">$ {formatPrice(product.price)}</span>
              {product.discount && (
                <span className="text-sm text-green-500">{product.discount}% OFF</span>
              )}
            </div>
            <div className="text-sm">
              {product.installments.amount} cuotas de $ {formatPrice(product.installments.value)}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mb-1">
            {product.freeShipping && (
              <span className="text-sm text-green-500">
                Envío gratis
                {product.fullDelivery && ' ⚡ FULL'}
              </span>
            )}
          </div>

          {/* Product Title */}
          <p className="line-clamp-2 text-sm text-gray-600">{product.title}</p>
        </div>
      </div>
    </a>
  )
}

const ProductList = ({ products }: { products: RelatedProduct[] }) => (
  <div className="space-y-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)

const RelatedProductsList = () => {
  const { item } = useContextProvider()
  const { data = [], isLoading, error } = useRelatedProducts(item.id)

  if (isLoading) {
    return <LoadingSkeleton type="relatedProductsList" />
  }

  if (error || data.length === 0) {
    return null
  }

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium">Productos relacionados</h3>
          <span className="text-sm text-gray-500">Promocionado</span>
        </div>
        <ProductList products={data} />
      </div>
    </Card>
  )
}

export default RelatedProductsList
