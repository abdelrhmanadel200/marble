"use client"
import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = "+201221982198"

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/\+/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white rounded-full p-2 shadow-lg transition-all duration-300 flex items-center ${isHovered ? "pl-4 pr-6" : "p-4"}`}
      >
        <div className="flex items-center justify-center bg-green-500 text-white rounded-full h-12 w-12 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        <div
          className={`ml-2 overflow-hidden transition-all duration-300 ${isHovered ? "max-w-32 opacity-100" : "max-w-0 opacity-0"}`}
        >
          <span className="whitespace-nowrap font-medium">Chat with us</span>
        </div>
      </div>
    </a>
  )
}
