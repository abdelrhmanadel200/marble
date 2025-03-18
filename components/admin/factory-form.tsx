"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { updateFactoryInfo, createFactoryInfo, uploadFactoryImage } from "@/lib/factoryService"
import { X, Plus, Upload, Trash2 } from "lucide-react"
import type { FactoryInfo, FactoryCapability, FactoryStat } from "@/types/factory"

interface FactoryFormProps {
  factoryInfo?: FactoryInfo
  isEdit?: boolean
  onSuccess: () => void
}

export default function FactoryForm({ factoryInfo, isEdit = false, onSuccess }: FactoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [heroText, setHeroText] = useState("")
  const [description, setDescription] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [capabilities, setCapabilities] = useState<FactoryCapability[]>([{ title: "", description: "" }])
  const [stats, setStats] = useState<FactoryStat[]>([{ label: "", value: "" }])
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const [newHeroImage, setNewHeroImage] = useState<File | null>(null)
  const [newMainImage, setNewMainImage] = useState<File | null>(null)
  const [newGalleryImages, setNewGalleryImages] = useState<File[]>([])

  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null)
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([])

  const heroImageInputRef = useRef<HTMLInputElement>(null)
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const galleryImagesInputRef = useRef<HTMLInputElement>(null)

  // Load factory data if editing
  useEffect(() => {
    if (isEdit && factoryInfo) {
      setHeroText(factoryInfo.heroText || "")
      setDescription(factoryInfo.description || "")
      setHeroImage(factoryInfo.heroImage || "")
      setMainImage(factoryInfo.mainImage || "")
      setCapabilities(
        factoryInfo.capabilities && factoryInfo.capabilities.length > 0
          ? factoryInfo.capabilities
          : [{ title: "", description: "" }],
      )
      setStats(factoryInfo.stats && factoryInfo.stats.length > 0 ? factoryInfo.stats : [{ label: "", value: "" }])
      setGalleryImages(factoryInfo.galleryImages || [])
    }
  }, [isEdit, factoryInfo])

  // Generate preview URLs for new images
  useEffect(() => {
    if (newHeroImage) {
      const url = URL.createObjectURL(newHeroImage)
      setHeroImagePreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [newHeroImage])

  useEffect(() => {
    if (newMainImage) {
      const url = URL.createObjectURL(newMainImage)
      setMainImagePreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [newMainImage])

  useEffect(() => {
    const urls = newGalleryImages.map((file) => URL.createObjectURL(file))
    setGalleryPreviewUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [newGalleryImages])

  // Handle image selection
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewHeroImage(e.target.files[0])
    }
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewMainImage(e.target.files[0])
    }
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setNewGalleryImages((prev) => [...prev, ...filesArray])
    }
  }

  // Remove image previews
  const removeHeroImagePreview = () => {
    setNewHeroImage(null)
    setHeroImagePreview(null)
    if (heroImageInputRef.current) {
      heroImageInputRef.current.value = ""
    }
  }

  const removeMainImagePreview = () => {
    setNewMainImage(null)
    setMainImagePreview(null)
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = ""
    }
  }

  const removeGalleryImagePreview = (index: number) => {
    setNewGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Remove existing gallery image
  const removeExistingGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Add/remove capabilities and stats
  const addCapability = () => {
    setCapabilities([...capabilities, { title: "", description: "" }])
  }

  const removeCapability = (index: number) => {
    if (capabilities.length > 1) {
      setCapabilities(capabilities.filter((_, i) => i !== index))
    }
  }

  const updateCapability = (index: number, field: keyof FactoryCapability, value: string) => {
    setCapabilities(capabilities.map((cap, i) => (i === index ? { ...cap, [field]: value } : cap)))
  }

  const addStat = () => {
    setStats([...stats, { label: "", value: "" }])
  }

  const removeStat = (index: number) => {
    if (stats.length > 1) {
      setStats(stats.filter((_, i) => i !== index))
    }
  }

  const updateStat = (index: number, field: keyof FactoryStat, value: string) => {
    setStats(stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare factory data
      const factoryData: Partial<FactoryInfo> = {
        heroText,
        description,
        heroImage,
        mainImage,
        capabilities: capabilities.filter((cap) => cap.title.trim() !== ""),
        stats: stats.filter((stat) => stat.label.trim() !== "" && stat.value.trim() !== ""),
        galleryImages: [...galleryImages],
      }

      // Handle new images
      let factoryId: string | undefined = factoryInfo?.id

      if (!isEdit) {
        // Create factory info first to get ID
        factoryId = await createFactoryInfo({
          ...factoryData,
          heroImage: "",
          mainImage: "",
          galleryImages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
      }

      // Upload hero image if new
      if (newHeroImage) {
        const heroImageUrl = await uploadFactoryImage(newHeroImage, "hero")
        factoryData.heroImage = heroImageUrl
      }

      // Upload main image if new
      if (newMainImage) {
        const mainImageUrl = await uploadFactoryImage(newMainImage, "main")
        factoryData.mainImage = mainImageUrl
      }

      // Upload gallery images if new
      if (newGalleryImages.length > 0) {
        const uploadPromises = newGalleryImages.map((file, index) =>
          uploadFactoryImage(file, `gallery-${Date.now()}-${index}`),
        )
        const uploadedImageUrls = await Promise.all(uploadPromises)
        factoryData.galleryImages = [...factoryData.galleryImages, ...uploadedImageUrls]
      }

      // Update or create factory info
      if (isEdit && factoryInfo) {
        await updateFactoryInfo(factoryInfo.id, factoryData)
      } else if (factoryId) {
        await updateFactoryInfo(factoryId, factoryData)
      }

      onSuccess()
    } catch (error: any) {
      console.error("Error saving factory info:", error)
      setError(error.message || "Failed to save factory information. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Hero Section</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="heroText" className="block text-sm font-medium mb-1">
              Hero Text
            </label>
            <input
              id="heroText"
              type="text"
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Discover our state-of-the-art manufacturing facility"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Image</label>

            {/* Hero Image Preview */}
            {(heroImagePreview || heroImage) && (
              <div className="mb-4">
                <div className="relative h-48 w-full rounded-md overflow-hidden border">
                  <Image
                    src={heroImagePreview || heroImage || "/placeholder.svg"}
                    alt="Hero image preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      removeHeroImagePreview()
                      if (!isEdit) setHeroImage("")
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Hero Image Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                ref={heroImageInputRef}
                type="file"
                id="heroImage"
                accept="image/*"
                onChange={handleHeroImageChange}
                className="hidden"
              />

              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">
                {heroImagePreview || heroImage ? "Click to change the hero image" : "Upload a hero image"}
              </p>

              <button
                type="button"
                onClick={() => heroImageInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                {heroImagePreview || heroImage ? "Change Hero Image" : "Select Hero Image"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Main Content</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Factory Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Describe your factory and its capabilities..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Main Image</label>

            {/* Main Image Preview */}
            {(mainImagePreview || mainImage) && (
              <div className="mb-4">
                <div className="relative h-48 w-full rounded-md overflow-hidden border">
                  <Image
                    src={mainImagePreview || mainImage || "/placeholder.svg"}
                    alt="Main image preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      removeMainImagePreview()
                      if (!isEdit) setMainImage("")
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Main Image Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                ref={mainImageInputRef}
                type="file"
                id="mainImage"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />

              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">
                {mainImagePreview || mainImage ? "Click to change the main image" : "Upload a main image"}
              </p>

              <button
                type="button"
                onClick={() => mainImageInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                {mainImagePreview || mainImage ? "Change Main Image" : "Select Main Image"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Capabilities</h2>

        <div className="space-y-4">
          {capabilities.map((capability, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Capability {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeCapability(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                  disabled={capabilities.length === 1}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={capability.title}
                    onChange={(e) => updateCapability(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Cutting & Processing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={capability.description}
                    onChange={(e) => updateCapability(index, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Describe this capability..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addCapability} className="flex items-center text-blue-600 hover:text-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Capability
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Factory Stats</h2>

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Stat {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                  disabled={stats.length === 1}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Label <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Square Meters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Value <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 10,000+"
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addStat} className="flex items-center text-blue-600 hover:text-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Stat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Gallery Images</h2>

        <div className="space-y-4">
          {/* Existing Gallery Images */}
          {galleryImages.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Current Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
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
                      onClick={() => removeExistingGalleryImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Gallery Images Preview */}
          {galleryPreviewUrls.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">New Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryPreviewUrls.map((url, index) => (
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
                      onClick={() => removeGalleryImagePreview(index)}
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
            <label htmlFor="galleryImages" className="block text-sm font-medium mb-2">
              Add Gallery Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Upload images for the factory gallery</p>
              <input
                ref={galleryImagesInputRef}
                id="galleryImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryImagesChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryImagesInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Gallery Images
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/factory")}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : isEdit ? (
            "Update Factory Information"
          ) : (
            "Save Factory Information"
          )}
        </button>
      </div>
    </form>
  )
}
