import Image from "next/image"
import Link from "next/link"
import MainNavigation from "@/components/main-navigation"
import MobileMenu from "@/components/mobile-menu"
import SearchBar from "@/components/search-bar"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-stone-600/95 shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/marble4.jpg"
            alt="Marble Company"
            width={120}
            height={60}
            className="h-12 w-24 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MainNavigation />
        </div>

        {/* Search */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

