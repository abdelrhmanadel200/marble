"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Toaster, toast } from "sonner"
import { FairCard } from "@/components/fair-card"
import { SearchFilter } from "@/components/search-filter"
export interface Fair {
  id: number
  name: string
  location: string
  date: string
  description?: string
  image: string
  attendees?: number
  region: string
}

// Sample fairs data (you would typically fetch this from an API)
const allFairs: Fair[] = [
  {
    id: 1,
    name: "International Stone Expo",
    location: "Las Vegas, NV",
    date: "January 15-18, 2024",
    description: "The largest stone industry trade show featuring the latest products and innovations.",
    image: "/placeholder.svg?height=400&width=600&text=Stone+Expo",
    attendees: 5000,
    region: "usa",
  },
  {
    id: 2,
    name: "Architectural Digest Design Show",
    location: "New York, NY",
    date: "March 20-23, 2024",
    description: "Showcasing high-end design products for residential and commercial spaces.",
    image: "/placeholder.svg?height=400&width=600&text=Design+Show",
    attendees: 3500,
    region: "usa",
  },
  {
    id: 3,
    name: "European Stone Festival",
    location: "Milan, Italy",
    date: "May 5-9, 2024",
    description: "International exhibition of marble, granite and natural stone technology.",
    image: "/placeholder.svg?height=400&width=600&text=Stone+Festival",
    attendees: 4000,
    region: "europe",
  },
  {
    id: 4,
    name: "Marble Design Summit",
    location: "Chicago, IL",
    date: "October 10-12, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Design+Summit",
    attendees: 2000,
    region: "usa",
  },
  {
    id: 5,
    name: "Home & Remodeling Expo",
    location: "Miami, FL",
    date: "August 5-7, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Remodeling+Expo",
    attendees: 3000,
    region: "usa",
  },
  {
    id: 6,
    name: "Luxury Surfaces Show",
    location: "Los Angeles, CA",
    date: "June 15-18, 2023",
    image: "/placeholder.svg?height=300&width=500&text=Surfaces+Show",
    attendees: 2500,
    region: "usa",
  },
]

export default function FairsPage() {
  const [upcomingFairs, setUpcomingFairs] = useState<Fair[]>([])
  const [pastFairs, setPastFairs] = useState<Fair[]>([])
  const [filteredFairs, setFilteredFairs] = useState<Fair[]>([])

  useEffect(() => {
    const currentDate = new Date()
    const upcoming = allFairs.filter((fair) => new Date(fair.date.split("-")[0]) > currentDate)
    const past = allFairs.filter((fair) => new Date(fair.date.split("-")[0]) <= currentDate)

    setUpcomingFairs(upcoming)
    setPastFairs(past)
    setFilteredFairs(allFairs)
  }, [])

  const handleSearch = (query: string) => {
    const filtered = allFairs.filter(
      (fair) =>
        fair.name.toLowerCase().includes(query.toLowerCase()) ||
        fair.location.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredFairs(filtered)
  }

  const handleFilterChange = (filter: string) => {
    if (filter === "all") {
      setFilteredFairs(allFairs)
    } else {
      const filtered = allFairs.filter((fair) => fair.region === filter)
      setFilteredFairs(filtered)
    }
  }

  const handleRegister = (fairId: number) => {
    // Here you would typically make an API call to register the user
    toast.success(`Successfully registered for fair #${fairId}`)
  }

  const handleAddToCalendar = (fair: Fair) => {
    // Here you would typically generate a calendar event
    const event = {
      title: fair.name,
      location: fair.location,
      startDate: fair.date.split("-")[0],
      endDate: fair.date.split("-")[1] || fair.date.split("-")[0],
    }
    console.log("Adding to calendar:", event)
    toast.success(`Added ${fair.name} to your calendar`)
  }

  return (
    <div className="bg-stone-50 dark:bg-stone-900">
      <Toaster position="top-right" />
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600&text=Trade+Fairs"
          alt="Trade Fairs"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">Trade Fairs & Events</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-stone-600 dark:text-stone-300">
            Meet our team and explore our premium stone collections at industry trade shows and events around the world.
            We showcase our latest products and innovations at major exhibitions throughout the year.
          </p>
        </div>

        <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* Upcoming Fairs */}
        <h2 className="mb-8 text-3xl font-light text-stone-800 dark:text-stone-100">Upcoming Fairs</h2>
        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFairs
            .filter((fair) => upcomingFairs.includes(fair))
            .map((fair) => (
              <FairCard
                key={fair.id}
                fair={fair}
                isUpcoming={true}
                onRegister={handleRegister}
                onAddToCalendar={handleAddToCalendar}
              />
            ))}
        </div>

        {/* Past Fairs */}
        <h2 className="mb-8 text-3xl font-light text-stone-800 dark:text-stone-100">Past Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFairs
            .filter((fair) => pastFairs.includes(fair))
            .map((fair) => (
              <FairCard
                key={fair.id}
                fair={fair}
                isUpcoming={false}
                onRegister={handleRegister}
                onAddToCalendar={handleAddToCalendar}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

