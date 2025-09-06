import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import Card from '../shared/Card'

const ProductContainer = () => {
  return (
    <Card className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1 border border-green-500">
        <LeftContainer />
      </div>
      <div className="w-full flex-none border border-blue-500 md:w-[325px]">
        <RightContainer />
      </div>
    </Card>
  )
}

export default ProductContainer
