"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getFactoryInfo } from "@/lib/factoryService"
import { Package, Truck, Users, Shield } from "lucide-react"
import type { FactoryInfo } from "@/types/factory"

export default function FactoryPage() {
  const [factoryInfo, setFactoryInfo] = useState<FactoryInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFactoryInfo = async () => {
      try {
        const info = await getFactoryInfo()
        setFactoryInfo(info)
      } catch (error: any) {
        console.error("Error fetching factory info:", error)
        setError(error.message || "Failed to load factory information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchFactoryInfo()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-black">
        <Image
          src={factoryInfo?.heroImage || "/placeholder.svg?height=400&width=1920&text=Our+Factory"}
          alt="Our Factory"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Factory</h1>
            <p className="text-lg md:text-xl">
              {factoryInfo?.heroText || "Discover our state-of-the-art manufacturing facility"}
            </p>
          </div>
        </div>
      </section>

      {/* Factory Overview */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Our Factory</h2>
            <div className="text-gray-700 space-y-4">
              {factoryInfo?.description ? (
                <div dangerouslySetInnerHTML={{ __html: factoryInfo.description }} />
              ) : (
                <p>
                  Our modern factory is equipped with the latest technology and machinery to process and finish stone
                  products with precision and care. With a focus on quality and craftsmanship, we ensure that every
                  piece that leaves our facility meets our high standards.
                </p>
              )}
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={factoryInfo?.mainImage || "/placeholder.svg?height=500&width=600&text=Factory+Overview"}
              alt="Factory Overview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Factory Features */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Capabilities</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {factoryInfo?.capabilities ? (
              factoryInfo.capabilities.map((capability, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 mx-auto mb-4">
                    {index % 4 === 0 && <Package className="h-12 w-12 mx-auto" />}
                    {index % 4 === 1 && <Truck className="h-12 w-12 mx-auto" />}
                    {index % 4 === 2 && <Users className="h-12 w-12 mx-auto" />}
                    {index % 4 === 3 && <Shield className="h-12 w-12 mx-auto" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 mx-auto mb-4">
                    <Package className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cutting & Processing</h3>
                  <p className="text-gray-600">
                    State-of-the-art machinery for precise cutting and processing of various stone materials.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 mx-auto mb-4">
                    <Truck className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Packaging & Shipping</h3>
                  <p className="text-gray-600">
                    Secure packaging solutions to ensure safe delivery of our products worldwide.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 mx-auto mb-4">
                    <Users className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Skilled Craftsmen</h3>
                  <p className="text-gray-600">
                    Our team of experienced artisans combines traditional techniques with modern technology.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="text-blue-600 mx-auto mb-4">
                    <Shield className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality Control</h3>
                  <p className="text-gray-600">
                    Rigorous quality checks at every stage to ensure only the finest products reach our customers.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Factory Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factoryInfo?.galleryImages && factoryInfo.galleryImages.length > 0 ? (
            factoryInfo.galleryImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Factory Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Machinery"
                  alt="Factory Machinery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Production"
                  alt="Production Line"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Packaging"
                  alt="Packaging Process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Quality+Control"
                  alt="Quality Control"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Warehouse"
                  alt="Warehouse"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Shipping"
                  alt="Shipping Area"
                  fill
                  className="object-cover"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Factory Stats */}
      <section className="py-16 px-4 md:px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Factory by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {factoryInfo?.stats ? (
              factoryInfo.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg">{stat.label}</div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="text-4xl font-bold mb-2">10,000+</div>
                  <div className="text-lg">Square Meters</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-lg">Skilled Workers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-lg">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1000+</div>
                  <div className="text-lg">Projects Completed</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
