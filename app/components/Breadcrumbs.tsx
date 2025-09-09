'use client'

import React from 'react'
import { useContextProvider } from '@/app/context/ProductContext'

const Breadcrumbs = () => {
  const { item } = useContextProvider()
  const crumbs = item?.header?.breadcrumbs || []

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <a href="#" className="action-link">
        Volver al listado
      </a>
      <span className="mx-3 text-gray-300">|</span>
      <div className="flex items-center">
        {crumbs.map((label, index) => (
          <span key={label} className="flex items-center">
            <a href="#" className="action-link">
              {label}
            </a>
            {index < crumbs.length - 1 && <span className="mx-2 text-gray-400">›</span>}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumbs
