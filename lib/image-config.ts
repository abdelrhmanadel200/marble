// This file centralizes all image paths to make it easy to replace placeholders with real images later

// Logo
export const LOGO_IMAGE = "/placeholder.svg?height=100&width=100&text=TOP"

// Hero Slider Images
export const HERO_IMAGES = [
  {
    path: "/placeholder.svg?height=600&width=1920&text=Modern+Furniture",
    alt: "Premium Furniture for Modern Living",
  },
  {
    path: "/placeholder.svg?height=600&width=1920&text=Bedroom+Collection",
    alt: "Transform Your Bedroom",
  },
  {
    path: "/placeholder.svg?height=600&width=1920&text=Living+Room+Collection",
    alt: "Elevate Your Living Space",
  },
]

// Category Images
export const CATEGORY_IMAGES = {
  livingRoom: {
    path: "/placeholder.svg?height=400&width=600&text=Living+Room",
    alt: "Living Room Furniture",
  },
  bedroom: {
    path: "/placeholder.svg?height=400&width=600&text=Bedroom",
    alt: "Bedroom Furniture",
  },
  dining: {
    path: "/placeholder.svg?height=400&width=600&text=Dining",
    alt: "Dining Room Furniture",
  },
  office: {
    path: "/placeholder.svg?height=400&width=600&text=Office",
    alt: "Office Furniture",
  },
}

// About Us Images
export const ABOUT_IMAGES = {
  main: {
    path: "/placeholder.svg?height=500&width=600&text=About+Us",
    alt: "About Top Modern",
  },
  workshop: {
    path: "/placeholder.svg?height=500&width=600&text=Our+Workshop",
    alt: "Our Workshop",
  },
  team: [
    {
      path: "/placeholder.svg?height=300&width=300&text=Team+Member+1",
      alt: "John Smith - Founder & CEO",
    },
    {
      path: "/placeholder.svg?height=300&width=300&text=Team+Member+2",
      alt: "Sarah Johnson - Head of Design",
    },
    {
      path: "/placeholder.svg?height=300&width=300&text=Team+Member+3",
      alt: "Michael Brown - Production Manager",
    },
    {
      path: "/placeholder.svg?height=300&width=300&text=Team+Member+4",
      alt: "Emily Davis - Export Director",
    },
  ],
}

// Gallery Images
export const GALLERY_IMAGES = [
  {
    path: "/placeholder.svg?height=600&width=800&text=Living+Room+1",
    alt: "Modern Living Room Set",
    category: "living-room",
  },
  {
    path: "/placeholder.svg?height=600&width=800&text=Bedroom+1",
    alt: "Luxury Bedroom",
    category: "bedroom",
  },
  {
    path: "/placeholder.svg?height=600&width=800&text=Dining+1",
    alt: "Contemporary Dining Set",
    category: "dining",
  },
  // More gallery images...
]

// Flag Images
export const FLAG_IMAGES = {
  english: {
    path: "/placeholder.svg?height=16&width=24&text=EN",
    alt: "English",
  },
  french: {
    path: "/placeholder.svg?height=16&width=24&text=FR",
    alt: "French",
  },
  spanish: {
    path: "/placeholder.svg?height=16&width=24&text=ES",
    alt: "Spanish",
  },
}

// Banner/Promotion Images
export const BANNER_IMAGES = {
  sale: {
    path: "/placeholder.svg?height=300&width=1200&text=Special+Sale",
    alt: "Special Sale - Up to 50% Off",
  },
  newArrivals: {
    path: "/placeholder.svg?height=300&width=1200&text=New+Arrivals",
    alt: "New Arrivals - Spring Collection",
  },
}

// Map Image
export const MAP_IMAGE = {
  path: "/placeholder.svg?height=400&width=600&text=Map",
  alt: "Top Modern Location Map",
}

// Helper function to get product image placeholder
export function getProductImagePlaceholder(id: string, index = 0) {
  return `/placeholder.svg?height=600&width=800&text=Product+${id}+Image+${index + 1}`
}
