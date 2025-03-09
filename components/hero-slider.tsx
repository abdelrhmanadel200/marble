"use client"

import { useState, useEffect, type TouchEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample hero slides
const heroSlides = [
  {
    id: 1,
    image: "/placeholder.svg?height=800&width=1600&text=Luxury+Marble",
    title: "Explore The True Beauty Earth Has To Offer",
    subtitle: "Premium natural stone for exceptional spaces",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=800&width=1600&text=Elegant+Granite",
    title: "Timeless Elegance For Your Home",
    subtitle: "Discover our exclusive collection",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=1600&text=Natural+Stone",
    title: "Nature's Art In Your Space",
    subtitle: "Handpicked from the finest quarries",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAnimating])

  // Touch event handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  const handlePrev = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <section
      className="relative h-[70vh] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <div className="absolute inset-0">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-6 sm:p-10 transition-all duration-1000",
              currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            )}
          >
            <div className="container mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-light text-amber-100 sm:text-4xl md:text-5xl">{slide.title}</h1>
                <p className="mt-2 text-lg text-amber-50/90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-10 sm:right-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={isAnimating}
          className="rounded-none border-amber-100 text-amber-100 hover:bg-amber-100/20"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={isAnimating}
          className="rounded-none border-amber-100 text-amber-100 hover:bg-amber-100/20"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === index ? "bg-amber-100 w-6" : "bg-amber-100/50 hover:bg-amber-100/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

