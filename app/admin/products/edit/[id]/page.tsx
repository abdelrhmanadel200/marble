"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getProductById } from "@/lib/productService"
import ProductForm from "@/components/admin/product-form"
import type { Product } from "@/types/product"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(params.id)
        if (productData) {
          setProduct(productData)
        } else {
          // Product not found, redirect to products page
          router.push("/admin/products")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push("/admin/products")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product: {product.name}</h1>
      <ProductForm product={product} isEdit={true} />
    </div>
  )
}
