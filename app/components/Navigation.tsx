import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import ActionItems from './ActionItems'

const Navigation = () => {
  return (
    <div className="w-full py-2">
      <div className="flex justify-between">
        <Breadcrumbs />
        <ActionItems />
      </div>
    </div>
  )
}

export default Navigation
