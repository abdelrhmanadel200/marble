"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById, getCategoryById, getRelatedProducts } from "@/lib/productService"
import type { Product, ProductCategory } from "@/types/product"
import { ProductInquiryForm } from "@/components/product-inquiry-form"
import ProductViewer3D from "@/components/product-3d-viewer"
import { Skeleton } from "@/components/ui/skeleton"

// Create a skeleton loader for the product detail page
function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <div className="w-32 h-6">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex space-x-2 mt-4">
            <Skeleton className="w-20 h-20 rounded" />
            <Skeleton className="w-20 h-20 rounded" />
            <Skeleton className="w-20 h-20 rounded" />
          </div>
        </div>

        {/* Details Skeleton */}
        <div>
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-6" />

          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-24 w-full mb-6" />

          <Skeleton className="h-6 w-1/3 mb-2" />
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>

          <Skeleton className="h-12 w-48 rounded-md mt-6" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-40 w-full rounded-md" />
      </div>

      {/* 3D Viewer Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="aspect-[4/3] w-full rounded-md mb-4" />
        <div className="flex justify-center space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Inquiry Form Skeleton */}
      <div className="mt-16">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        if (typeof id !== "string") {
          throw new Error("Invalid product ID")
        }

        const productData = await getProductById(id)
        if (!productData) {
          throw new Error("Product not found")
        }

        setProduct(productData)

        // Fetch category information if product has a category
        if (productData.category) {
          const categoryData = await getCategoryById(productData.category)
          setCategory(categoryData)

          // Fetch related products from the same category
          const related = await getRelatedProducts(productData.category, productData.id, 4)
          setRelatedProducts(related)
        }
      } catch (err: any) {
        console.error("Error fetching product:", err)
        setError(err.message || "Failed to load product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Product not found"}
        </div>
        <Link href="/products" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-blue-600 hover:underline flex items-center">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative h-96 mb-4 border rounded-lg overflow-hidden">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg?height=400&width=600&text=No+Image"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 border-2 rounded ${
                    index === activeImageIndex ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Category */}
          {category && (
            <div className="mb-4">
              <Link
                href={`/products?category=${category.id}`}
                className="inline-block bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm"
              >
                {category.name}
              </Link>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Origin */}
          {product.origin && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Origin</h2>
              <p className="text-gray-700">{product.origin}</p>
            </div>
          )}

          {/* Thickness */}
          {product.thickness && product.thickness.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Available Thickness</h2>
              <div className="flex flex-wrap gap-2">
                {product.thickness.map((thickness, index) => (
                  <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {thickness}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Applications</h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((application, index) => (
                  <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {application}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry Button */}
          <div className="mt-6">
            <a href="#inquiry" className="bg-blue-600 text-white px-6 py-3 rounded-md inline-block hover:bg-blue-700">
              Inquire About This Product
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="finishes">Finishes</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features" className="p-4 border rounded-md mt-2">
            {product.features && product.features.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No features specified for this product.</p>
            )}
          </TabsContent>

          {/* Finishes Tab */}
          <TabsContent value="finishes" className="p-4 border rounded-md mt-2">
            {product.finishes && product.finishes.length > 0 ? (
              <div className="space-y-4">
                {product.finishes.map((finish, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold">{finish.name}</h3>
                    {finish.description && <p className="text-gray-700 mt-1">{finish.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No finishes specified for this product.</p>
            )}
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.origin && (
                <div>
                  <h3 className="font-semibold">Origin</h3>
                  <p className="text-gray-700">{product.origin}</p>
                </div>
              )}

              {product.thickness && product.thickness.length > 0 && (
                <div>
                  <h3 className="font-semibold">Available Thickness</h3>
                  <p className="text-gray-700">{product.thickness.join(", ")}</p>
                </div>
              )}

              {product.applications && product.applications.length > 0 && (
                <div>
                  <h3 className="font-semibold">Applications</h3>
                  <p className="text-gray-700">{product.applications.join(", ")}</p>
                </div>
              )}

              {category && (
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p className="text-gray-700">{category.name}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 3D Viewer Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <ProductViewer3D productImages={product.images} productName={product.name} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg overflow-hidden group">
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className="relative h-64">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg?height=300&width=400&text=Stone+Product"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{relatedProduct.name}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{relatedProduct.description}</p>
                    <div className="mt-4">
                      <span className="text-blue-600 text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Inquiry Form */}
      <div id="inquiry" className="mt-16 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Inquire About This Product</h2>
        <ProductInquiryForm productName={product.name} productId={product.id} />
      </div>
    </div>
  )
}
