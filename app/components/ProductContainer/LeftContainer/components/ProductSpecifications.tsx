import React from 'react'
import {
  Scaling,
  MemoryStick,
  Smartphone,
  SmartphoneNfc,
  Fingerprint,
  ChevronDown,
} from 'lucide-react'

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

// Mock data for product specifications
const productSpecifications = {
  screenSize: {
    value: '6.6 "',
    dimensions: '(16.11 cm x 7.74 cm x 8.2 mm)',
    scale: 4, // Scale from 1-5 to represent the progress bar position
  },
  internalMemory: '256 GB',
  mainRearCamera: '50 Mpx',
  mainFrontCamera: '32 Mpx',
  unlockMethods: 'Huella dactilar y reconocimiento facial',
  nfc: 'Sí',
}

const ProductSpecifications = () => {
  return (
    <div className="pt-8">
      <h2 className="mb-4 text-2xl font-medium">Características del producto</h2>
      {/* Screen Size with Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-4">
          <Scaling className="h-6 w-6 text-gray-600" />
          <div>
            <p className="font-medium">
              Tamaño de la pantalla: {productSpecifications.screenSize.value}
            </p>
            <p className="text-gray-600">{productSpecifications.screenSize.dimensions}</p>
          </div>
        </div>
        <div className="mt-4 pl-10">
          <div className="flex max-w-[400px] items-center">
            <span className="mr-4 text-sm text-gray-600">PEQUEÑO</span>
            <div className="h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#3483fa]"
                style={{ width: `${(productSpecifications.screenSize.scale / 5) * 100}%` }}
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
          value={productSpecifications.internalMemory}
        />

        <SpecificationItem
          icon={<Smartphone className="h-6 w-6 text-gray-600" />}
          label="Cámara frontal principal"
          value={productSpecifications.mainFrontCamera}
        />

        <SpecificationItem
          icon={<Smartphone className="h-6 w-6 text-gray-600" />}
          label="Cámara trasera principal"
          value={productSpecifications.mainRearCamera}
        />

        <SpecificationItem
          icon={<Fingerprint className="h-6 w-6 text-gray-600" />}
          label="Desbloqueo"
          value={productSpecifications.unlockMethods}
        />

        <SpecificationItem
          icon={<SmartphoneNfc className="h-6 w-6 text-gray-600" />}
          label="Con NFC"
          value={productSpecifications.nfc}
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
