"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProjects } from "@/lib/projectService"
import type { Project } from "@/types/project"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error: any) {
        console.error("Error fetching projects:", error)
        setError(error.message || "Failed to load projects. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] bg-black">
        <Image
          src="/placeholder.svg?height=300&width=1920&text=Our+Projects"
          alt="Our Projects"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg md:text-xl">
              Discover our completed projects and see how our stone products transform spaces
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                    <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                    <p className="text-gray-600 mb-2">{project.location}</p>
                    <p className="text-gray-700 line-clamp-3">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found.</p>
          </div>
        )}
      </section>
    </div>
  )
}
