"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/authService"
import { LayoutDashboard, Package, Tag, Settings, LogOut, Menu, X, FileText, Factory } from "lucide-react"
import DebugAuth from "@/components/debug-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add a loading indicator and better error handling
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const currentUser = await getCurrentUser()

        if (currentUser) {
          setUser(currentUser)
          setError(null)
        } else if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } catch (error: any) {
        console.error("Auth check error:", error)
        setError(error.message || "Authentication error")
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  // Don't show loading spinner on login page
  if (loading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If on login page, just render children without admin layout
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        {/* <DebugAuth /> */}
      </>
    )
  }

  // If not authenticated and not on login page, show nothing (will redirect)
  if (!user && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
        {/* <DebugAuth /> */}
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/admin/products", label: "Products", icon: <Package className="h-5 w-5" /> },
    { path: "/admin/categories", label: "Categories", icon: <Tag className="h-5 w-5" /> },
    { path: "/admin/projects", label: "Projects", icon: <FileText className="h-5 w-5" /> },
    { path: "/admin/factory", label: "Factory", icon: <Factory className="h-5 w-5" /> },
    { path: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md bg-white shadow-md">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Top Marble Admin</h1>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center px-4 py-2 rounded-md transition-colors
                  ${pathname === item.path ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">{children}</div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Debug component */}
      {/* <DebugAuth /> */}
    </div>
  )
}
