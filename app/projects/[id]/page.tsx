"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getProjectById } from "@/lib/projectService"
import { MapPin, Calendar } from "lucide-react"
import type { Project } from "@/types/project"

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!params.id) {
          throw new Error("Project ID is missing")
        }

        const projectId = Array.isArray(params.id) ? params.id[0] : params.id
        const projectData = await getProjectById(projectId)

        if (!projectData) {
          throw new Error("Project not found")
        }

        setProject(projectData)
      } catch (err: any) {
        console.error("Error fetching project:", err)
        setError(err.message || "Failed to load project. It may have been removed or doesn't exist.")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Project not found"}
        </div>
        <Link href="/projects" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {project.location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{project.location}</span>
          </div>
        )}
        {project.completionDate && (
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-1" />
            <span>Completed: {new Date(project.completionDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Main Image */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={project.coverImage || "/placeholder.svg?height=600&width=1200&text=Project"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About this Project</h2>
        <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
      </div>

      {/* Project Details */}
      {(project.client || project.scope || project.materials) && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {project.client && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Client</h3>
              <p>{project.client}</p>
            </div>
          )}
          {project.scope && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Scope</h3>
              <p>{project.scope}</p>
            </div>
          )}
          {project.materials && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Materials Used</h3>
              <p>{project.materials}</p>
            </div>
          )}
        </div>
      )}

      {/* Project Gallery */}
      {project.images && project.images.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
