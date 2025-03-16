"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Heart, ShoppingCart, TrendingUp, Award, Users } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { subscribeToNewsletter } from "@/actions/newsletter"
import StoneViewer3D from "@/components/stone-viewer-3d"
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const cart = useCart()
  const wishlist = useWishlist()

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1920&text=Modern+Furniture",
      title: "Premium Furniture for Modern Living",
      description: "Discover our collection of high-quality furniture designed for comfort and style",
      buttonText: "Explore Products",
      buttonLink: "/products",
    },
    {
      image: "/placeholder.svg?height=600&width=1920&text=Bedroom+Collection",
      title: "Transform Your Bedroom",
      description: "Create a peaceful sanctuary with our premium bedroom furniture",
      buttonText: "View Bedroom Collection",
      buttonLink: "/products?category=bedroom",
    },
    {
      image: "/placeholder.svg?height=600&width=1920&text=Living+Room+Collection",
      title: "Elevate Your Living Space",
      description: "Stylish and comfortable furniture for the heart of your home",
      buttonText: "View Living Room Collection",
      buttonLink: "/products?category=living-room",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Featured products
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover opacity-70"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <Link href={slide.buttonLink}>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider navigation dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative h-80 group overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Living+Room"
              alt="Living Room"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Living Room</h3>
                <Link
                  href="/products?category=living-room"
                  className="text-white flex items-center text-sm hover:underline"
                >
                  View Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-80 group overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Bedroom"
              alt="Bedroom"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Bedroom</h3>
                <Link
                  href="/products?category=bedroom"
                  className="text-white flex items-center text-sm hover:underline"
                >
                  View Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-80 group overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Dining"
              alt="Dining"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Dining</h3>
                <Link href="/products?category=dining" className="text-white flex items-center text-sm hover:underline">
                  View Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="relative">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 shadow-sm hover:text-red-600"
                    onClick={() => wishlist.toggleItem(product)}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlist.isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""}`}
                    />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium mb-1 hover:text-red-600">{product.name}</h3>
                  </Link>
                  <div className="mb-4">
                    {product.salePrice ? (
                      <>
                        <span className="text-red-600 font-bold">${product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => cart.addItem(product, 1)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Top Modern</h2>
            <p className="text-gray-600 mb-4">
              Top Modern is a premier furniture company dedicated to creating exceptional pieces that combine
              functionality, aesthetics, and quality craftsmanship. With years of experience in the industry, we have
              established ourselves as a trusted name in premium furniture.
            </p>
            <p className="text-gray-600 mb-6">
              Our products are designed with attention to detail and manufactured using the finest materials to ensure
              durability and longevity. We take pride in our commitment to sustainability and ethical production
              practices.
            </p>
            <Link href="/about-us">
              <Button className="bg-red-600 hover:bg-red-700">Learn More About Us</Button>
            </Link>
          </div>
          <div className="relative h-96">
            <Image
              src="/placeholder.svg?height=500&width=600&text=About+Us"
              alt="About Top Modern"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials and craftsmanship to create furniture that lasts for generations.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Award-Winning Design</h3>
              <p className="text-gray-600">
                Our designs have been recognized for their innovation, functionality, and aesthetic appeal.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">
                We&apos;re committed to providing exceptional service and ensuring our customers are completely satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              location: "New York, USA",
              quote:
                "The quality of Top Modern furniture is exceptional. I've furnished my entire living room with their pieces, and I couldn't be happier with the results.",
              rating: 5,
            },
            {
              name: "Michael Chen",
              location: "London, UK",
              quote:
                "I was impressed by the attention to detail in every piece I purchased. The customer service was also outstanding from start to finish.",
              rating: 5,
            },
            {
              name: "Emma Rodriguez",
              location: "Sydney, Australia",
              quote:
                "Despite shipping internationally, my order arrived in perfect condition and exactly as pictured. I'll definitely be ordering from Top Modern again.",
              rating: 4,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export Department */}
      <section className="py-16 px-4 md:px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Export Department</h2>
          <p className="max-w-3xl mx-auto text-gray-300 mb-8">
            Our dedicated export department specializes in international shipping and logistics, ensuring your orders
            are delivered safely and efficiently anywhere in the world.
          </p>
          <Link href="/export-department">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              Contact Export Department
            </Button>
          </Link>
        </div>
      </section>


      {/* 3D Stone Viewer Section */}
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-light text-stone-800">Explore Our Stones in 3D</h2>
            <div className="mx-auto max-w-3xl">
              <StoneViewer3D />
            </div>
          </div>
        </section>

      {/* Newsletter */}
      <section className="py-16 px-4 md:px-6 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/90">
                Stay updated with our latest products, special offers, and design inspiration.
              </p>
            </div>
            <div>
              <form action={async (formData: FormData) => {
                await subscribeToNewsletter(formData);
              }} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                  required
                />
                <Button type="submit" className="bg-white text-red-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
