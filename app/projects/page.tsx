import Image from "next/image"
import { Button } from "@/components/ui/button"

// Sample projects data
const projects = [
  {
    id: 1,
    title: "Luxury Villa Renovation",
    description: "Complete marble and granite installation for a beachfront villa",
    location: "Miami, FL",
    image: "/placeholder.svg?height=600&width=800&text=Luxury+Villa",
  },
  {
    id: 2,
    title: "Modern Office Building",
    description: "Travertine facade and interior stone elements for corporate headquarters",
    location: "Chicago, IL",
    image: "/placeholder.svg?height=600&width=800&text=Office+Building",
  },
  {
    id: 3,
    title: "Boutique Hotel",
    description: "Custom marble countertops and flooring for a 5-star boutique hotel",
    location: "New York, NY",
    image: "/placeholder.svg?height=600&width=800&text=Boutique+Hotel",
  },
  {
    id: 4,
    title: "Residential Kitchen Remodel",
    description: "Premium granite countertops and backsplash for a luxury home",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=600&width=800&text=Kitchen+Remodel",
  },
  {
    id: 5,
    title: "Public Library Renovation",
    description: "Marble flooring and columns for a historic library renovation",
    location: "Boston, MA",
    image: "/placeholder.svg?height=600&width=800&text=Library",
  },
  {
    id: 6,
    title: "Spa and Wellness Center",
    description: "Complete stone package including onyx features with backlighting",
    location: "Scottsdale, AZ",
    image: "/placeholder.svg?height=600&width=800&text=Spa+Center",
  },
]

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1600&text=Our+Projects"
            alt="Our Projects"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">Our Projects</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-stone-600">
            Explore our portfolio of completed projects featuring our premium stone products. From residential
            renovations to commercial landmarks, our materials bring elegance to every space.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="group overflow-hidden rounded-sm shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-800">{project.title}</h3>
                <p className="mt-1 text-sm text-amber-700">{project.location}</p>
                <p className="mt-3 text-stone-600">{project.description}</p>
                <div className="mt-4">
                  <Button variant="outline" className="rounded-none border-amber-700 text-amber-700 hover:bg-amber-50">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

