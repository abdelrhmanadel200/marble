"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "HOME", exactMatch: true },
  { href: "/stones", label: "STONES" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/fairs", label: "FAIRS" },
  { href: "/contact", label: "CONTACT US" },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-amber-100 hover:text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-stone-700 p-0">
        <SheetHeader className="border-b border-stone-600 p-4">
          <SheetTitle className="text-amber-100">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col">
          {links.map((link) => {
            const isActive = link.exactMatch ? pathname === link.href : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-stone-600 px-6 py-4 font-light text-amber-100 transition-colors hover:bg-stone-600 hover:text-white",
                  isActive && "font-medium text-white",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
