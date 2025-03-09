import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample fairs data
const upcomingFairs = [
  {
    id: 1,
    name: "International Stone Expo",
    location: "Las Vegas, NV",
    date: "January 15-18, 2024",
    description: "The largest stone industry trade show featuring the latest products and innovations.",
    image: "/placeholder.svg?height=400&width=600&text=Stone+Expo",
  },
  {
    id: 2,
    name: "Architectural Digest Design Show",
    location: "New York, NY",
    date: "March 20-23, 2024",
    description: "Showcasing high-end design products for residential and commercial spaces.",
    image: "/placeholder.svg?height=400&width=600&text=Design+Show",
  },
  {
    id: 3,
    name: "European Stone Festival",
    location: "Milan, Italy",
    date: "May 5-9, 2024",
    description: "International exhibition of marble, granite and natural stone technology.",
    image: "/placeholder.svg?height=400&width=600&text=Stone+Festival",
  },
]

const pastFairs = [
  {
    id: 4,
    name: "Marble Design Summit",
    location: "Chicago, IL",
    date: "October 10-12, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Design+Summit",
  },
  {
    id: 5,
    name: "Home & Remodeling Expo",
    location: "Miami, FL",
    date: "August 5-7, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Remodeling+Expo",
  },
  {
    id: 6,
    name: "Luxury Surfaces Show",
    location: "Los Angeles, CA",
    date: "June 15-18, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Surfaces+Show",
  },
]

export default function FairsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1600&text=Trade+Fairs"
            alt="Trade Fairs"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">Trade Fairs & Events</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-stone-600">
            Meet our team and explore our premium stone collections at industry trade shows and events around the world.
            We showcase our latest products and innovations at major exhibitions throughout the year.
          </p>
        </div>

        {/* Upcoming Fairs */}
        <h2 className="mb-8 text-3xl font-light text-stone-800">Upcoming Fairs</h2>
        <div className="mb-16 space-y-8">
          {upcomingFairs.map((fair) => (
            <div key={fair.id} className="overflow-hidden rounded-sm shadow-md transition-shadow hover:shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[300px]">
                  <Image src={fair.image || "/placeholder.svg"} alt={fair.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="text-2xl font-medium text-stone-800">{fair.name}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-stone-600">
                      <MapPin className="mr-2 h-5 w-5 text-amber-700" />
                      {fair.location}
                    </div>
                    <div className="flex items-center text-stone-600">
                      <Calendar className="mr-2 h-5 w-5 text-amber-700" />
                      {fair.date}
                    </div>
                  </div>
                  <p className="mt-4 text-stone-600">{fair.description}</p>
                  <div className="mt-6">
                    <Button className="rounded-none bg-amber-700 text-white hover:bg-amber-800">Learn More</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Fairs */}
        <h2 className="mb-8 text-3xl font-light text-stone-800">Past Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pastFairs.map((fair) => (
            <div key={fair.id} className="overflow-hidden rounded-sm shadow-md">
              <div className="relative aspect-[4/3]">
                <Image src={fair.image || "/placeholder.svg"} alt={fair.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-stone-800">{fair.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-stone-600">
                    <MapPin className="mr-2 h-4 w-4 text-amber-700" />
                    {fair.location}
                  </div>
                  <div className="flex items-center text-stone-600">
                    <Calendar className="mr-2 h-4 w-4 text-amber-700" />
                    {fair.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

