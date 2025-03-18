"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { addProject, updateProject, uploadProjectImage, deleteProject } from "@/lib/projectService"
import { X, Plus, Upload, Trash2 } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectFormProps {
  project?: Project
  isEdit?: boolean
  onSuccess: () => void
}

export default function ProjectForm({ project, isEdit = false, onSuccess }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [client, setClient] = useState("")
  const [scope, setScope] = useState("")
  const [materials, setMaterials] = useState("")
  const [completionDate, setCompletionDate] = useState("")
  const [featured, setFeatured] = useState(false)
  const [coverImage, setCoverImage] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null)
  const [newImages, setNewImages] = useState<File[]>([])
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])

  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const imagesFileInputRef = useRef<HTMLInputElement>(null)

  // Load project data if editing
  useEffect(() => {
    if (isEdit && project) {
      setTitle(project.title)
      setDescription(project.description)
      setLocation(project.location || "")
      setClient(project.client || "")
      setScope(project.scope || "")
      setMaterials(project.materials || "")
      setFeatured(project.featured || false)
      setCoverImage(project.coverImage || "")
      setImages(project.images || [])

      if (project.completionDate) {
        const date = new Date(project.completionDate)
        setCompletionDate(date.toISOString().split("T")[0])
      }
    }
  }, [isEdit, project])

  // Generate preview URLs for new images
  useEffect(() => {
    if (newCoverImage) {
      const url = URL.createObjectURL(newCoverImage)
      setCoverPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [newCoverImage])

  useEffect(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file))
    setImagePreviewUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [newImages])

  // Handle image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewCoverImage(e.target.files[0])
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setNewImages((prev) => [...prev, ...filesArray])
    }
  }

  // Remove an image from the preview
  const removeNewCoverImage = () => {
    setNewCoverImage(null)
    setCoverPreviewUrl(null)
    if (coverFileInputRef.current) {
      coverFileInputRef.current.value = ""
    }
  }

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Remove an existing image
  const removeExistingImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare project data
      const projectData: Partial<Project> = {
        title,
        description,
        location: location || undefined,
        client: client || undefined,
        scope: scope || undefined,
        materials: materials || undefined,
        featured,
        coverImage,
        images: [...images],
      }

      if (completionDate) {
        projectData.completionDate = new Date(completionDate)
      }

      // Handle new cover image
      let projectId: string | undefined = project?.id

      if (newCoverImage) {
        if (!isEdit) {
          // Create project first to get ID
          const newProject = await addProject({
            ...projectData,
            coverImage: "",
            images: [],
            featured: featured,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as any)

          projectId = newProject
        }

        if (projectId) {
          const coverImageUrl = await uploadProjectImage(newCoverImage, projectId)
          projectData.coverImage = coverImageUrl
        }
      }

      // Handle new gallery images
      if (newImages.length > 0 && projectId) {
        const uploadPromises = newImages.map((file) => uploadProjectImage(file, projectId!))
        const uploadedImageUrls = await Promise.all(uploadPromises)
        projectData.images = [...projectData.images, ...uploadedImageUrls]
      }

      // Update or create the project
      if (isEdit && project) {
        await updateProject(project.id, projectData)
      } else if (!isEdit) {
        if (projectId) {
          await updateProject(projectId, projectData)
        } else {
          await addProject({
            ...projectData,
            featured: featured,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as any)
        }
      }

      onSuccess()
    } catch (error: any) {
      console.error("Error saving project:", error)
      setError(error.message || "Failed to save project. Please try again.")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!project) return

    setDeleteLoading(true)
    setError(null)

    try {
      await deleteProject(project.id)
      onSuccess()
    } catch (error: any) {
      console.error("Error deleting project:", error)
      setError(error.message || "Failed to delete project. Please try again.")
      setShowDeleteConfirm(false)
      setDeleteLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Project Title <span className="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="completionDate" className="block text-sm font-medium mb-1">
                Completion Date
              </label>
              <input
                id="completionDate"
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="client" className="block text-sm font-medium mb-1">
                Client
              </label>
              <input
                id="client"
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="scope" className="block text-sm font-medium mb-1">
                Scope
              </label>
              <input
                id="scope"
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="materials" className="block text-sm font-medium mb-1">
                Materials Used
              </label>
              <input
                id="materials"
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm font-medium">
              Feature this project on the homepage
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Cover Image</h2>

        <div className="space-y-4">
          {/* Cover Image Preview */}
          {(coverPreviewUrl || coverImage) && (
            <div className="mb-4">
              <div className="relative h-64 w-full rounded-md overflow-hidden border">
                <Image
                  src={coverPreviewUrl || coverImage || "/placeholder.svg"}
                  alt="Cover image preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    removeNewCoverImage()
                    if (!isEdit) setCoverImage("")
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Cover Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input
              ref={coverFileInputRef}
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />

            {!coverPreviewUrl && !coverImage ? (
              <>
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Upload a cover image for this project</p>
              </>
            ) : (
              <p className="text-sm text-gray-500 mb-2">Click to change the cover image</p>
            )}

            <button
              type="button"
              onClick={() => coverFileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {coverPreviewUrl || coverImage ? "Change Cover Image" : "Select Cover Image"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Project Gallery</h2>

        <div className="space-y-4">
          {/* Existing Images */}
          {images.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Current Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Preview */}
          {imagePreviewUrls.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">New Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 rounded-md overflow-hidden border">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`New gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Images Upload */}
          <div className="mt-4">
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              Add Gallery Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Upload additional images for the project gallery</p>
              <input
                ref={imagesFileInputRef}
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => imagesFileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Gallery Images
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        {isEdit && project && (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            disabled={loading || deleteLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </button>
        )}

        <div className="flex space-x-3 ml-auto">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={loading || deleteLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            disabled={loading || deleteLoading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : isEdit ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
