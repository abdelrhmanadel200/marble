"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getProducts, getCategories, getProductsByCategory } from "@/lib/productService"
import type { Product, ProductCategory } from "@/types/product"
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton"
import { CategorySkeleton } from "@/components/skeletons/category-skeleton"
import { useScrollTop } from "@/hooks/use-scroll-top"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  // Use the scroll top hook
  useScrollTop()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch categories
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        // Find current category if categoryParam exists
        if (categoryParam) {
          const category = categoriesData.find((c) => c.id === categoryParam)
          setCurrentCategory(category || null)
        } else {
          setCurrentCategory(null)
        }

        // Fetch products based on category filter
        let productsData: Product[] = []
        if (categoryParam) {
          console.log(`Fetching products for category: ${categoryParam}`)
          productsData = await getProductsByCategory(categoryParam)
          console.log(`Fetched ${productsData.length} products for category ${categoryParam}`)
        } else {
          productsData = await getProducts()
          console.log(`Fetched ${productsData.length} total products`)
        }

        setProducts(productsData)
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(err.message || "Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryParam])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {loading ? "Loading..." : currentCategory ? currentCategory.name : "All Products"}
      </h1>

      {/* Category description if available and not loading */}
      {!loading && currentCategory && currentCategory.description && (
        <p className="text-gray-600 mb-8">{currentCategory.description}</p>
      )}

      {/* Category filters - show skeleton when loading */}
      {loading ? (
        <CategorySkeleton />
      ) : (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-md ${!categoryParam ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={`px-4 py-2 rounded-md ${categoryParam === category.id ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products grid - show skeleton when loading */}
      {loading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
          <Link href="/" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
            Return to Home
          </Link>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const productCategory = categories.find((c) => c.id === product.category)

            return (
              <div key={product.id} className="border rounded-lg overflow-hidden group">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=300&width=400&text=Stone+Product"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {productCategory ? productCategory.name : "Uncategorized"}
                      </span>
                      <span className="text-blue-600 text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
          <Link href="/products" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
            View All Products
          </Link>
        </div>
      )}
    </div>
  )
}
