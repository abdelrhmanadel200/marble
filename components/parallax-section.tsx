"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({ children, speed = 0.5, className }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const { top, height } = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far the section is from the center of the viewport
      const sectionCenter = top + height / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = sectionCenter - viewportCenter

      // Calculate parallax offset based on distance from center
      const newOffset = distanceFromCenter * speed

      setOffset(newOffset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={sectionRef} className={cn("overflow-hidden relative", className)}>
      <div
        className="relative"
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}

