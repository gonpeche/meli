import React from 'react'
import Navigation from './components/Navigation'
import RelatedSearch from './components/RelatedSearch'

const HeaderContainer = () => {
  return (
    <div>
      <RelatedSearch />
      <Navigation />
    </div>
  )
}

export default HeaderContainer