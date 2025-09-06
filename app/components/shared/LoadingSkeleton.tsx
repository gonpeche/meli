import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Product Carousel Loading */}
      <div className="mb-8">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" /> {/* Title */}
        <div className="mb-6 h-4 w-1/4 rounded bg-gray-200" /> {/* Subtitle */}
        {/* Products Row */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[230px] flex-shrink-0">
              <div className="mb-4 h-48 w-full rounded-lg bg-gray-200" /> {/* Image */}
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" /> {/* Title */}
              <div className="mb-2 h-6 w-1/2 rounded bg-gray-200" /> {/* Price */}
              <div className="mb-1 h-4 w-2/3 rounded bg-gray-200" /> {/* Installments */}
              <div className="h-4 w-1/3 rounded bg-gray-200" /> {/* Shipping */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
