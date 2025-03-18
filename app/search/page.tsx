"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { getProducts, getCategories } from "@/lib/productService"
import type { Product, ProductCategory } from "@/types/product"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
        setError(null)
      } catch (error: any) {
        console.error("Error fetching search results:", error)
        setError(error.message || "Failed to load search results")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Memoize filtered results to avoid recalculating on every render
  const searchResults = useMemo(() => {
    if (!query) return products

    const lowercaseQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        categories
          .find((c) => c.id === product.category)
          ?.name.toLowerCase()
          .includes(lowercaseQuery),
    )
  }, [products, categories, query])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {searchResults.length} results for "{query}"
      </p>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold mt-4">No products found</h2>
          <p className="text-gray-600 mt-2 mb-8">We couldn't find any products matching your search.</p>
          <Link href="/products">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Browse All Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => {
            const category = categories.find((c) => c.id === product.category)

            return (
              <div key={product.id} className="border rounded-lg overflow-hidden group">
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=300&width=400&text=Stone+Product"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium hover:text-blue-600">{product.name}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{category ? category.name : product.category}</span>
                      <span className="text-blue-600 text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
