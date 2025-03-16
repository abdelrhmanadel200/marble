"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Sample gallery data
const galleryCategories = [
  { id: "all", name: "All" },
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining", name: "Dining" },
  { id: "office", name: "Office" },
]

const galleryItems = [
  {
    id: 1,
    category: "living-room",
    title: "Modern Living Room Set",
    image: "/placeholder.svg?height=600&width=800&text=Living+Room+1",
    description: "Elegant modern living room featuring our premium sofa and coffee table.",
  },
  {
    id: 2,
    category: "bedroom",
    title: "Luxury Bedroom",
    image: "/placeholder.svg?height=600&width=800&text=Bedroom+1",
    description: "Sophisticated bedroom design with our king-size bed frame and nightstands.",
  },
  {
    id: 3,
    category: "dining",
    title: "Contemporary Dining Set",
    image: "/placeholder.svg?height=600&width=800&text=Dining+1",
    description: "Stylish dining area featuring our marble top table and upholstered chairs.",
  },
  {
    id: 4,
    category: "office",
    title: "Executive Office",
    image: "/placeholder.svg?height=600&width=800&text=Office+1",
    description: "Professional office space with our executive desk and ergonomic chair.",
  },
  {
    id: 5,
    category: "living-room",
    title: "Minimalist Living Room",
    image: "/placeholder.svg?height=600&width=800&text=Living+Room+2",
    description: "Clean, minimalist living room design with our signature sofa and bookshelf.",
  },
  {
    id: 6,
    category: "bedroom",
    title: "Modern Bedroom Suite",
    image: "/placeholder.svg?height=600&width=800&text=Bedroom+2",
    description: "Contemporary bedroom featuring our platform bed and matching dresser.",
  },
  {
    id: 7,
    category: "dining",
    title: "Elegant Dining Room",
    image: "/placeholder.svg?height=600&width=800&text=Dining+2",
    description: "Sophisticated dining space with our extendable table and designer chairs.",
  },
  {
    id: 8,
    category: "office",
    title: "Home Office Setup",
    image: "/placeholder.svg?height=600&width=800&text=Office+2",
    description: "Functional home office featuring our adjustable desk and bookcase.",
  },
  {
    id: 9,
    category: "living-room",
    title: "Contemporary Living Space",
    image: "/placeholder.svg?height=600&width=800&text=Living+Room+3",
    description: "Modern living space with our sectional sofa and entertainment center.",
  },
  {
    id: 10,
    category: "bedroom",
    title: "Classic Bedroom Design",
    image: "/placeholder.svg?height=600&width=800&text=Bedroom+3",
    description: "Timeless bedroom featuring our upholstered bed frame and matching nightstands.",
  },
  {
    id: 11,
    category: "dining",
    title: "Modern Dining Area",
    image: "/placeholder.svg?height=600&width=800&text=Dining+3",
    description: "Contemporary dining area with our glass table and designer chairs.",
  },
  {
    id: 12,
    category: "office",
    title: "Creative Workspace",
    image: "/placeholder.svg?height=600&width=800&text=Office+3",
    description: "Inspiring creative workspace with our modular desk and storage solutions.",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredGallery =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredGallery.findIndex((item) => item.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredGallery.length - 1
    } else {
      newIndex = currentIndex < filteredGallery.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredGallery[newIndex].id)
  }

  const selectedItem = galleryItems.find((item) => item.id === selectedImage)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-black">
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Gallery"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Gallery</h1>
            <p className="text-lg md:text-xl">Explore our collection of premium furniture designs and installations</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={activeCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border cursor-pointer group"
              onClick={() => openLightbox(item.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {galleryCategories.find((cat) => cat.id === item.category)?.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No gallery items found in this category.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          {selectedItem && (
            <div className="relative">
              <div className="relative aspect-video">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-black/50 rounded-full"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-black/50 rounded-full"
                onClick={() => navigateLightbox("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-black/50 rounded-full"
                onClick={() => navigateLightbox("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <div className="p-4 bg-white">
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <p className="text-gray-600 mt-2">{selectedItem.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
