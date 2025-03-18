export type ProductFinish = {
  name: string
  description?: string
}

export type Product = {
  id: string
  name: string
  description: string
  category: string // marble, limestone, granite, etc.
  features: string[]
  images: string[]
  finishes: ProductFinish[]
  origin?: string // country of origin
  thickness?: string[] // available thicknesses
  applications?: string[] // where it can be used (flooring, countertops, etc.)
  createdAt: Date
  updatedAt: Date
}

export type ProductCategory = {
  id: string
  name: string
  description?: string
  image?: string
}
