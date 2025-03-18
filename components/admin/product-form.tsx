"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { addProduct, updateProduct, getCategories, uploadProductImage } from "@/lib/productService"
import { X, Plus, Upload, Trash2 } from "lucide-react"
import type { Product, ProductCategory, ProductFinish } from "@/types/product"

interface ProductFormProps {
  product?: Product
  isEdit?: boolean
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [origin, setOrigin] = useState("")
  const [features, setFeatures] = useState<string[]>([""])
  const [finishes, setFinishes] = useState<ProductFinish[]>([{ name: "", description: "" }])
  const [thickness, setThickness] = useState<string[]>([""])
  const [applications, setApplications] = useState<string[]>([""])
  const [images, setImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load categories and product data if editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        if (isEdit && product) {
          setName(product.name)
          setDescription(product.description)
          setCategory(product.category)
          setOrigin(product.origin || "")
          setFeatures(product.features.length > 0 ? product.features : [""])
          setFinishes(product.finishes.length > 0 ? product.finishes : [{ name: "", description: "" }])
          setThickness(product.thickness && product.thickness.length > 0 ? product.thickness : [""])
          setApplications(product.applications && product.applications.length > 0 ? product.applications : [""])
          setImages(product.images)
        }
      } catch (error: any) {
        console.error("Error fetching form data:", error)
        setError(error.message || "Failed to load form data. Please try again.")
      }
    }

    fetchData()
  }, [isEdit, product])

  // Generate preview URLs for new images
  useEffect(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [newImages])

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setNewImages((prev) => [...prev, ...filesArray])
    }
  }

  // Remove an image from the preview
  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Remove an existing image
  const removeExistingImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Add/remove dynamic form fields
  const addFeature = () => setFeatures((prev) => [...prev, ""])
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const addFinish = () => setFinishes((prev) => [...prev, { name: "", description: "" }])
  const removeFinish = (index: number) => {
    if (finishes.length > 1) {
      setFinishes((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const addThickness = () => setThickness((prev) => [...prev, ""])
  const removeThickness = (index: number) => {
    if (thickness.length > 1) {
      setThickness((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const addApplication = () => setApplications((prev) => [...prev, ""])
  const removeApplication = (index: number) => {
    if (applications.length > 1) {
      setApplications((prev) => prev.filter((_, i) => i !== index))
    }
  }

  // Update feature at specific index
  const updateFeature = (index: number, value: string) => {
    setFeatures((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  // Update finish at specific index
  const updateFinish = (index: number, field: "name" | "description", value: string) => {
    setFinishes((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  // Update thickness at specific index
  const updateThickness = (index: number, value: string) => {
    setThickness((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  // Update application at specific index
  const updateApplication = (index: number, value: string) => {
    setApplications((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Filter out empty values
      const filteredFeatures = features.filter((f) => f.trim() !== "")
      const filteredFinishes = finishes.filter((f) => f.name.trim() !== "")
      const filteredThickness = thickness.filter((t) => t.trim() !== "")
      const filteredApplications = applications.filter((a) => a.trim() !== "")

      // Prepare product data
      const productData = {
        name,
        description,
        category,
        features: filteredFeatures,
        finishes: filteredFinishes,
        origin: origin || undefined,
        thickness: filteredThickness.length > 0 ? filteredThickness : undefined,
        applications: filteredApplications.length > 0 ? filteredApplications : undefined,
        images: [...images], // Start with existing images
      }

      // Handle new images
      let productId: string | undefined = product?.id
      if (newImages.length > 0) {
        setUploadingImages(true)

        // If creating a new product, we need to create it first to get an ID

        if (!isEdit) {
          const newProduct = await addProduct({
            ...productData,
            images: [],
          })
          productId = newProduct
        }

        // Upload each new image
        if (productId) {
          const uploadPromises = newImages.map((file) => uploadProductImage(file, productId!))
          const uploadedImageUrls = await Promise.all(uploadPromises)

          // Add new image URLs to the product data
          productData.images = [...productData.images, ...uploadedImageUrls]
        }

        setUploadingImages(false)
      }

      // Update or create the product
      if (isEdit && product) {
        await updateProduct(product.id, productData)
      } else if (!isEdit) {
        // If we already created the product for image uploads, just update it
        if (newImages.length > 0 && productId) {
          await updateProduct(productId, { images: productData.images })
        } else {
          await addProduct(productData)
        }
      }

      // Redirect back to products page
      router.push("/admin/products")
    } catch (error: any) {
      console.error("Error saving product:", error)
      setError(error.message || "Failed to save product. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Basic Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="origin" className="block text-sm font-medium mb-1">
                Origin Country
              </label>
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Italy, Spain, Egypt"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Features</h2>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter a feature"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                disabled={features.length === 1}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button type="button" onClick={addFeature} className="flex items-center text-blue-600 hover:text-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Feature
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Available Finishes</h2>

        <div className="space-y-4">
          {finishes.map((finish, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Finish {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeFinish(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                  disabled={finishes.length === 1}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Finish Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={finish.name}
                    onChange={(e) => updateFinish(index, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Polished, Honed, Brushed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={finish.description || ""}
                    onChange={(e) => updateFinish(index, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Brief description of this finish"
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addFinish} className="flex items-center text-blue-600 hover:text-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Finish
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Specifications</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Available Thickness</h3>
            <div className="space-y-3">
              {thickness.map((size, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => updateThickness(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 20mm, 30mm"
                  />
                  <button
                    type="button"
                    onClick={() => removeThickness(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    disabled={thickness.length === 1}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addThickness}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Thickness
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Applications</h3>
            <div className="space-y-3">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={app}
                    onChange={(e) => updateApplication(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Flooring, Countertops, Wall Cladding"
                  />
                  <button
                    type="button"
                    onClick={() => removeApplication(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    disabled={applications.length === 1}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addApplication}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Application
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Product Images</h2>

        <div className="space-y-4">
          {/* Existing Images */}
          {images.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Current Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
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
          {previewUrls.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">New Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 rounded-md overflow-hidden border">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`New image ${index + 1}`}
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

          {/* Image Upload */}
          <div className="mt-4">
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              Upload Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop image files here, or click to select files</p>
              <input
                ref={fileInputRef}
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Select Files
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading || uploadingImages}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          disabled={loading || uploadingImages}
        >
          {loading || uploadingImages ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              {uploadingImages ? "Uploading Images..." : "Saving..."}
            </>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  )
}
