"use client"

import { useState } from "react"
import { PhoneCall, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuickContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed left-6 bottom-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-72">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Quick Contact</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Call Us</h4>
              <a
                href="tel:+201221982198"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <PhoneCall className="h-5 w-5 text-red-600 mr-3" />
                <span>+201221982198</span>
              </a>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Email Us</h4>
              <a
                href="mailto:info@topmodern.net"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Mail className="h-5 w-5 text-red-600 mr-3" />
                <span>info@topmodern.net</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
        >
          <PhoneCall className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
