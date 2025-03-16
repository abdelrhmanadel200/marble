import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Top Modern is a leading provider of high-quality furniture and home decor products, serving customers
              worldwide with premium designs and exceptional craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/export-department" className="text-gray-400 hover:text-white">
                  Export Department
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/living-room" className="text-gray-400 hover:text-white">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/products/bedroom" className="text-gray-400 hover:text-white">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/products/dining" className="text-gray-400 hover:text-white">
                  Dining
                </Link>
              </li>
              <li>
                <Link href="/products/office" className="text-gray-400 hover:text-white">
                  Office
                </Link>
              </li>
              <li>
                <Link href="/products/outdoor" className="text-gray-400 hover:text-white">
                  Outdoor
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-gray-400 hover:text-white">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-red-600 mt-0.5" />
                <span className="text-gray-400">123 Furniture Street, Design District, Cairo, Egypt</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-600" />
                <span className="text-gray-400">+201221982198 / +201224300323</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-red-600" />
                <span className="text-gray-400">info@topmodern.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Top Modern. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
