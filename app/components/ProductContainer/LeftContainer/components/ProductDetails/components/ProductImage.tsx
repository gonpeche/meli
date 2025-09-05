"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const ProductImage = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const images = [
    'https://http2.mlstatic.com/D_NQ_NP_2X_800035-MLA81367078349_122024-F.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_621964-MLA81364948571_122024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_777643-MLA75395342152_042024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_725539-MLA80825742603_112024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_832248-MLA81366749957_122024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_780712-MLA81099188364_122024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_818960-MLA81099131368_122024-R.webp',
    'https://http2.mlstatic.com/D_Q_NP_2X_868167-MLA81099064398_122024-R.webp',
  ]

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((src, index) => (
                      <button
              key={index}
              onClick={() => setSelectedImage(index)}
              onMouseEnter={() => setSelectedImage(index)}
              className={`relative h-[48px] w-[48px] hover:cursor-pointer overflow-hidden rounded border ${
                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
              } hover:border-blue-500 focus:border-blue-500`}
            >
            <Image
              src={src}
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

