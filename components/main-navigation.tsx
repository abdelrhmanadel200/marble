"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "HOME", exactMatch: true },
  { href: "/stones", label: "STONES" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/fairs", label: "FAIRS" },
  { href: "/contact", label: "CONTACT US" },
]

export default function MainNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex h-full items-center space-x-8">
      {links.map((link) => {
        const isActive = link.exactMatch ? pathname === link.href : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-light tracking-wide text-amber-100 transition-colors hover:text-white",
              isActive && "font-medium text-white",
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

