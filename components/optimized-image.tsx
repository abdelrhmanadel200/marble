"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { Loader2 } from "lucide-react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete" | "onError"> {
  fallbackSrc?: string
  showLoadingIndicator?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  showLoadingIndicator = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  return (
    <div className="relative">
      {isLoading && showLoadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-40 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={className}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
