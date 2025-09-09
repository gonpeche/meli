'use client'

import React from 'react'
import Card from '@/app/components/ui/Card'
import Image from 'next/image'
import { usePaymentOptions } from '@/app/hooks/usePaymentOptions'
import { useContextProvider } from '@/app/context/ProductContext'
import { PaymentMethod } from '@/types'
import LoadingSkeleton from '@/app/components/ui/LoadingSkeleton'

const PaymentMethodSection = ({ title, methods }: { title: string; methods: PaymentMethod[] }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm">{title}</h4>
      <div className="flex flex-wrap gap-4">
        {methods.map((method) => (
          <Image
            key={method.name}
            src={method.logo}
            alt={method.alt}
            width={method.width}
            height={method.height}
            className="object-contain"
          />
        ))}
      </div>
    </div>
  )
}

const PaymentOptions = () => {
  const {
    item: { id: productId },
  } = useContextProvider()
  const { data = [], isLoading, error } = usePaymentOptions(productId)

  if (isLoading) {
    return <LoadingSkeleton type="paymentOptions" />
  }

  if (data.length === 0 || error) {
    return null
  }

  return (
    <Card>
      <div className="space-y-6">
        <h3 className="text-md font-medium">Medios de pago</h3>

        {/* Render all payment method sections */}
        {data.map((section) => (
          <PaymentMethodSection key={section.id} title={section.title} methods={section.methods} />
        ))}

        {/* More Payment Methods Link */}
        <button className="action-link text-sm">Conocé otros medios de pago</button>
      </div>
    </Card>
  )
}

export default PaymentOptions
