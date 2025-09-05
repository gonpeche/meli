import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import Card from '../shared/Card'


const ProductContainer = () => {
  return (
    <Card className="flex flex-col md:flex-row gap-4 ">
      <div className="flex-1 border border-green-500">
        <LeftContainer />
      </div>
      <div className="w-full md:w-[325px] flex-none border border-blue-500">
        <RightContainer />
      </div>
    </Card>
  )
}

export default ProductContainer