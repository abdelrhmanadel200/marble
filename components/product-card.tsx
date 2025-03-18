"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star, ShoppingCart, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product, ProductCategory } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCompare } from "@/contexts/compare-context"
import { useState, useEffect } from "react"
import { getCategoryById } from "@/lib/productService"

interface ProductCardProps {
  product: Product
  categories?: ProductCategory[]
}

export function ProductCard({ product, categories }: ProductCardProps) {
  const cart = useCart()
  const wishlist = useWishlist()
  const compare = useCompare()
  const [showActions, setShowActions] = useState(false)
  const [category, setCategory] = useState<ProductCategory | null>(null)

  useEffect(() => {
    // If categories are provided, find the matching category
    if (categories) {
      const matchingCategory = categories.find((c) => c.id === product.category)
      if (matchingCategory) {
        setCategory(matchingCategory)
        return
      }
    }

    // Otherwise fetch the category
    const fetchCategory = async () => {
      if (product.category) {
        try {
          const categoryData = await getCategoryById(product.category)
          setCategory(categoryData)
        } catch (error) {
          console.error("Error fetching category:", error)
        }
      }
    }

    fetchCategory()
  }, [product.category, categories])

  return (
    <div
      className="border rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Quick Action Buttons */}
        <div
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-200 ${showActions ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white rounded-full h-8 w-8 shadow-sm hover:text-red-600"
            onClick={() => wishlist.toggleItem(product)}
            title={wishlist.isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`h-4 w-4 ${wishlist.isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="bg-white rounded-full h-8 w-8 shadow-sm hover:text-blue-600"
            onClick={() => compare.toggleItem(product)}
            title={compare.isInCompare(product.id) ? "Remove from Compare" : "Add to Compare"}
          >
            <BarChart2 className={`h-4 w-4 ${compare.isInCompare(product.id) ? "fill-blue-600 text-blue-600" : ""}`} />
          </Button>
        </div>

        {/* Sale Tag */}
        {product.salePrice && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Sale</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
        </div>

        {/* Category Badge */}
        {category && (
          <Link href={`/products?category=${category.id}`}>
            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mb-2 hover:bg-gray-200">
              {category.name}
            </span>
          </Link>
        )}

        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium mb-1 hover:text-red-600">{product.name}</h3>
        </Link>

        <div className="mb-4">
          {product.salePrice ? (
            <>
              <span className="text-red-600 font-bold">${product.salePrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => cart.addItem(product, 1)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
