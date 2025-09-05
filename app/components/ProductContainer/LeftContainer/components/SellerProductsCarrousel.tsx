import React from 'react'
import Card from '@/app/components/shared/Card'
import Image from 'next/image'

type Product = {
  id: string
  title: string
  price: number
  image: string
  installments: {
    quantity: number
    amount: number
  }
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Samsung Galaxy A25 5g 128gb Azul Oscuro 6gb Ram',
    price: 699999,
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_981119-MLA74556532513_022024-T.webp',
    installments: {
      quantity: 6,
      amount: 158602,
    },
  },
  {
    id: '2',
    title: 'Samsung Galaxy A55 256gb Awesome Lilac 8gb Ram',
    price: 1197814,
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_949261-MLU77500507682_072024-T.webp',
    installments: {
      quantity: 9,
      amount: 208976,
    },
  },
]

const ProductCard = ({ product }: { product: Product }) => {
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
  return (
    <div className="space-y-4 border border-red-500 pt-4">
      <h2 className="text-2xl font-medium">Productos de Samsung</h2>
      <div className="flex flex-col gap-4 pb-4 md:flex-row md:overflow-x-auto">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="text-sm text-blue-500 hover:text-blue-600">Ver más productos de Samsung</p>
    </div>
  )
}

export default SellerProductsCarrousel
