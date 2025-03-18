"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { addCategory, updateCategory, uploadCategoryImage, deleteCategory } from "@/lib/productService"
import { X, Upload, ImageIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import type { ProductCategory } from "@/types/product"

interface CategoryFormProps {
  category?: ProductCategory
  isEdit?: boolean
  onSuccess: () => void
  onCancel: () => void
  onDelete?: () => void
}

export default function CategoryForm({ category, isEdit = false, onSuccess, onCancel, onDelete }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [categoryImage, setCategoryImage] = useState<string>("")
  const [newImage, setNewImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdit && category) {
      setCategoryName(category.name)
      setCategoryDescription(category.description || "")
      setCategoryImage(category.image || "")
    }
  }, [isEdit, category])

  // Generate preview URL for new image
  useEffect(() => {
    if (newImage) {
      const url = URL.createObjectURL(newImage)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [newImage])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0])
    }
  }

  // Add validation and improve error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!categoryName.trim()) {
      setError("Category name is required")
      return
    }

    setFormLoading(true)
    setError(null)

    try {
      const categoryData: Partial<ProductCategory> = {
        name: categoryName.trim(),
        description: categoryDescription.trim() || undefined,
      }

      // Handle image upload
      if (newImage) {
        let imageUrl: string

        if (isEdit && category) {
          // Upload new image for existing category
          imageUrl = await uploadCategoryImage(newImage, category.id)
        } else {
          // For new category, we need to create it first to get an ID
          const newCategoryId = await addCategory({
            name: categoryName.trim(),
            description: categoryDescription.trim() || undefined,
            image: "",
          })

          // Then upload the image
          imageUrl = await uploadCategoryImage(newImage, newCategoryId)

          // Update the category with the image URL
          await updateCategory(newCategoryId, { image: imageUrl })

          onSuccess()
          return
        }

        categoryData.image = imageUrl
      } else if (categoryImage) {
        categoryData.image = categoryImage
      }

      if (isEdit && category) {
        await updateCategory(category.id, categoryData)
      } else {
        await addCategory(categoryData as Omit<ProductCategory, "id">)
      }

      onSuccess()
    } catch (error: any) {
      console.error("Error saving category:", error)
      setError(error.message || "Failed to save category. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!category) return

    setDeleteLoading(true)
    setError(null)

    try {
      await deleteCategory(category.id)
      if (onDelete) onDelete()
    } catch (error: any) {
      console.error("Error deleting category:", error)
      setError(error.message || "Failed to delete category. Please try again.")
      setShowDeleteConfirm(false)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Category Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category Image</label>

        {/* Image preview */}
        {(previewUrl || categoryImage) && (
          <div className="mb-4">
            <div className="relative h-40 w-full rounded-md overflow-hidden border">
              <Image
                src={previewUrl || categoryImage || "/placeholder.svg"}
                alt="Category image preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null)
                  setNewImage(null)
                  if (!isEdit) setCategoryImage("")
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Image upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {!previewUrl && !categoryImage ? (
            <>
              <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop an image here, or click to select a file</p>
            </>
          ) : (
            <p className="text-sm text-gray-500 mb-2">Click to change the image</p>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            {previewUrl || categoryImage ? "Change Image" : "Select Image"}
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {isEdit && category && (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            disabled={formLoading || deleteLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        )}

        <div className="flex space-x-3 ml-auto">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={formLoading || deleteLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            disabled={formLoading || deleteLoading}
          >
            {formLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : isEdit ? (
              "Update Category"
            ) : (
              "Add Category"
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
              Are you sure you want to delete this category? This action cannot be undone.
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
