"use client"

import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/authService"

export default function DebugAuth() {
  const [authInfo, setAuthInfo] = useState<{
    user: string | null
    token: string | null
    cookie: string | null
  }>({
    user: null,
    token: null,
    cookie: null,
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        const token = localStorage.getItem("auth_token")
        const authCookie =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1] || null

        setAuthInfo({
          user: user ? user.email : null,
          token: token ? token.substring(0, 10) + "..." : null,
          cookie: authCookie ? authCookie.substring(0, 10) + "..." : null,
        })
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 text-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div>
        <p>
          <strong>User:</strong> {authInfo.user || "Not logged in"}
        </p>
        <p>
          <strong>Token:</strong> {authInfo.token || "No token"}
        </p>
        <p>
          <strong>Cookie:</strong> {authInfo.cookie || "No cookie"}
        </p>
      </div>
    </div>
  )
}
