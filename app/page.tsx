"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getCategories } from "@/lib/productService"
import type { ProductCategory } from "@/types/product"

export default function Home() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const categoriesData = await getCategories()
        setCategories(categoriesData)
        setError(null)
      } catch (error: any) {
        console.error("Error fetching categories:", error)
        setError(error.message || "Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-black">
        <Image
          src="/UMI-Stone-Mableton-warehouse_hero-scaled.jpg"
          alt="Premium Marble and Stone"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Marble & Stone Products</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover our collection of high-quality marble, granite, and limestone for your home and commercial
              projects.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Stone Categories</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.length > 0
                ? categories.map((category) => (
                    <div key={category.id} className="relative h-64 rounded-lg overflow-hidden group">
                      <Image
                        src={category.image || `/placeholder.svg?height=300&width=500&text=${category.name}`}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                          {category.description && (
                            <p className="text-white text-sm mb-4 px-4">{category.description}</p>
                          )}
                          <Link
                            href={`/products?category=${category.id}`}
                            className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                          >
                            View Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                : // Fallback categories if none are in the database yet
                  ["Marble", "Granite", "Limestone"].map((category) => (
                    <div key={category} className="relative h-64 rounded-lg overflow-hidden group">
                      <Image
                        src={`/placeholder.svg?height=300&width=500&text=${category}`}
                        alt={category}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-white text-2xl font-bold mb-4">{category}</h3>
                          <Link
                            href={`/products?category=${category.toLowerCase()}`}
                            className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                          >
                            View Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Top Marble</h2>
              <p className="text-gray-700 mb-4">
                Top Marble is a leading provider of premium stone products, specializing in marble, granite, and
                limestone. With years of experience in the industry, we offer a wide range of high-quality materials for
                residential and commercial projects.
              </p>
              <p className="text-gray-700 mb-6">
                Our products are sourced from the finest quarries around the world, ensuring exceptional quality and
                unique patterns that will enhance any space. Whether you're looking for elegant flooring, stunning
                countertops, or decorative elements, we have the perfect stone to meet your needs.
              </p>
              <Link
                href="/about"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/UMI-Stone-Mableton-warehouse_hero-scaled.jpg"
                alt="About Top Marble"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-lg">
            Contact us today to discuss your stone needs and get expert advice on selecting the perfect materials for
            your project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
