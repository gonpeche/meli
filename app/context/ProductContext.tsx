'use client'

import { createContext, useContext } from 'react'

// Define the shape of our product data
export interface Item {
  header: {
    suggestions: string[]
    breadcrumbs: string[]
  }
}

export interface ContentContextType {
  item: Item | null
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function useProduct() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useProduct must be used within a ContentProvider')
  }
  return context
}

export function ContentProvider({ children, item }: { children: React.ReactNode; item: Item }) {
  console.log('🚀 ~ ProductProvider ~ item:', item)
  return <ContentContext.Provider value={{ item }}>{children}</ContentContext.Provider>
}
