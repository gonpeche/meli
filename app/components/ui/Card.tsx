import React from 'react'

type CardProps = {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-white rounded-md border p-4 border-gray-200 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export default Card