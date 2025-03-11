"use client"

import Image from "next/image"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface FairCardProps {
  fair: Fair
  isUpcoming: boolean
  onRegister: (fairId: number) => void
  onAddToCalendar: (fair: Fair) => void
}

export function FairCard({ fair, isUpcoming, onRegister, onAddToCalendar }: FairCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-stone-800">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={fair.image || "/placeholder.svg"}
          alt={fair.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isUpcoming && <Badge className="absolute right-2 top-2 bg-amber-500 text-white">Upcoming</Badge>}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">{fair.name}</h3>
        <div className="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-300">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-amber-700" />
            {fair.location}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-amber-700" />
            {fair.date}
          </div>
          {fair.attendees && (
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-amber-700" />
              {fair.attendees} attendees
            </div>
          )}
        </div>
        {fair.description && <p className="mt-4 text-stone-600 dark:text-stone-300">{fair.description}</p>}
        <div className="mt-6 flex space-x-2">
          {isUpcoming && (
            <>
              <Button onClick={() => onRegister(fair.id)} className="flex-1">
                Register
              </Button>
              <Button variant="outline" onClick={() => onAddToCalendar(fair)} className="flex-1">
                Add to Calendar
              </Button>
            </>
          )}
          {!isUpcoming && (
            <Button variant="outline" className="flex items-center">
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

