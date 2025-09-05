import React from 'react'
import Card from '@/app/components/shared/Card'
import Image from 'next/image'

interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  installments?: {
    amount: number
    value: number
  }
  freeShipping?: boolean
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Celular Tecno Pova 6 8gb Ram 256gb Rom Interstellar Blue',
    price: 385999,
    originalPrice: 419999,
    discount: 8,
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_969304-MLA81434301874_122024-AB.webp',
    installments: {
      amount: 6,
      value: 64333,
    },
    freeShipping: true,
  },
  {
    id: '2',
    title: 'Xiaomi Poco M6 8gb Ram 256gb Dual Sim Celular',
    price: 330000,
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_898122-MLA89124725888_082025-AB.webp',
    installments: {
      amount: 3,
      value: 128068,
    },
    freeShipping: true,
  },
  {
    id: '3',
    title: 'Tecno Spark 30c 128 + 4gb Magic Skin Green',
    price: 199999,
    originalPrice: 359999,
    discount: 44,
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_652360-MLA89336670123_082025-AB.webp',
    installments: {
      amount: 3,
      value: 77616,
    },
    freeShipping: true,
  },
]

const RelatedProductsCarrousel = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-medium">Productos relacionados</h2>
      <p className="mb-6 text-gray-600">Promocionado</p>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {mockProducts.map((product) => (
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
