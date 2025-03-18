import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    serverTimestamp,
    type Timestamp,
    query,
    limit,
  } from "firebase/firestore"
  import { db } from "./firebase"
  import { uploadImage } from "./cloudinary"
  import type { FactoryInfo } from "@/types/factory"
  
  // Collection reference
  const factoryCollection = collection(db, "factory")
  
  // Convert Firestore timestamp to Date
  const convertTimestampToDate = (timestamp: Timestamp): Date => {
    return timestamp.toDate()
  }
  
  // Convert Firestore document to FactoryInfo
  const convertDocToFactoryInfo = (doc: any): FactoryInfo => {
    const data = doc.data()
    return {
      id: doc.id,
      heroImage: data.heroImage,
      heroText: data.heroText,
      description: data.description,
      mainImage: data.mainImage,
      capabilities: data.capabilities || [],
      stats: data.stats || [],
      galleryImages: data.galleryImages || [],
      createdAt: data.createdAt ? convertTimestampToDate(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? convertTimestampToDate(data.updatedAt) : new Date(),
    }
  }
  
  // Get factory info
  export const getFactoryInfo = async (): Promise<FactoryInfo | null> => {
    try {
      const q = query(factoryCollection, limit(1))
      const snapshot = await getDocs(q)
  
      if (snapshot.empty) {
        return null
      }
  
      return convertDocToFactoryInfo(snapshot.docs[0])
    } catch (error) {
      console.error("Error getting factory info:", error)
      return null
    }
  }
  
  // Update factory info
  export const updateFactoryInfo = async (
    id: string,
    info: Partial<Omit<FactoryInfo, "id" | "createdAt" | "updatedAt">>,
  ): Promise<void> => {
    try {
      const docRef = doc(db, "factory", id)
      await updateDoc(docRef, {
        ...info,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error updating factory info:", error)
      throw error
    }
  }
  
  // Create factory info if it doesn't exist
  export const createFactoryInfo = async (info: Omit<FactoryInfo, "id" | "createdAt" | "updatedAt">): Promise<string> => {
    try {
      const docRef = await addDoc(factoryCollection, {
        ...info,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating factory info:", error)
      throw error
    }
  }
  
  // Upload a factory image
  export const uploadFactoryImage = async (file: File, section: string): Promise<string> => {
    try {
      // Upload to Cloudinary
      const imageUrl = await uploadImage(file, `factory/${section}`)
      return imageUrl
    } catch (error) {
      console.error("Error uploading factory image:", error)
      throw error
    }
  }
  