import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import ActionItems from './ActionItems'

const Navigation = () => {
  return (
    <div className="w-full">
      <div className="py-3">
        <div className="flex items-center justify-between">
          <Breadcrumbs />
          <ActionItems />
        </div>
      </div>
    </div>
  )
}

export default Navigation