"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample product data - in a real app, this would come from your data source
const products = [
  {
    id: 1,
    name: "Black Galaxy",
    category: "Granite",
    image: "/placeholder.svg?height=300&width=300&text=Black+Galaxy",
  },
  {
    id: 2,
    name: "Calacatta Gold",
    category: "Marble",
    image: "/placeholder.svg?height=300&width=300&text=Calacatta+Gold",
  },
  {
    id: 3,
    name: "Silver Travertine",
    category: "Travertine",
    image: "/placeholder.svg?height=300&width=300&text=Silver+Travertine",
  },
  { id: 4, name: "Honey Onyx", category: "Onyx", image: "/placeholder.svg?height=300&width=300&text=Honey+Onyx" },
  {
    id: 5,
    name: "Emerald Pearl",
    category: "Granite",
    image: "/placeholder.svg?height=300&width=300&text=Emerald+Pearl",
  },
  { id: 6, name: "Statuario", category: "Marble", image: "/placeholder.svg?height=300&width=300&text=Statuario" },
  { id: 7, name: "Blue Pearl", category: "Granite", image: "/placeholder.svg?height=300&width=300&text=Blue+Pearl" },
  { id: 8, name: "Crema Marfil", category: "Marble", image: "/placeholder.svg?height=300&width=300&text=Crema+Marfil" },
  {
    id: 9,
    name: "Walnut Travertine",
    category: "Travertine",
    image: "/placeholder.svg?height=300&width=300&text=Walnut+Travertine",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/stones/${product.id}`} className="group cursor-pointer">
            <div className="overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 space-y-1 p-4 text-center">
                <h3 className="font-medium text-stone-800 transition-colors group-hover:text-amber-700">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-600">{product.category}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

