import React from 'react'
import { BadgeCheck, ChevronDown, RotateCcw, ShieldCheck } from 'lucide-react'
import Card from '@/app/components/shared/Card'

const mockData = {
  delivery: {
    free: true,
    dates: {
      delivery: { start: '18', end: '23/sep' },
      pickup: { start: '16', end: '19/sep' },
    },
  },
  stock: {
    quantity: 1,
    available: 50,
  },
  seller: {
    name: 'Samsung',
    sales: '+100',
  },
}

const BuySection = () => {
  return (
    <Card>
      {/* Delivery Info */}
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-bold text-[#00a650]">Envío gratis</span>
          <span className="pl-1 font-medium">a todo el país</span>
        </div>
        <div className="text-sm text-gray-500">Conoce los tiempos y las formas de envío.</div>
        <button className="pt-2 text-sm font-light text-[#3483fa] hover:text-blue-600">
          Calcular cuándo llega
        </button>
      </div>

      {/* Stock Info */}
      <div className="mb-6">
        <h3 className="text-md mb-4 font-bold">Stock disponible</h3>
        <div className="mb-2 flex items-center gap-1 text-sm">
          <span>Cantidad: </span>
          <button className="flex items-center gap-1 font-bold">
            {mockData.stock.quantity} unidad
            <ChevronDown className="h-4 w-4" />
          </button>
          <span className="text-gray-400">({`+${mockData.stock.available} disponibles`})</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-col gap-3">
        <button className="w-full rounded-lg bg-[#3483fa] py-3.5 text-white hover:cursor-pointer hover:bg-blue-600">
          Comprar ahora
        </button>
        <button className="w-full rounded-lg bg-[#e3edfb] py-3.5 text-[#3483fa] hover:cursor-pointer hover:bg-blue-100">
          Agregar al carrito
        </button>
      </div>

      {/* Seller Info */}
      <div className="mb-6">
        <div className="mb-1 flex gap-2">
          <span>Vendido por </span>
          <button className="flex items-center gap-1 text-[#3483fa] hover:text-blue-600">
            {mockData.seller.name}{' '}
            <BadgeCheck className="h-4 w-4" fill="#3483fa" strokeWidth={2} stroke="white" />
          </button>
        </div>
        <span className="text-sm font-bold">{mockData.seller.sales} ventas</span>
      </div>

      {/* Protection Info */}
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-start gap-2">
          <RotateCcw className="h-5 w-5 text-[#3483fa]" />
          <div>
            <span className="text-[#3483fa]">Devolución gratis.</span>
            <span className="text-gray-500"> Tenés 30 días desde que lo recibís.</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-8 w-8 text-[#3483fa]" />
          <div>
            <span className="text-[#3483fa]">Compra Protegida,</span>
            <span className="text-gray-500">
              {' '}
              recibí el producto que esperabas o te devolvemos tu dinero.
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BuySection
