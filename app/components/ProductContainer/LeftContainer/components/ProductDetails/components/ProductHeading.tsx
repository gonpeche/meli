import React from 'react'

const ProductHeading = () => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      {/* Status and Favorite */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Nuevo</span>
          <span>|</span>
          <span>+1000 vendidos</span>
        </div>
        <button className="text-2xl text-gray-400 hover:text-blue-500">♡</button>
      </div>

      {/* Title */}
      <h1 className="text-md leading-7 font-semibold md:text-[22px]">
        Samsung Galaxy A55 5G Dual SIM 256 GB Azul oscuro 8 GB RAM
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-md">4.8</span>
        <div className="flex text-blue-500">{'★'.repeat(5)}</div>
        <span className="text-gray-500">(460)</span>
      </div>
    </div>
  )
}

export default ProductHeading
