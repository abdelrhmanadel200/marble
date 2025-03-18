"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/products"

type CompareContextType = {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInCompare: (productId: string) => boolean
  clearAll: () => void
  itemCount: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  // Load compare list from localStorage on client side
  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem("compare")
      if (savedCompare) {
        setItems(JSON.parse(savedCompare))
      }
    } catch (error) {
      console.error("Failed to load compare list from localStorage:", error)
    }
  }, [])

  // Save compare list to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("compare", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save compare list to localStorage:", error)
    }
  }, [items])

  const addItem = (product: Product) => {
    // Limit to 4 products for comparison
    if (items.length >= 4) {
      alert("You can compare up to 4 products at a time. Please remove a product first.")
      return
    }

    setItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems
      }
      return [...prevItems, product]
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const toggleItem = (product: Product) => {
    if (isInCompare(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const isInCompare = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  const clearAll = () => {
    setItems([])
  }

  const itemCount = items.length

  return (
    <CompareContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInCompare,
        clearAll,
        itemCount,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
