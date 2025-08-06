import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Top Marble - Premium Stone Products",
  description:
    "Top Marble offers high-quality marble, granite, and limestone products for residential and commercial projects.",
  keywords: "marble, granite, limestone, stone products, premium stone, Egypt",
  openGraph: {
    title: "Top Marble - Premium Stone Products",
    description: "High-quality marble, granite, and limestone products for your home and commercial projects.",
    url: "https://topmarble.net",
    siteName: "Top Marble",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Top Marble Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'top marble'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  )
}



import './globals.css'