"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error)
      setHasError(true)
      setError(error.error || new Error("An unknown error occurred"))
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          {error?.message || "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Page
          </button>
          <Link href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
