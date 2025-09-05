import React from 'react'
import Card from '@/app/components/shared/Card'
import Image from 'next/image'

interface PaymentMethod {
  name: string
  logo: string
  alt: string
  width: number
  height: number
}

const paymentMethods = {
  mercadoPago: {
    title: 'Cuotas sin Tarjeta',
    methods: [
      {
        name: 'Mercado Pago',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-m.svg',
        alt: 'Mercado Pago',
        width: 80,
        height: 20,
      },
    ],
  },
  creditCards: {
    title: 'Tarjetas de crédito',
    methods: [
      {
        name: 'Visa Credit',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg',
        alt: 'Visa',
        width: 48,
        height: 30,
      },
      {
        name: 'American Express',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg',
        alt: 'American Express',
        width: 48,
        height: 30,
      },
      {
        name: 'Mastercard',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg',
        alt: 'Mastercard',
        width: 48,
        height: 30,
      },
      {
        name: 'Naranja',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg',
        alt: 'Naranja',
        width: 48,
        height: 30,
      },
    ],
  },
  debitCards: {
    title: 'Tarjetas de débito',
    methods: [
      {
        name: 'Visa Debit',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
        alt: 'Visa Débito',
        width: 48,
        height: 30,
      },
      {
        name: 'Maestro',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-m.svg',
        alt: 'Maestro',
        width: 48,
        height: 30,
      },
      {
        name: 'Mastercard Debit',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/157dce60-571b-11e8-95d8-631c1a9a92a9-m.svg',
        alt: 'Mastercard Débito',
        width: 48,
        height: 30,
      },
    ],
  },
  cash: {
    title: 'Efectivo',
    methods: [
      {
        name: 'PagoFacil',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/fec5f230-06ee-11ea-8e1e-273366cc763d-m.svg',
        alt: 'Pago Fácil',
        width: 48,
        height: 30,
      },
      {
        name: 'Rapipago',
        logo: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
        alt: 'Rapipago',
        width: 48,
        height: 30,
      },
    ],
  },
}

const PaymentMethodSection = ({ title, methods }: { title: string; methods: PaymentMethod[] }) => (
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

const PaymentOptions = () => {
  return (
    <Card>
      <div className="space-y-6">
        <h3 className="text-md font-medium">Medios de pago</h3>

        {/* Mercado Pago */}
        <PaymentMethodSection
          title={paymentMethods.mercadoPago.title}
          methods={paymentMethods.mercadoPago.methods}
        />

        {/* Credit Cards */}
        <PaymentMethodSection
          title={paymentMethods.creditCards.title}
          methods={paymentMethods.creditCards.methods}
        />

        {/* Debit Cards */}
        <PaymentMethodSection
          title={paymentMethods.debitCards.title}
          methods={paymentMethods.debitCards.methods}
        />

        {/* Cash */}
        <PaymentMethodSection
          title={paymentMethods.cash.title}
          methods={paymentMethods.cash.methods}
        />

        {/* More Payment Methods Link */}
        <button className="text-sm text-[#3483fa] hover:text-blue-600">
          Conocé otros medios de pago
        </button>
      </div>
    </Card>
  )
}

export default PaymentOptions
