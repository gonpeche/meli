import React from 'react'

const Breadcrumbs = () => {
  const crumbs = [
    'Celulares y Teléfonos',
    'Celulares y Smartphones',
    'Samsung',
  ]

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <a href="#" className="text-sky-600 hover:underline">Volver al listado</a>
      <span className="mx-3 text-gray-300">|</span>
      <div className="flex items-center">
        {crumbs.map((label, index) => (
          <span key={label} className="flex items-center">
            <a href="#" className="text-sky-600 hover:underline">{label}</a>
            {index < crumbs.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumbs