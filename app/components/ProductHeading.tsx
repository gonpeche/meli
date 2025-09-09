'use client'

import React from 'react'
import { useContextProvider } from '@/app/context/ProductContext'
import { Heart } from 'lucide-react'

const ProductHeading = () => {
  const {
    item: {
      page_content: {
        item_summary: { header, attributes },
      },
    },
  } = useContextProvider()

  const reviews = () => {
    return (
      <div className="flex items-center">
        <span className="md:text-md pr-1 text-sm">{header.rating}</span>
        <div className="action-link flex text-sm md:text-blue-500">
          {'★'.repeat(Math.ceil(header.rating))}
        </div>
        <span className="pl-1 text-sm text-gray-500">({header.reviews})</span>
      </div>
    )
  }

  const status = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>{attributes.condition}</span>
          <span>|</span>
          <span>+{attributes.sold} vendidos</span>
        </div>
      </div>
    )
  }

  const favorite = () => {
    return <Heart className="h-6 w-6" fill={'white'} stroke={'#3483fa'} strokeWidth={1.5} />
  }

  const title = () => {
    return <h1 className="text-sm leading-7 md:text-[21px] md:font-semibold">{header.title}</h1>
  }

  const MobileHeading = () => {
    return (
      <div className="flex flex-col bg-white p-3">
        <div className="flex flex-row justify-between gap-1 pb-2 text-sm">
          {status()}
          {reviews()}
        </div>
        {title()}
      </div>
    )
  }

  const DesktopHeading = () => {
    return (
      <div className="pt-4">
        <div className="flex flex-row justify-between gap-1 pb-3 text-sm">
          {status()}
          {favorite()}
        </div>
        <div className="flex flex-col gap-1 pb-1 text-sm">
          {title()}
          {reviews()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="md:hidden">
        <MobileHeading />
      </div>
      <div className="hidden md:block">
        <DesktopHeading />
      </div>
    </div>
  )
}

export default ProductHeading
