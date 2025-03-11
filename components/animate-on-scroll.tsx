"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out"

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation: AnimationType
  threshold?: number
  delay?: number
  className?: string
}

export default function AnimateOnScroll({
  children,
  animation,
  threshold = 0.1,
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700"
    const delayClass = delay ? `delay-[${delay}ms]` : ""

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return cn(baseClasses, "opacity-0 translate-y-10", delayClass)
        case "fade-down":
          return cn(baseClasses, "opacity-0 -translate-y-10", delayClass)
        case "fade-left":
          return cn(baseClasses, "opacity-0 translate-x-10", delayClass)
        case "fade-right":
          return cn(baseClasses, "opacity-0 -translate-x-10", delayClass)
        case "zoom-in":
          return cn(baseClasses, "opacity-0 scale-95", delayClass)
        case "zoom-out":
          return cn(baseClasses, "opacity-0 scale-105", delayClass)
        default:
          return cn(baseClasses, "opacity-0", delayClass)
      }
    }

    return cn(baseClasses, "opacity-100 translate-y-0 translate-x-0 scale-100", delayClass)
  }

  return (
    <div ref={ref} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  )
}

