'use client'

import { createContext, useContext } from 'react'
import { ContextContextType, Item } from '@/types'

const Context = createContext<ContextContextType | undefined>(undefined)

export function useContextProvider() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useContext must be used within a ContextProvider')
  }
  return context
}

export function ContextProvider({ children, item }: { children: React.ReactNode; item: Item }) {
  return <Context.Provider value={{ item }}>{children}</Context.Provider>
}
