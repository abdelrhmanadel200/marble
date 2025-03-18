"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/productService";
import type { ProductCategory } from "@/types/product";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showMobileProductsDropdown, setShowMobileProductsDropdown] =
    useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowProductsDropdown(false);
    setShowMobileProductsDropdown(false);
  }, [pathname]);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories for header:", error);
      }
    };

    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProductsDropdown(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMobileProductsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(
        searchQuery.trim()
      )}`;
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowProductsDropdown(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowProductsDropdown(false);
    }, 200); // Delay before closing dropdown
  };

  const handleClick = () => {
    // Navigate to All Products when the Products button is clicked
    window.location.href = "/products";
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Top <span className="text-blue-600">Marble</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center hover:text-blue-600 font-medium"
              onClick={handleClick}
              aria-expanded={showProductsDropdown}
              aria-haspopup="true"
            >
              Products
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  showProductsDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProductsDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                <div className="py-1">
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/projects" className="hover:text-blue-600 font-medium">
            Projects
          </Link>
          <Link href="/factory" className="hover:text-blue-600 font-medium">
            Factory
          </Link>
          <Link href="/about" className="hover:text-blue-600 font-medium">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact
          </Link>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } 
            w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out md:hidden
          `}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Top <span className="text-blue-600">Marble</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col space-y-1">
              <Link href="/" className="py-2 hover:text-blue-600 font-medium">
                Home
              </Link>

              {/* Mobile Products Dropdown */}
              <div ref={mobileDropdownRef}>
                <button
                  className="flex items-center justify-between w-full py-2 hover:text-blue-600 font-medium"
                  onClick={() =>
                    setShowMobileProductsDropdown(!showMobileProductsDropdown)
                  }
                >
                  Products
                  {showMobileProductsDropdown ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>

                {showMobileProductsDropdown && (
                  <div className="pl-4 space-y-1 mt-1 mb-2">
                    <Link
                      href="/products"
                      className="block py-2 hover:text-blue-600"
                    >
                      All Products
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="block py-2 hover:text-blue-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/projects"
                className="py-2 hover:text-blue-600 font-medium"
              >
                Projects
              </Link>
              <Link
                href="/factory"
                className="py-2 hover:text-blue-600 font-medium"
              >
                Factory
              </Link>
              <Link
                href="/about"
                className="py-2 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="py-2 hover:text-blue-600 font-medium"
              >
                Contact
              </Link>
              <Link
                href="/admin/login"
                className="py-2 hover:text-blue-600 font-medium"
              >
                Admin Login
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              aria-label="Search"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="h-5 w-5" />
            </button>

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
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
