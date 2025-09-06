import React from 'react'

type LoadingSkeletonProps = {
  type: 'relatedProducts' | 'sellerProducts'
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  const RelatedProductsSkeleton = () => (
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
  )

  const SellerProductsSkeleton = () => (
    <div className="mb-8">
      <div className="mb-4 h-8 w-1/3 rounded bg-gray-200" /> {/* Title */}
      <div className="mb-6 h-4 w-1/4 rounded bg-gray-200" /> {/* Subtitle */}
      {/* Products List */}
      <div className="flex gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full cursor-pointer transition-shadow hover:shadow-md md:h-[140px] md:w-[350px]"
          >
            <div className="flex h-full gap-4">
              <div className="relative h-[140px] w-[140px] flex-shrink-0 rounded bg-gray-200 md:h-full md:w-[110px]" />{' '}
              {/* Image */}
              <div className="flex flex-col justify-between py-1">
                <div className="h-4 w-3/4 rounded bg-gray-200" /> {/* Title */}
                <div>
                  <div className="mb-2 h-6 w-24 rounded bg-gray-200" /> {/* Price */}
                  <div className="mb-1 h-4 w-48 rounded bg-gray-200" /> {/* Installments */}
                  <div className="h-4 w-20 rounded bg-gray-200" /> {/* Shipping */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full animate-pulse">
      {type === 'relatedProducts' ? <RelatedProductsSkeleton /> : <SellerProductsSkeleton />}
    </div>
  )
}

export default LoadingSkeleton
