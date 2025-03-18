export type Project = {
    id: string
    title: string
    description: string
    location?: string
    client?: string
    scope?: string
    materials?: string
    completionDate?: Date
    coverImage: string
    images: string[]
    featured: boolean
    createdAt: Date
    updatedAt: Date
  }
  