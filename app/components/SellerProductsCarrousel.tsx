'use client'

import React from 'react'
import Card from '@components/ui/Card'
import Image from 'next/image'
import LoadingSkeleton from '@components/ui/LoadingSkeleton'
import { useSellerProducts } from '@/app/hooks/useSellerProducts'
import { SellerProduct } from '@/types'
import { useContextProvider } from '@/app/context/ProductContext'

const ProductCard = ({ product }: { product: SellerProduct }) => {
  return (
    <Card className="w-full cursor-pointer transition-shadow hover:shadow-md md:h-[140px] md:w-[350px]">
      <div className="flex h-full gap-4">
        <div className="relative h-[140px] w-[140px] flex-shrink-0 md:h-full md:w-[110px]">
          <Image src={product.image} alt={product.title} fill className="object-contain" />
        </div>
        <div className="flex flex-col justify-between py-1">
          <h3 className="line-clamp-1 text-sm">{product.title}</h3>
          <div>
            <p className="text-xl font-medium">$ {product.price.toLocaleString()}</p>
            <p className="text-xs text-gray-600">
              en {product.installments.quantity} cuotas sin tarjeta de ${' '}
              {product.installments.amount.toLocaleString()}
            </p>
            <p className="text-xs text-green-500">Envío gratis</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

const SellerProductsCarrousel = () => {
  const { item } = useContextProvider()
  const { data = [], isLoading, error } = useSellerProducts(item.id, item.seller.id)

  if (isLoading) {
    return <LoadingSkeleton type="sellerProducts" />
  }

  if (error || data.length === 0) {
    return null
  }

  return (
    <div className="md:text-md space-y-4 p-4 md:p-0 md:pt-3">
      <h2 className="section-title">Productos de Samsung</h2>
      <div className="flex flex-col gap-4 pb-4 md:flex-row md:overflow-x-auto">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="action-link text-sm">Ver más productos de Samsung</p>
    </div>
  )
}

export default SellerProductsCarrousel
