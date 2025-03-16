"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { products } from "@/lib/products"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { Checkbox } from "@/components/ui/checkbox"

const categories = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining", name: "Dining" },
  { id: "office", name: "Office" },
]

const priceRanges = [
  { id: "0-500", name: "Under $500" },
  { id: "500-1000", name: "$500 - $1000" },
  { id: "1000-2000", name: "$1000 - $2000" },
  { id: "2000+", name: "Over $2000" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")
  const wishlist = useWishlist()
  const cart = useCart()

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId],
    )
  }

  const isInPriceRange = (price: number, range: string) => {
    switch (range) {
      case "0-500":
        return price < 500
      case "500-1000":
        return price >= 500 && price < 1000
      case "1000-2000":
        return price >= 1000 && price < 2000
      case "2000+":
        return price >= 2000
      default:
        return false
    }
  }

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      const price = product.salePrice || product.price
      return selectedPriceRanges.some((range) => isInPriceRange(price, range))
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price
    const priceB = b.salePrice || b.price

    switch (sortOption) {
      case "price-low-high":
        return priceA - priceB
      case "price-high-low":
        return priceB - priceA
      case "newest":
        return 0 // In a real app, you'd sort by date
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // Featured - could be a custom order in a real app
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="w-full md:w-64 hidden md:block">
          <div className="border rounded-lg p-4">
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm cursor-pointer">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <Checkbox
                      id={`price-${range.id}`}
                      checked={selectedPriceRanges.includes(range.id)}
                      onCheckedChange={() => togglePriceRange(range.id)}
                    />
                    <label htmlFor={`price-${range.id}`} className="ml-2 text-sm cursor-pointer">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden mb-4">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`mobile-category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label htmlFor={`mobile-category-${category.id}`} className="ml-2 text-sm cursor-pointer">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <Checkbox
                      id={`mobile-price-${range.id}`}
                      checked={selectedPriceRanges.includes(range.id)}
                      onCheckedChange={() => togglePriceRange(range.id)}
                    />
                    <label htmlFor={`mobile-price-${range.id}`} className="ml-2 text-sm cursor-pointer">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">{sortedProducts.length} products</p>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border rounded-md p-2"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden group">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 shadow-sm hover:text-red-600"
                    onClick={() => wishlist.toggleItem(product)}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlist.isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""}`}
                    />
                  </Button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-medium hover:text-red-600">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="mt-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-red-600 font-bold">${product.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </Link>

                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700" onClick={() => cart.addItem(product, 1)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products match your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedPriceRanges([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
