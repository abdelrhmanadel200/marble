"use client"

import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Clock } from "lucide-react"
import { Toaster } from "sonner"
import ContactForm from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-white transition-colors duration-300 dark:bg-stone-900">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-light text-stone-800 md:text-4xl lg:text-5xl dark:text-stone-100">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
              We love to hear from you. Please fill out this form or use our contact information below.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="col-span-2 rounded-lg border border-stone-200 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
              <ContactForm />
            </div>

            <div className="space-y-10">
              <div className="rounded-lg border border-stone-200 p-6 transition-all duration-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
                <h2 className="flex items-center text-xl font-medium text-stone-800 dark:text-stone-100">
                  <MapPin className="mr-2 h-5 w-5 text-amber-700" />
                  Our Office
                </h2>
                <div className="mt-4 space-y-4 text-stone-600 dark:text-stone-400">
                  <div className="flex items-start">
                    <div className="ml-7">
                      <p>123 Stone Avenue</p>
                      <p>Marble City, MC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 shrink-0 text-amber-700" />
                    <p>(123) 456-7890</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 shrink-0 text-amber-700" />
                    <p>info@marblecompany.com</p>
                  </div>
                </div>

                {/* Interactive Map Placeholder */}
                <div className="mt-4 h-[150px] w-full overflow-hidden rounded-md bg-stone-200 dark:bg-stone-700">
                  <div className="flex h-full items-center justify-center">
                    <Button variant="outline" className="text-sm">
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 p-6 transition-all duration-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
                <h2 className="flex items-center text-xl font-medium text-stone-800 dark:text-stone-100">
                  <Clock className="mr-2 h-5 w-5 text-amber-700" />
                  Business Hours
                </h2>
                <div className="mt-4 space-y-2 text-stone-600 dark:text-stone-400">
                  <div className="flex justify-between">
                    <p>Monday - Friday:</p>
                    <p className="font-medium">9AM - 6PM</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Saturday:</p>
                    <p className="font-medium">10AM - 4PM</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Sunday:</p>
                    <p className="font-medium">Closed</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 p-6 transition-all duration-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
                <h2 className="text-xl font-medium text-stone-800 dark:text-stone-100">Follow Us</h2>
                <div className="mt-4 flex space-x-4">
                  <a
                    href="#"
                    className="rounded-full bg-stone-100 p-2 text-stone-600 transition-colors hover:bg-amber-100 hover:text-amber-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-amber-900 dark:hover:text-amber-400"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-stone-100 p-2 text-stone-600 transition-colors hover:bg-amber-100 hover:text-amber-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-amber-900 dark:hover:text-amber-400"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-stone-100 p-2 text-stone-600 transition-colors hover:bg-amber-100 hover:text-amber-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-amber-900 dark:hover:text-amber-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-stone-100 p-2 text-stone-600 transition-colors hover:bg-amber-100 hover:text-amber-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-amber-900 dark:hover:text-amber-400"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

