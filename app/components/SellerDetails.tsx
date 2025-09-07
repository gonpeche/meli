import Card from '@components/ui/Card'
import { Check, Truck, Clock, BadgeCheck } from 'lucide-react'
import Image from 'next/image'

const SellerDetails = () => {
  // Mocked data that will later be fetched from the backend
  const sellerData = {
    name: 'Samsung',
    isOfficial: true,
    officialLabel: 'Tienda oficial de Mercado Libre',
    productCount: '+50',
    badge: {
      type: 'MercadoLider Platinum',
      description: '¡Uno de los mejores del sitio!',
    },
    metrics: {
      sales: '+1 M',
      salesLabel: 'Ventas',
      attention: 'Buena atención',
      delivery: 'Entrega a tiempo',
    },
    logo: 'https://http2.mlstatic.com/D_NQ_NP_887675-MLA74823588370_032024-G.jpg', // This would be the actual logo URL
  }

  return (
    <Card className="flex items-center justify-center">
      <div className="w-full max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white">
        {/* Header with logo placeholder */}
        <div className="relative h-20 bg-black">
          <div className="absolute bottom-4 left-4">
            <Image
              src={sellerData.logo}
              alt={sellerData.name}
              width={52}
              height={52}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4 pt-4">
          {/* Seller name and verification */}
          <div>
            <h2 className="mb-1 text-xl font-semibold text-gray-900">{sellerData.name}</h2>
            <div className="mb-2 flex items-center gap-1">
              {sellerData.isOfficial && (
                <BadgeCheck className="h-4 w-4" fill="#3483fa" strokeWidth={2} stroke="white" />
              )}
              <span className="text-sm text-gray-600">{sellerData.officialLabel}</span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-black">{sellerData.productCount}</span> Productos
            </p>
          </div>

          {/* MercadoLider badge */}
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-600">{sellerData.badge.type}</p>
              <p className="text-xs text-gray-600">{sellerData.badge.description}</p>
            </div>
          </div>

          {/* Metrics section */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              {/* Sales */}
              <div className="flex-1 text-center">
                <p className="text-lg font-semibold text-gray-900">{sellerData.metrics.sales}</p>
                <p className="text-xs text-gray-600">{sellerData.metrics.salesLabel}</p>
              </div>

              {/* Attention */}
              <div className="flex flex-1 flex-col items-center text-center">
                <Truck className="mb-1 h-5 w-5 text-gray-600" />
                <p className="text-xs text-gray-600">{sellerData.metrics.attention}</p>
              </div>

              {/* Delivery */}
              <div className="flex flex-1 flex-col items-center text-center">
                <Clock className="mb-1 h-5 w-5 text-gray-600" />
                <p className="text-xs text-gray-600">{sellerData.metrics.delivery}</p>
              </div>
            </div>
          </div>

          {/* Call to action button */}
          <button className="btn-secondary">Ir a la tienda oficial</button>
        </div>
      </div>
    </Card>
  )
}

export default SellerDetails
