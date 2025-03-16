"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const wishlist = useWishlist()
  const cart = useCart()

  if (wishlist.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-gray-300" />
        <h1 className="text-2xl font-bold mt-4">Your wishlist is empty</h1>
        <p className="text-gray-600 mt-2 mb-8">Looks like you haven&apos;t added any products to your wishlist yet.</p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.items.map((product) => (
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
                onClick={() => wishlist.removeItem(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="font-medium hover:text-red-600">{product.name}</h3>
                <div className="flex items-center mt-1 mb-4">
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

              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => {
                  cart.addItem(product, 1)
                  wishlist.removeItem(product.id)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
