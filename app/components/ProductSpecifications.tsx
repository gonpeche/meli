'use client'

import React from 'react'
import {
  Scaling,
  MemoryStick,
  Smartphone,
  SmartphoneNfc,
  Fingerprint,
  ChevronDown,
} from 'lucide-react'
import { useContextProvider } from '@/app/context/ProductContext'

interface SpecificationItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

const SpecificationItem: React.FC<SpecificationItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {icon}
      <div>
        <span className="md:text-md text-sm text-gray-600">{label}:</span>
        <span className="md:text-md pl-2 text-sm font-medium">{value}</span>
      </div>
    </div>
  )
}

const ProductSpecifications = () => {
  const {
    item: {
      page_content: {
        item_summary: { product_specifications },
      },
    },
  } = useContextProvider()

  return (
    <div className="p-4 md:p-0 md:pt-8">
      <h2 className="mb-4 text-lg font-medium md:text-xl">Características del producto</h2>
      {/* Screen Size with Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-4">
          <Scaling className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />
          <div>
            <p className="md:text-md text-sm font-normal md:font-medium">
              Tamaño de la pantalla: {product_specifications.screen_size.value}
            </p>
            <p className="md:text-md text-sm text-gray-600">
              {product_specifications.screen_size.dimensions}
            </p>
          </div>
        </div>
        <div className="mt-4 pl-8 md:pl-10">
          <div className="flex max-w-[400px] items-center">
            <span className="mr-4 text-xs text-gray-600 md:text-xs">PEQUEÑO</span>
            <div className="h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#3483fa]"
                style={{ width: `${(product_specifications.screen_size.scale / 5) * 100}%` }}
              />
            </div>
            <span className="ml-4 text-xs text-gray-600 md:text-xs">GRANDE</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-6">
        <SpecificationItem
          icon={<MemoryStick className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />}
          label="Memoria interna"
          value={product_specifications.internal_memory}
        />

        <SpecificationItem
          icon={<Smartphone className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />}
          label="Cámara frontal principal"
          value={product_specifications.main_front_camera}
        />

        <SpecificationItem
          icon={<Smartphone className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />}
          label="Cámara trasera principal"
          value={product_specifications.main_rear_camera}
        />

        <SpecificationItem
          icon={<Fingerprint className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />}
          label="Desbloqueo"
          value={product_specifications.unlock_methods}
        />

        <SpecificationItem
          icon={<SmartphoneNfc className="h-4 w-4 text-gray-600 md:h-6 md:w-6" />}
          label="Con NFC"
          value={product_specifications.nfc}
        />
      </div>

      {/* View All Specifications Link */}
      <button className="action-link flex items-center gap-2 pt-10">
        <span>Ver todas las características </span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  )
}

export default ProductSpecifications
