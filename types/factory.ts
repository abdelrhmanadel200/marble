export type FactoryCapability = {
    title: string
    description: string
    icon?: string
  }
  
  export type FactoryStat = {
    label: string
    value: string
  }
  
  export type FactoryInfo = {
    id: string
    heroImage?: string
    heroText?: string
    description?: string
    mainImage?: string
    capabilities?: FactoryCapability[]
    stats?: FactoryStat[]
    galleryImages?: string[]
    createdAt: Date
    updatedAt: Date
  }
  