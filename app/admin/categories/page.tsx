"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getCategories, deleteCategory } from "@/lib/productService"
import { Plus, Edit, Trash2, X } from "lucide-react"
import CategoryForm from "@/components/admin/category-form"
import type { ProductCategory } from "@/types/product"
import { useToast } from "@/hooks/use-toast"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategories()
      setCategories(data)
      setError(null)
    } catch (error: any) {
      console.error("Error fetching categories:", error)
      setError(error.message || "Failed to load categories. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const openAddModal = () => {
    setCurrentCategory(null)
    setModalMode("add")
    setShowModal(true)
  }

  const openEditModal = (category: ProductCategory) => {
    setCurrentCategory(category)
    setModalMode("edit")
    setShowModal(true)
  }

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteError(null)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!categoryToDelete) return

    setDeleteLoading(true)
    setDeleteError(null)

    try {
      await deleteCategory(categoryToDelete)
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryToDelete))
      setShowDeleteModal(false)
      setCategoryToDelete(null)
      toast({
        title: "Category deleted",
        description: "Category has been deleted successfully.",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Error deleting category:", error)
      setDeleteError(error.message || "Failed to delete category. Please try again.")
      toast({
        title: "Error",
        description: error.message || "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleFormSuccess = () => {
    setShowModal(false)
    fetchCategories()
    toast({
      title: modalMode === "add" ? "Category added" : "Category updated",
      description:
        modalMode === "add" ? "New category has been added successfully." : "Category has been updated successfully.",
      variant: "default",
    })
  }

  const handleCategoryDelete = () => {
    setShowModal(false)
    fetchCategories()
    toast({
      title: "Category deleted",
      description: "Category has been deleted successfully.",
      variant: "default",
    })
  }

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error && categories.length === 0) {
    return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button onClick={openAddModal} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      {categories.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4">Image</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src={category.image || `/placeholder.svg?height=48&width=48&text=${category.name.charAt(0)}`}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{category.name}</td>
                  <td className="py-3 px-4 text-gray-600">{category.description || "No description"}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No categories found</p>
          <button onClick={openAddModal} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
            Add Your First Category
          </button>
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{modalMode === "add" ? "Add New Category" : "Edit Category"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <CategoryForm
              category={currentCategory || undefined}
              isEdit={modalMode === "edit"}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowModal(false)}
              onDelete={handleCategoryDelete}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>

            {deleteError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{deleteError}</div>
            )}

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
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
    </div>
  )
}
