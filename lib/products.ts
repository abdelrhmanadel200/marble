export type Product = {
  id: string
  name: string
  category: string
  price: number
  salePrice?: number
  description: string
  features: string[]
  images: string[]
  inStock: boolean
  rating: number
  reviews: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  materials?: string[]
  colors?: string[]
}

export const products: Product[] = [
  {
    id: "modern-sofa-1",
    name: "Modern Luxury Sofa",
    category: "living-room",
    price: 1299,
    salePrice: 999,
    description:
      "Elegant modern sofa with premium fabric upholstery and solid wood legs. Perfect for contemporary living spaces.",
    features: [
      "Premium fabric upholstery",
      "Solid wood frame and legs",
      "High-density foam cushions",
      "Stain-resistant fabric",
      "Easy assembly",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Sofa+Front",
      "/placeholder.svg?height=600&width=800&text=Sofa+Side",
      "/placeholder.svg?height=600&width=800&text=Sofa+Back",
      "/placeholder.svg?height=600&width=800&text=Sofa+Detail",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    dimensions: {
      width: 220,
      height: 85,
      depth: 95,
    },
    materials: ["Premium fabric", "Solid wood", "High-density foam"],
    colors: ["Gray", "Blue", "Beige", "Green"],
  },
  {
    id: "dining-table-1",
    name: "Marble Top Dining Table",
    category: "dining",
    price: 1599,
    description:
      "Luxurious dining table with genuine marble top and solid wood base. Seats up to 6 people comfortably.",
    features: [
      "Genuine marble top",
      "Solid wood base",
      "Seats 6 people",
      "Stain-resistant coating",
      "Adjustable feet for uneven floors",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Dining+Table+Top",
      "/placeholder.svg?height=600&width=800&text=Dining+Table+Side",
      "/placeholder.svg?height=600&width=800&text=Dining+Table+Base",
      "/placeholder.svg?height=600&width=800&text=Dining+Table+Detail",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 87,
    dimensions: {
      width: 180,
      height: 75,
      depth: 90,
    },
    materials: ["Marble", "Solid wood", "Stainless steel accents"],
    colors: ["White Marble/Walnut", "Black Marble/Oak"],
  },
  {
    id: "bed-frame-1",
    name: "Premium King Bed Frame",
    category: "bedroom",
    price: 1899,
    salePrice: 1599,
    description:
      "Luxurious king-size bed frame with upholstered headboard and solid wood construction for ultimate comfort and durability.",
    features: [
      "Upholstered headboard",
      "Solid wood frame",
      "Reinforced center support",
      "No box spring needed",
      "Under-bed storage space",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Bed+Front",
      "/placeholder.svg?height=600&width=800&text=Bed+Side",
      "/placeholder.svg?height=600&width=800&text=Bed+Headboard",
      "/placeholder.svg?height=600&width=800&text=Bed+Detail",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 56,
    dimensions: {
      width: 200,
      height: 120,
      depth: 210,
    },
    materials: ["Premium fabric", "Solid wood", "Metal supports"],
    colors: ["Gray", "Beige", "Blue"],
  },
  {
    id: "office-desk-1",
    name: "Executive Office Desk",
    category: "office",
    price: 899,
    description:
      "Professional executive desk with ample workspace and storage. Perfect for home office or corporate environments.",
    features: [
      "Spacious work surface",
      "Built-in cable management",
      "Multiple drawers",
      "Scratch-resistant finish",
      "Adjustable shelf",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Desk+Front",
      "/placeholder.svg?height=600&width=800&text=Desk+Side",
      "/placeholder.svg?height=600&width=800&text=Desk+Drawers",
      "/placeholder.svg?height=600&width=800&text=Desk+Detail",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 42,
    dimensions: {
      width: 160,
      height: 75,
      depth: 80,
    },
    materials: ["Engineered wood", "Metal hardware", "Laminate finish"],
    colors: ["Walnut", "Oak", "White", "Black"],
  },
  {
    id: "coffee-table-1",
    name: "Modern Glass Coffee Table",
    category: "living-room",
    price: 499,
    salePrice: 399,
    description:
      "Sleek modern coffee table with tempered glass top and metal frame. The perfect centerpiece for your living room.",
    features: [
      "Tempered glass top",
      "Powder-coated metal frame",
      "Non-slip feet",
      "Easy assembly",
      "Lower shelf for storage",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Coffee+Table+Top",
      "/placeholder.svg?height=600&width=800&text=Coffee+Table+Side",
      "/placeholder.svg?height=600&width=800&text=Coffee+Table+Base",
      "/placeholder.svg?height=600&width=800&text=Coffee+Table+Detail",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 38,
    dimensions: {
      width: 120,
      height: 45,
      depth: 60,
    },
    materials: ["Tempered glass", "Metal", "Rubber feet"],
    colors: ["Clear/Black", "Clear/Gold", "Smoked/Black"],
  },
  {
    id: "dining-chair-1",
    name: "Upholstered Dining Chair",
    category: "dining",
    price: 249,
    description: "Elegant dining chair with comfortable upholstery and solid wood legs. Sold in pairs.",
    features: [
      "Premium fabric upholstery",
      "Solid wood legs",
      "Ergonomic design",
      "Stain-resistant fabric",
      "Sold in pairs",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Chair+Front",
      "/placeholder.svg?height=600&width=800&text=Chair+Side",
      "/placeholder.svg?height=600&width=800&text=Chair+Back",
      "/placeholder.svg?height=600&width=800&text=Chair+Detail",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 64,
    dimensions: {
      width: 50,
      height: 90,
      depth: 55,
    },
    materials: ["Premium fabric", "Solid wood", "High-density foam"],
    colors: ["Gray", "Beige", "Green", "Blue"],
  },
  {
    id: "bookshelf-1",
    name: "Modern Bookshelf",
    category: "living-room",
    price: 799,
    description:
      "Contemporary bookshelf with adjustable shelves and ample storage space for books and decorative items.",
    features: [
      "Adjustable shelves",
      "Solid construction",
      "Wall anchoring hardware included",
      "Easy assembly",
      "Multiple configuration options",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Bookshelf+Front",
      "/placeholder.svg?height=600&width=800&text=Bookshelf+Side",
      "/placeholder.svg?height=600&width=800&text=Bookshelf+Detail",
      "/placeholder.svg?height=600&width=800&text=Bookshelf+Styled",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 29,
    dimensions: {
      width: 120,
      height: 180,
      depth: 40,
    },
    materials: ["Engineered wood", "Metal accents", "Laminate finish"],
    colors: ["Walnut", "White", "Black", "Oak"],
  },
  {
    id: "nightstand-1",
    name: "Modern Nightstand",
    category: "bedroom",
    price: 349,
    description: "Stylish nightstand with drawer and open shelf. Perfect complement to any bedroom set.",
    features: [
      "Soft-close drawer",
      "Open shelf for display",
      "Solid wood legs",
      "Anti-tip hardware included",
      "Cable management hole",
    ],
    images: [
      "/placeholder.svg?height=600&width=800&text=Nightstand+Front",
      "/placeholder.svg?height=600&width=800&text=Nightstand+Side",
      "/placeholder.svg?height=600&width=800&text=Nightstand+Open",
      "/placeholder.svg?height=600&width=800&text=Nightstand+Detail",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 47,
    dimensions: {
      width: 50,
      height: 60,
      depth: 45,
    },
    materials: ["Engineered wood", "Solid wood legs", "Metal hardware"],
    colors: ["Walnut", "White", "Black", "Oak"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
