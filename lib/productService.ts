import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Timestamp,
  limit,
} from "firebase/firestore"
import { db } from "./firebase"
import { uploadImage, deleteImage } from "./cloudinary"
import type { Product, ProductCategory } from "@/types/product"

// Collection references
const productsCollection = collection(db, "products")
const categoriesCollection = collection(db, "categories")

// Convert Firestore timestamp to Date
const convertTimestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate()
}

// Convert Firestore document to Product
const convertDocToProduct = (doc: any): Product => {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    category: data.category,
    features: data.features || [],
    images: data.images || [],
    finishes: data.finishes || [],
    origin: data.origin,
    thickness: data.thickness || [],
    applications: data.applications || [],
    createdAt: data.createdAt ? convertTimestampToDate(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? convertTimestampToDate(data.updatedAt) : new Date(),
  }
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(productsCollection, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDocToProduct)
  } catch (error) {
    console.error("Error getting products:", error)
    return [] // Return empty array instead of throwing
  }
}

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    if (!categoryId) {
      console.error("Invalid category ID provided:", categoryId)
      return []
    }

    console.log(`Fetching products for category ID: ${categoryId}`)

    // Use exact string comparison for category field
    const q = query(productsCollection, where("category", "==", categoryId))

    const snapshot = await getDocs(q)
    console.log(`Found ${snapshot.size} products for category ${categoryId}`)

    // Log each product's category to debug
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      console.log(`Product ${doc.id} has category: ${data.category}`)
    })

    return snapshot.docs.map(convertDocToProduct)
  } catch (error) {
    console.error(`Error getting products for category ${categoryId}:`, error)
    return [] // Return empty array instead of throwing
  }
}

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return convertDocToProduct(docSnap)
    }
    return null
  } catch (error) {
    console.error("Error getting product by ID:", error)
    return null
  }
}

// Add a new product
export const addProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    // Validate category exists
    if (product.category) {
      const categoryRef = doc(db, "categories", product.category)
      const categorySnap = await getDoc(categoryRef)
      if (!categorySnap.exists()) {
        throw new Error(`Category with ID ${product.category} does not exist`)
      }
    }

    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}

// Update a product
export const updateProduct = async (
  id: string,
  product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>,
): Promise<void> => {
  try {
    // Validate category exists if it's being updated
    if (product.category) {
      const categoryRef = doc(db, "categories", product.category)
      const categorySnap = await getDoc(categoryRef)
      if (!categorySnap.exists()) {
        throw new Error(`Category with ID ${product.category} does not exist`)
      }
    }

    const docRef = doc(db, "products", id)
    await updateDoc(docRef, {
      ...product,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "products", id)

    // Get the product to delete its images
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const product = convertDocToProduct(docSnap)

      // Delete images from Cloudinary
      for (const imageUrl of product.images) {
        try {
          await deleteImage(imageUrl)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    // Delete the document
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// Upload an image and get its URL
export const uploadProductImage = async (file: File, productId: string): Promise<string> => {
  try {
    // Upload to Cloudinary
    const imageUrl = await uploadImage(file, `products/${productId}`)
    return imageUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Upload a category image
export const uploadCategoryImage = async (file: File, categoryId: string): Promise<string> => {
  try {
    // Upload to Cloudinary
    const imageUrl = await uploadImage(file, `categories/${categoryId}`)
    return imageUrl
  } catch (error) {
    console.error("Error uploading category image:", error)
    throw error
  }
}

// Get all categories
export const getCategories = async (): Promise<ProductCategory[]> => {
  try {
    const snapshot = await getDocs(categoriesCollection)
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ProductCategory,
    )
  } catch (error) {
    console.error("Error getting categories:", error)
    return [] // Return empty array instead of throwing
  }
}

// Get category by ID
export const getCategoryById = async (id: string): Promise<ProductCategory | null> => {
  try {
    const docRef = doc(db, "categories", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as ProductCategory
    }
    return null
  } catch (error) {
    console.error("Error getting category by ID:", error)
    return null
  }
}

// Add a new category
export const addCategory = async (category: Omit<ProductCategory, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(categoriesCollection, category)
    return docRef.id
  } catch (error) {
    console.error("Error adding category:", error)
    throw error
  }
}

// Update a category
export const updateCategory = async (id: string, category: Partial<Omit<ProductCategory, "id">>): Promise<void> => {
  try {
    // Check if category exists
    const categoryRef = doc(db, "categories", id)
    const categorySnap = await getDoc(categoryRef)

    if (!categorySnap.exists()) {
      throw new Error("Category not found")
    }

    await updateDoc(categoryRef, category)
  } catch (error) {
    console.error("Error updating category:", error)
    throw error
  }
}

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    // First, check if there are any products using this category
    const q = query(productsCollection, where("category", "==", id))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      throw new Error(
        `Cannot delete category: ${snapshot.size} products are using this category. Please reassign or delete these products first.`,
      )
    }

    // Get the category to delete its image
    const categoryRef = doc(db, "categories", id)
    const categorySnap = await getDoc(categoryRef)

    if (categorySnap.exists()) {
      const categoryData = categorySnap.data()

      // Delete category image if it exists
      if (categoryData.image) {
        try {
          await deleteImage(categoryData.image)
        } catch (error) {
          console.error("Error deleting category image:", error)
          // Continue with deletion even if image deletion fails
        }
      }
    } else {
      throw new Error("Category not found")
    }

    // Delete the category document
    await deleteDoc(categoryRef)
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
}

// Get products count by category
export const getProductsCountByCategory = async (categoryId: string): Promise<number> => {
  try {
    const q = query(productsCollection, where("category", "==", categoryId))
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error(`Error getting products count for category ${categoryId}:`, error)
    return 0
  }
}

// Get featured products (limit to a specific number)
export const getFeaturedProducts = async (count = 6): Promise<Product[]> => {
  try {
    const q = query(productsCollection, orderBy("createdAt", "desc"), limit(count))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDocToProduct)
  } catch (error) {
    console.error("Error getting featured products:", error)
    return []
  }
}

// Get related products by category
export const getRelatedProducts = async (categoryId: string, productId: string, limit = 4): Promise<Product[]> => {
  try {
    if (!categoryId) {
      return []
    }

    const q = query(
      productsCollection,
      where("category", "==", categoryId),
      orderBy("createdAt", "desc"),
      limit(limit + 1), // Get one extra to filter out current product
    )

    const snapshot = await getDocs(q)
    const products = snapshot.docs.map(convertDocToProduct)

    // Filter out the current product
    return products.filter((product) => product.id !== productId).slice(0, limit)
  } catch (error) {
    console.error(`Error getting related products for category ${categoryId}:`, error)
    return []
  }
}
