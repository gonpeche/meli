import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import ActionItems from './ActionItems'

const Navigation = () => {
  return (
    <div className="w-full">
      <div className="py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
          <Breadcrumbs />
          <ActionItems />
        </div>
      </div>
    </div>
  )
}

export default Navigation