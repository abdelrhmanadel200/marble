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
  import type { Project } from "@/types/project"
  
  // Collection reference
  const projectsCollection = collection(db, "projects")
  
  // Convert Firestore timestamp to Date
  const convertTimestampToDate = (timestamp: Timestamp): Date => {
    return timestamp.toDate()
  }
  
  // Convert Firestore document to Project
  const convertDocToProject = (doc: any): Project => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      location: data.location,
      client: data.client,
      scope: data.scope,
      materials: data.materials,
      completionDate: data.completionDate ? convertTimestampToDate(data.completionDate) : undefined,
      coverImage: data.coverImage || "",
      images: data.images || [],
      featured: data.featured || false,
      createdAt: data.createdAt ? convertTimestampToDate(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? convertTimestampToDate(data.updatedAt) : new Date(),
    }
  }
  
  // Get all projects
  export const getProjects = async (): Promise<Project[]> => {
    try {
      const q = query(projectsCollection, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(convertDocToProject)
    } catch (error) {
      console.error("Error getting projects:", error)
      return [] // Return empty array instead of throwing
    }
  }
  
  // Get featured projects
  export const getFeaturedProjects = async (limitCount = 3): Promise<Project[]> => {
    try {
      const q = query(projectsCollection, where("featured", "==", true), orderBy("createdAt", "desc"), limit(limitCount))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(convertDocToProject)
    } catch (error) {
      console.error("Error getting featured projects:", error)
      return [] // Return empty array instead of throwing
    }
  }
  
  // Get a single project by ID
  export const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      const docRef = doc(db, "projects", id)
      const docSnap = await getDoc(docRef)
  
      if (docSnap.exists()) {
        return convertDocToProject(docSnap)
      }
      return null
    } catch (error) {
      console.error("Error getting project by ID:", error)
      return null
    }
  }
  
  // Add a new project
  export const addProject = async (project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> => {
    try {
      const docRef = await addDoc(projectsCollection, {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error adding project:", error)
      throw error
    }
  }
  
  // Update a project
  export const updateProject = async (
    id: string,
    project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>,
  ): Promise<void> => {
    try {
      const docRef = doc(db, "projects", id)
      await updateDoc(docRef, {
        ...project,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error updating project:", error)
      throw error
    }
  }
  
  // Delete a project
  export const deleteProject = async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, "projects", id)
  
      // Get the project to delete its images
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const project = convertDocToProject(docSnap)
  
        // Delete cover image from Cloudinary
        if (project.coverImage) {
          try {
            await deleteImage(project.coverImage)
          } catch (error) {
            console.error("Error deleting cover image:", error)
          }
        }
  
        // Delete gallery images from Cloudinary
        for (const imageUrl of project.images) {
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
      console.error("Error deleting project:", error)
      throw error
    }
  }
  
  // Upload a project image
  export const uploadProjectImage = async (file: File, projectId: string): Promise<string> => {
    try {
      // Upload to Cloudinary
      const imageUrl = await uploadImage(file, `projects/${projectId}`)
      return imageUrl
    } catch (error) {
      console.error("Error uploading project image:", error)
      throw error
    }
  }
  