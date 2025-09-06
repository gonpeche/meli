import React from 'react'
import Navigation from './components/Navigation'
import RelatedSearch from './components/RelatedSearch'

const HeaderContainer = () => {
  return (
    <div className="hidden sm:flex sm:flex-col">
      <RelatedSearch />
      <Navigation />
    </div>
  )
}

export default HeaderContainer
