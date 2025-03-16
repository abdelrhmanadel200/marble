"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, ShoppingCart, Menu, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useRouter } from "next/navigation"

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const cart = useCart()
  const wishlist = useWishlist()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-black text-white py-2 px-4 md:px-6 flex justify-between items-center text-sm">
        <div>Mobile Phone: +201221982198 / +201224300323</div>
        <div className="flex items-center space-x-3">
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </Link>
          <div className="ml-2 relative">
            <select className="bg-transparent border border-gray-600 rounded text-xs py-1 pl-6 pr-2 appearance-none">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
              <Image
                src="/placeholder.svg?height=16&width=24"
                alt="English flag"
                width={16}
                height={12}
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white py-4 px-4 md:px-6 flex justify-between items-center border-b">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-red-600">
                  HOME
                </Link>
                <Link href="/about-us" className="text-lg font-medium hover:text-red-600">
                  ABOUT US
                </Link>
                <Link href="/products" className="text-lg font-medium hover:text-red-600">
                  PRODUCTS
                </Link>
                <Link href="/export-department" className="text-lg font-medium hover:text-red-600">
                  EXPORT DEPARTMENT
                </Link>
                <Link href="/gallery" className="text-lg font-medium hover:text-red-600">
                  GALLERY
                </Link>
                <Link href="/contact-us" className="text-lg font-medium hover:text-red-600">
                  CONTACT US
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-14 mr-2">
              <div className="absolute inset-0 bg-red-600 transform rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">TOP</div>
            </div>
            <span className="text-sm font-medium">Modern Furniture</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium hover:text-red-600">
            HOME
          </Link>
          <Link href="/about-us" className="font-medium hover:text-red-600">
            ABOUT US
          </Link>
          <Link href="/products" className="font-medium hover:text-red-600">
            PRODUCTS
          </Link>
          <Link href="/export-department" className="font-medium hover:text-red-600">
            EXPORT DEPARTMENT
          </Link>
          <Link href="/gallery" className="font-medium hover:text-red-600">
            GALLERY
          </Link>
          <Link href="/contact-us" className="font-medium hover:text-red-600">
            CONTACT US
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
            </Button>

            {showSearch && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-lg rounded-md p-2 z-50">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 p-2 border rounded-l-md focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" className="rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>

          <Link href="/wishlist" className="relative">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.itemCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/cart" className="flex items-center">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </div>
            <span className="ml-2 text-sm">${cart.subtotal.toFixed(2)}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
