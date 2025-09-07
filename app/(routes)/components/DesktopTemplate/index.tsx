import React from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import RelatedSearch from '@/app/components/RelatedSearch'
import Navigation from '@/app/components/Navigation'
import Card from '@/app/components/ui/Card'

const DesktopTemplate = () => {
  return (
    <>
      <div>
        <RelatedSearch />
        <Navigation />
      </div>
      <Card className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <LeftContainer />
        </div>
        <div className="w-full flex-none md:w-[325px]">
          <RightContainer />
        </div>
      </Card>
    </>
  )
}

export default DesktopTemplate
