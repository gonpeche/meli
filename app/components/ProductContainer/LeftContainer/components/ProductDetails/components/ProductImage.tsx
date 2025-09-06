'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useContextProvider } from '@/app/context/ProductContext'

const ProductImage = () => {
  const {
    item: {
      page_content: {
        item_image: { images },
      },
    },
  } = useContextProvider()

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            onMouseEnter={() => setSelectedImage(index)}
            className={`relative h-[48px] w-[48px] overflow-hidden rounded border hover:cursor-pointer ${
              selectedImage === index ? 'border-blue-500' : 'border-gray-200'
            } hover:border-blue-500 focus:border-blue-500`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-contain"
              sizes="48px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-[350px]">
        <Image
          src={images[selectedImage]}
          alt="Product image"
          fill
          className="object-contain"
          sizes="350px"
          priority
        />
      </div>
    </div>
  )
}

export default ProductImage
