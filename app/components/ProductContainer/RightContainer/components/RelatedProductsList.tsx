import React from 'react'
import Image from 'next/image'
import Card from '@/app/components/shared/Card'

interface Product {
  id: string
  title: string
  image: string
  originalPrice: number
  price: number
  discount?: number
  installments: {
    quantity: number
    amount: number
  }
  freeShipping: boolean
  fullDelivery?: boolean
  promoted?: boolean
}

// Mock data that will later be fetched from the backend
const relatedProducts: Product[] = [
  {
    id: '1',
    title: 'Motorola Moto G54 Power Edition 5g 12gb Ram 256g',
    image: 'https://http2.mlstatic.com/D_Q_NP_784416-MLA89844418221_082025-AB.webp',
    originalPrice: 499999,
    price: 460749.08,
    discount: 7,
    installments: {
      quantity: 2,
      amount: 230374.54,
    },
    freeShipping: true,
    fullDelivery: true,
    promoted: true,
  },
  {
    id: '2',
    title: 'Xiaomi Poco Poco F6 5g Dual + Hidrogel Hd De',
    image: 'https://http2.mlstatic.com/D_Q_NP_684197-MLA89838909914_082025-AB.webp',
    originalPrice: 652999,
    price: 620349.05,
    discount: 5,
    installments: {
      quantity: 3,
      amount: 206783.02,
    },
    freeShipping: true,
  },
  {
    id: '3',
    title: 'Motorola Moto G54 Power Edition 5g 12gb Ram 256g',
    image: 'https://http2.mlstatic.com/D_Q_NP_758843-MLA86166596970_062025-AB.webp',
    originalPrice: 714999,
    price: 679249.05,
    discount: 5,
    installments: {
      quantity: 9,
      amount: 75472.12,
    },
    freeShipping: true,
  },
  {
    id: '4',
    title: 'Celular Tecno Pova 6 8gb Ram 256gb Rom Interstell',
    image: 'https://http2.mlstatic.com/D_Q_NP_969304-MLA81434301874_122024-AB.webp',
    originalPrice: 419999,
    price: 385999,
    discount: 8,
    installments: {
      quantity: 6,
      amount: 64333.17,
    },
    freeShipping: true,
    fullDelivery: true,
  },
]

const ProductCard = ({ product }: { product: Product }) => {
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
              {product.installments.quantity} cuotas de $ {formatPrice(product.installments.amount)}
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

const ProductList = ({ products }: { products: Product[] }) => (
  <div className="space-y-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)

const RelatedProductsList = () => {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium">Productos relacionados</h3>
          {relatedProducts[0].promoted && (
            <span className="text-sm text-gray-500">Promocionado</span>
          )}
        </div>
        <ProductList products={relatedProducts} />
      </div>
    </Card>
  )
}

export default RelatedProductsList
