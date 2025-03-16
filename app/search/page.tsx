"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/products"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const searchResults = searchProducts(query)
  const wishlist = useWishlist()
  const cart = useCart()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {searchResults.length} results for &quot;{query}&quot;
      </p>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-300" />
          <h2 className="text-2xl font-bold mt-4">No products found</h2>
          <p className="text-gray-600 mt-2 mb-8">We couldn&apos;t find any products matching your search.</p>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">Browse All Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
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
      )}
    </div>
  )
}
