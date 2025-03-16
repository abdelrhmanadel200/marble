"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const cart = useCart()
  const [couponCode, setCouponCode] = useState("")

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300" />
        <h1 className="text-2xl font-bold mt-4">Your cart is empty</h1>
        <p className="text-gray-600 mt-2 mb-8">Looks like you haven&apos;t added any products to your cart yet.</p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h3 className="font-medium">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Quantity</h3>
                </div>
                <div className="col-span-2 text-right">
                  <h3 className="font-medium">Total</h3>
                </div>
              </div>
            </div>

            {cart.items.map((item) => {
              const product = item.product
              const price = product.salePrice || product.price
              const total = price * item.quantity

              return (
                <div key={product.id} className="p-4 border-b last:border-b-0">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 mr-4">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${product.id}`} className="font-medium hover:text-red-600">
                            {product.name}
                          </Link>
                          {product.colors && <p className="text-sm text-gray-500">Color: {product.colors[0]}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span>${price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => cart.updateQuantity(product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => cart.updateQuantity(product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <div className="flex items-center justify-end">
                        <span className="font-medium">${total.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 text-gray-400 hover:text-red-600"
                          onClick={() => cart.removeItem(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Button variant="outline" onClick={() => cart.clearCart()}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="coupon" className="block text-sm font-medium mb-1">
                  Coupon Code
                </label>
                <div className="flex">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button className="rounded-l-none">Apply</Button>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
