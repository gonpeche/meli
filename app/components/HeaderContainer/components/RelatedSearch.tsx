'use client'

import React from 'react'
import { useContent } from '@/app/context/ProductContext'

const RelatedSearch = () => {
  const { item } = useContent()
  const suggestions = item?.header?.suggestions || []

  return (
    <div className="w-full">
      <div className="py-3">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">También puede interesarte:</span>{' '}
          {suggestions.map((label, index) => (
            <span key={label} className="text-gray-700">
              <a href="#" className="hover:underline">
                {label}
              </a>
              {index < suggestions.length - 1 && <span className="mx-2">-</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default RelatedSearch
