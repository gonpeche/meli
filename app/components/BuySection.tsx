import React from 'react'
import { BadgeCheck, ChevronDown, RotateCcw, ShieldCheck } from 'lucide-react'
import Card from './ui/Card'

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
    <Card className="rounded-lg border-0 bg-white p-2 md:border-1 md:p-6">
      {/* Delivery Info */}
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-bold text-[#00a650]">Envío gratis</span>
          <span className="pl-1 font-medium">a todo el país</span>
        </div>
        <div className="text-sm text-gray-500">Conoce los tiempos y las formas de envío.</div>
        <button className="action-link pt-2 text-sm">Calcular cuándo llega</button>
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
        <button className="btn-primary">Comprar ahora</button>
        <button className="btn-secondary">Agregar al carrito</button>
      </div>

      {/* Seller Info */}
      <div className="mb-6">
        <div className="md:text-md mb-0 flex gap-2 text-sm md:mb-1">
          <span>Vendido por </span>
          <button className="action-link flex items-center gap-1">
            {mockData.seller.name}{' '}
            <BadgeCheck className="h-4 w-4" fill="#3483fa" strokeWidth={2} stroke="white" />
          </button>
        </div>
        <span className="text-sm font-bold">{mockData.seller.sales} ventas</span>
      </div>

      {/* Protection Info */}
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-start gap-2">
          <RotateCcw className="mt-1 h-4 w-4 text-[#3483fa] md:h-5 md:w-5" />
          <div>
            <span className="text-[#3483fa]">Devolución gratis.</span>
            <span className="text-gray-500"> Tenés 30 días desde que lo recibís.</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-1 h-4 w-4 text-[#3483fa] md:h-5 md:w-5" />
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
