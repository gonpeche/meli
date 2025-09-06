'use client'

import { createContext, useContext } from 'react'
import { ContentContextType } from './types'
import { Item } from './types'

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export function ContentProvider({ children, item }: { children: React.ReactNode; item: Item }) {
  return <ContentContext.Provider value={{ item }}>{children}</ContentContext.Provider>
}
