"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function useScrollTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname, searchParams])
}
