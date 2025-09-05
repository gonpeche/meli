import React from 'react'

const ProductSummary = () => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      {/* Status and Favorite */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Nuevo</span>
          <span>|</span>
          <span>+1000 vendidos</span>
        </div>
        <button className="text-2xl text-gray-400 hover:text-blue-500">
          ♡
        </button>
      </div>

      {/* Title */}
      <h1 className="text-[22px] font-semibold leading-7">
        Samsung Galaxy A55 5G Dual SIM 256 GB Azul oscuro 8 GB RAM
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-md">4.8</span>
        <div className="flex text-blue-500">
          {'★'.repeat(5)}
        </div>
        <span className="text-gray-500">(460)</span>
      </div>

      {/* Price Section */}
      <div className="flex flex-col gap-1">
        <span className="text-[36px] font-light">$ 999.999</span>
        <p className="text-lg">
          6 cuotas de <span className="font-semibold">$ 226.444</span>
          <sup>11</sup> sin tarjeta
        </p>
        <p className="text-gray-500">
          Precio sin impuestos nacionales: $ 826.445
        </p>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Ver los medios de pago
        </a>
      </div>

      {/* Color Selection */}
      <div className="flex flex-col gap-3">
        <span>Color: <span className="font-bold">Azul oscuro</span></span>
        <div className="flex gap-2">
          <button className="h-12 w-12 rounded-lg border-2 border-gray-200 bg-yellow-100 hover:border-blue-500" />
          <button className="h-12 w-12 rounded-lg border-2 border-blue-500 bg-gray-900" />
          <button className="h-12 w-12 rounded-lg border-2 border-gray-200 bg-gray-100 hover:border-blue-500" />
        </div>
      </div>

      {/* Product Features */}
      <div className="flex flex-col gap-3 text-sm">
        <h2 className="font-semibold">Lo que tenés que saber de este producto</h2>
        <ul className="flex flex-col gap-2 text-gray-600 list-disc">
          <li>Memoria RAM: 8 GB.</li>
          <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
          <li>Memoria interna de 256 GB.</li>
        </ul>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Ver características
        </a>
      </div>


      {/* Buy Options */}
      <div className="flex flex-col gap-2 text-sm font-medium">
        <h2>Opciones de compra:</h2>
        <div className="flex flex-col gap-1">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            23 productos nuevos desde $ 999.999
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-600">
            1 producto usado y reacondicionado
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary