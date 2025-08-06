"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projectService"
import type { Project } from "@/types/project"

export default function AboutPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getFeaturedProjects()
        setFeaturedProjects(projects)
      } catch (error) {
        console.error("Error fetching featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] bg-black">
        <Image
          src="/UMI-Stone-Mableton-warehouse_hero-scaled.jpg"
          alt="About Us"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-lg md:text-xl">
              Discover the story behind Top Marble and our commitment to quality stone products
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Top Marble was founded in 2005 with a simple mission: to provide exceptional stone products that combine
              beauty, durability, and craftsmanship. What began as a small workshop has grown into a respected name in
              the stone industry, known for our attention to detail and commitment to excellence.
            </p>
            <p className="text-gray-600 mb-6">
              Our journey has been defined by a passion for natural stone and a dedication to sourcing the finest
              materials from around the world. We believe that stone is not just a building material but a work of art
              that enhances any space with its unique patterns and textures.
            </p>
            <p className="text-gray-600">
              Today, Top Marble continues to innovate and expand, bringing our unique selection of marble, granite, and
              limestone to customers throughout Egypt and beyond, while maintaining the quality and service that has
              been our hallmark from the beginning.
            </p>
          </div>
          <div className="relative h-96">
            <Image
              src="/UMI-Stone-Mableton-warehouse_hero-scaled.jpg"
              alt="Our workshop"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. From the quarries we select to the finishing touches, every detail
                matters in creating stone products that last for generations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Craftsmanship</h3>
              <p className="text-gray-600">
                Our skilled artisans combine traditional techniques with modern technology to bring out the best in
                every piece of stone, ensuring precision and beauty in every project.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We listen to your needs and strive to exceed your
                expectations with personalized service and expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {!loading && featuredProjects.length > 0 && (
        <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="border rounded-lg overflow-hidden group h-full">
                  <div className="relative h-64">
                    <Image
                      src={project.coverImage || "/placeholder.svg?height=300&width=400&text=Project"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-2">{project.location}</p>
                    <p className="text-gray-700 line-clamp-3">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/projects"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* Our Process */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              number: "01",
              title: "Selection",
              description: "We carefully select the finest stone materials from quarries around the world.",
            },
            {
              number: "02",
              title: "Processing",
              description: "Our skilled craftsmen cut and process the stone with precision and care.",
            },
            {
              number: "03",
              title: "Finishing",
              description: "We apply various finishing techniques to enhance the natural beauty of the stone.",
            },
            {
              number: "04",
              title: "Installation",
              description: "Our expert team ensures proper installation for lasting beauty and durability.",
            },
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="max-w-3xl mx-auto mb-8">
            Contact us today to discuss your stone needs and get expert advice on selecting the perfect materials.
          </p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
