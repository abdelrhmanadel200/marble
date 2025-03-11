"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TextureHoverEffectProps {
  children: React.ReactNode
  className?: string
}

export default function TextureHoverEffect({ children, className }: TextureHoverEffectProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Original content */}
      <div className={cn("transition-all duration-300", isHovering ? "scale-[1.03]" : "scale-100")}>{children}</div>

      {/* Texture highlight effect */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent)`,
            boxShadow: "inset 0 0 50px rgba(255,255,255,0.1)",
          }}
        />
      )}

      {/* Bump map effect */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0), rgba(0,0,0,0.15))`,
            opacity: 0.7,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </div>
  )
}

