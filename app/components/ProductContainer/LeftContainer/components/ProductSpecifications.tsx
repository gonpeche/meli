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
import { useContent } from '@/app/context/ProductContext'

interface SpecificationItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

const SpecificationItem: React.FC<SpecificationItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <span className="text-gray-600">{label}:</span>
        <span className="pl-2 font-medium">{value}</span>
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
  } = useContent()

  return (
    <div className="pt-8">
      <h2 className="mb-4 text-2xl font-medium">Características del producto</h2>
      {/* Screen Size with Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-4">
          <Scaling className="h-6 w-6 text-gray-600" />
          <div>
            <p className="font-medium">
              Tamaño de la pantalla: {product_specifications.screen_size.value}
            </p>
            <p className="text-gray-600">{product_specifications.screen_size.dimensions}</p>
          </div>
        </div>
        <div className="mt-4 pl-10">
          <div className="flex max-w-[400px] items-center">
            <span className="mr-4 text-sm text-gray-600">PEQUEÑO</span>
            <div className="h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#3483fa]"
                style={{ width: `${(product_specifications.screen_size.scale / 5) * 100}%` }}
              />
            </div>
            <span className="ml-4 text-sm text-gray-600">GRANDE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-16 gap-y-6">
        <SpecificationItem
          icon={<MemoryStick className="h-6 w-6 text-gray-600" />}
          label="Memoria interna"
          value={product_specifications.internal_memory}
        />

        <SpecificationItem
          icon={<Smartphone className="h-6 w-6 text-gray-600" />}
          label="Cámara frontal principal"
          value={product_specifications.main_front_camera}
        />

        <SpecificationItem
          icon={<Smartphone className="h-6 w-6 text-gray-600" />}
          label="Cámara trasera principal"
          value={product_specifications.main_rear_camera}
        />

        <SpecificationItem
          icon={<Fingerprint className="h-6 w-6 text-gray-600" />}
          label="Desbloqueo"
          value={product_specifications.unlock_methods}
        />

        <SpecificationItem
          icon={<SmartphoneNfc className="h-6 w-6 text-gray-600" />}
          label="Con NFC"
          value={product_specifications.nfc}
        />
      </div>

      {/* View All Specifications Link */}
      <button className="flex items-center gap-2 pt-10 font-medium text-blue-500 hover:cursor-pointer hover:text-blue-600">
        <span>Ver todas las características </span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  )
}

export default ProductSpecifications
