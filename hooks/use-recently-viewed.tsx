"use client"

import { useState, useEffect } from "react"
import { type Product, getProductById } from "@/lib/products"

const MAX_RECENTLY_VIEWED = 6

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])

  useEffect(() => {
    try {
      const savedRecentlyViewed = localStorage.getItem("recentlyViewed")
      if (savedRecentlyViewed) {
        const productIds = JSON.parse(savedRecentlyViewed) as string[]
        const products = productIds.map((id) => getProductById(id)).filter((product): product is Product => !!product)
        setRecentlyViewed(products)
      }
    } catch (error) {
      console.error("Failed to load recently viewed products:", error)
    }
  }, [])

  const addProduct = (product: Product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter((p) => p.id !== product.id)
      // Add to beginning of array
      const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED)

      // Save to localStorage
      try {
        localStorage.setItem("recentlyViewed", JSON.stringify(updated.map((p) => p.id)))
      } catch (error) {
        console.error("Failed to save recently viewed products:", error)
      }

      return updated
    })
  }

  return { recentlyViewed, addProduct }
}
