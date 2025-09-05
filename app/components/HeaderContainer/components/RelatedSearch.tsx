import React from 'react'

const RelatedSearch = () => {
  const items = [
    'telefonos samsung',
    'samsung galaxy',
    'samsung a55',
    'celulares 5g',
    'samsung con nfc',
    's20',
    'samsung tienda oficial',
  ]

  return (
    <div className="w-full">
      <div className="py-3">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">También puede interesarte:</span>{' '}
          {items.map((label, index) => (
            <span key={label} className="text-gray-700">
              <a href="#" className="hover:underline">
                {label}
              </a>
              {index < items.length - 1 && <span className="mx-2">-</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default RelatedSearch