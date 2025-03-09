"use client"

import { useState, useEffect, useRef, type TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample product data - in a real app, this would come from your data source
const products = [
  {
    id: 1,
    name: "Black Galaxy",
    category: "Granite",
    image: "/marble1.jpg",
  },
  {
    id: 2,
    name: "Calacatta Gold",
    category: "Marble",
    image: "/marble2.jpg",
  },
  {
    id: 3,
    name: "Silver Travertine",
    category: "Travertine",
    image: "/marble3.jpg",
  },
  { id: 4, name: "Honey Onyx", category: "Onyx", image: "/marble4.jpg" },
  {
    id: 5,
    name: "Emerald Pearl",
    category: "Granite",
    image: "/marble5.jpg",
  },
  { id: 6, name: "Statuario", category: "Marble", image: "/marble6.jpg" },
];

export default function ProductSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 768) {
        setVisibleCount(2)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3)
      } else {
        setVisibleCount(4)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const visibleProducts = () => {
    const start = activeIndex
    const items = []

    for (let i = start; i < start + visibleCount; i++) {
      const index = i % products.length
      items.push(products[index])
    }

    return items
  }

  const handlePrev = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="relative px-4 py-6">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-3xl font-light text-stone-800">Our Collection</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={isAnimating}
            className="rounded-none border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous products</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={isAnimating}
            className="rounded-none border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next products</span>
          </Button>
        </div>
      </div>

      {/* Slider container with touch events */}
      <div
        ref={sliderRef}
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-transform duration-300 ease-in-out",
            isAnimating && "transform",
          )}
        >
          {visibleProducts().map((product, index) => (
            <Link key={`${product.id}-${index}`} href={`/stones/${product.id}`} className="group cursor-pointer">
              <div className="overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 space-y-1 p-2 text-center">
                  <h3 className="font-medium text-stone-800 transition-colors group-hover:text-amber-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-600">{product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: Math.min(products.length, 6) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setActiveIndex(index)
                setTimeout(() => setIsAnimating(false), 300)
              }
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === activeIndex % products.length ? "bg-amber-700 w-4" : "bg-stone-300 hover:bg-stone-400",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

