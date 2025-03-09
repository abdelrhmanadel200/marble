import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-stone-900 py-12 text-stone-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Marble Company</h3>
            <p className="mb-4 text-sm">Providing premium natural stone solutions since 1995</p>
            <div className="flex space-x-4">{/* Social icons would go here */}</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/stones" className="hover:text-amber-400">
                  Our Stones
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-amber-400">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Stone Avenue</li>
              <li>Marble City, MC 12345</li>
              <li>contact@marblecompany.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">Stay Updated</h3>
            <p className="mb-4 text-sm">Subscribe to our newsletter for the latest products and inspiration</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-none border-0 bg-stone-800 px-3 py-2 text-sm text-white placeholder:text-stone-500 focus:ring-1 focus:ring-amber-500"
              />
              <button type="submit" className="rounded-none bg-amber-600 px-4 py-2 text-white hover:bg-amber-700">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Marble Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

