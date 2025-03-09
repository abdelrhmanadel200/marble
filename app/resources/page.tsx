import Image from "next/image"
import Link from "next/link"
import { FileText, Download, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample resources data
const resources = [
  {
    id: 1,
    title: "Stone Care Guide",
    description: "Learn how to properly care for and maintain your natural stone surfaces",
    type: "guide",
    icon: <FileText className="h-8 w-8 text-amber-700" />,
  },
  {
    id: 2,
    title: "Stone Selection Guide",
    description: "Tips for choosing the right stone for your specific project needs",
    type: "guide",
    icon: <Info className="h-8 w-8 text-amber-700" />,
  },
  {
    id: 3,
    title: "Product Catalog",
    description: "Browse our complete collection of stone products with specifications",
    type: "catalog",
    icon: <FileText className="h-8 w-8 text-amber-700" />,
  },
  {
    id: 4,
    title: "Installation Guidelines",
    description: "Technical specifications and best practices for stone installation",
    type: "technical",
    icon: <FileText className="h-8 w-8 text-amber-700" />,
  },
  {
    id: 5,
    title: "Material Safety Data Sheets",
    description: "Safety information for our stone products and sealants",
    type: "technical",
    icon: <FileText className="h-8 w-8 text-amber-700" />,
  },
  {
    id: 6,
    title: "Design Inspiration Lookbook",
    description: "Get inspired with our collection of stunning stone applications",
    type: "catalog",
    icon: <FileText className="h-8 w-8 text-amber-700" />,
  },
]

// Sample articles data
const articles = [
  {
    id: 1,
    title: "The Timeless Appeal of Marble in Modern Design",
    excerpt: "Explore how this classic material continues to evolve in contemporary spaces",
    image: "/placeholder.svg?height=300&width=500&text=Marble+Design",
  },
  {
    id: 2,
    title: "Sustainable Practices in Natural Stone Quarrying",
    excerpt: "How the industry is embracing environmentally responsible extraction methods",
    image: "/placeholder.svg?height=300&width=500&text=Sustainable+Quarrying",
  },
  {
    id: 3,
    title: "Choosing Between Granite and Quartz for Kitchen Countertops",
    excerpt: "A comprehensive comparison to help you make the right decision for your home",
    image: "/placeholder.svg?height=300&width=500&text=Countertop+Comparison",
  },
]

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1600&text=Resources"
            alt="Resources"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">Resources</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-stone-600">
            Access our collection of guides, technical documents, and inspiration to help you with your stone projects.
            Whether you're a homeowner, designer, or contractor, we have resources to support your needs.
          </p>
        </div>

        {/* Resources Grid */}
        <h2 className="mb-6 text-2xl font-light text-stone-800">Downloadable Resources</h2>
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="rounded-sm border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4">{resource.icon}</div>
              <h3 className="text-xl font-medium text-stone-800">{resource.title}</h3>
              <p className="mt-2 text-stone-600">{resource.description}</p>
              <div className="mt-4">
                <Button className="rounded-none bg-amber-700 text-white hover:bg-amber-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Articles Section */}
        <h2 className="mb-6 text-2xl font-light text-stone-800">Latest Articles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="group overflow-hidden rounded-sm shadow-md">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-800 group-hover:text-amber-700">{article.title}</h3>
                <p className="mt-2 text-stone-600">{article.excerpt}</p>
                <div className="mt-4">
                  <Link href={`/resources/articles/${article.id}`} className="text-amber-700 hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

