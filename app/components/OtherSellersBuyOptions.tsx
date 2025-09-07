import React from 'react'
import { ChevronRight } from 'lucide-react'
import Card from '@components/ui/Card'

const mockData = {
  optionsCount: 29,
  startingPrice: 1679999,
}

const OtherSellersBuyOptions = () => {
  // Format price with dots as thousand separators
  const formattedPrice = mockData.startingPrice.toLocaleString('es-AR')

  return (
    <Card className="bg-white p-0">
      <div className="space-y-2">
        <h3 className="text-md font-medium">Otras opciones de compra</h3>
        <button className="action-link flex w-full items-center">
          <span>
            Ver {mockData.optionsCount} opciones desde $ {formattedPrice}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  )
}

export default OtherSellersBuyOptions
