import React from 'react'

interface DescriptionSection {
  title: string
  content: string
}

const productDescription: DescriptionSection[] = [
  {
    title: 'Capacidad y eficiencia',
    content:
      'Con su potente procesador y 8 GB de RAM, su computadora logrará un alto rendimiento con una alta velocidad de transmisión de contenido y ejecutará varias aplicaciones al mismo tiempo, sin demoras.',
  },
  {
    title: 'Capacidad de almacenamiento ilimitada',
    content:
      'Olvídate de borrar. Con su memoria interna de 256 GB puedes descargar todos los archivos y aplicaciones que necesites, guardar fotos y almacenar tus películas, series y vídeos favoritos para reproducirlos cuando quieras.',
  },
]

const ProductDescription = () => {
  return (
    <div className="pt-8">
      <h2 className="mb-8 text-2xl font-medium">Descripción</h2>
      <div className="flex flex-col gap-6">
        {productDescription.map((section, index) => (
          <div key={index}>
            <h3 className="mb-2 text-lg text-gray-600">{section.title}</h3>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDescription
