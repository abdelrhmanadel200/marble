"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Heart, Star, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import Link from "next/link"
import { ProductInquiryForm } from "@/components/product-inquiry-form"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const relatedProducts = product ? getRelatedProducts(product) : []
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const cart = useCart()
  const wishlist = useWishlist()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    cart.addItem(product, quantity)
  }

  const handleToggleWishlist = () => {
    wishlist.toggleItem(product)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-red-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href="/products" className="text-gray-500 hover:text-red-600">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href={`/products?category=${product.category}`} className="text-gray-500 hover:text-red-600">
          {product.category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden border rounded-lg">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden border rounded-md ${
                  index === activeImageIndex ? "ring-2 ring-red-600" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-3xl font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
                <span className="ml-2 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="border-t border-b py-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.colors && (
            <div>
              <h3 className="font-medium mb-2">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button key={index} className="px-4 py-2 border rounded-md hover:border-red-600">
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleToggleWishlist}>
              <Heart
                className={`mr-2 h-4 w-4 ${wishlist.isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""}`}
              />
              {wishlist.isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-red-600" />
              <span className="text-sm">Free shipping</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              <span className="text-sm">2 year warranty</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 mr-2 text-red-600" />
              <span className="text-sm">30 day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 border rounded-b-md mt-2">
            <p className="text-gray-700">{product.description}</p>
          </TabsContent>
          <TabsContent value="features" className="p-4 border rounded-b-md mt-2">
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-b-md mt-2">
            <div className="space-y-4">
              {product.dimensions && (
                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <p className="text-gray-700">
                    Width: {product.dimensions.width}cm, Height: {product.dimensions.height}cm, Depth:{" "}
                    {product.dimensions.depth}cm
                  </p>
                </div>
              )}

              {product.materials && (
                <div>
                  <h3 className="font-medium mb-2">Materials</h3>
                  <p className="text-gray-700">{product.materials.join(", ")}</p>
                </div>
              )}

              {product.colors && (
                <div>
                  <h3 className="font-medium mb-2">Available Colors</h3>
                  <p className="text-gray-700">{product.colors.join(", ")}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg overflow-hidden group">
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <div className="flex items-center mt-1">
                      {relatedProduct.salePrice ? (
                        <>
                          <span className="text-red-600 font-bold">${relatedProduct.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Inquiry Form */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Inquire About This Product</h2>
        <div className="max-w-2xl mx-auto">
          <ProductInquiryForm productName={product.name} productId={product.id} />
        </div>
      </div>
    </div>
  )
}
