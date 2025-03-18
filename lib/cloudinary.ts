// Helper function to upload image to Cloudinary via API route
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to upload image")
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Helper function to delete image from Cloudinary via API route
export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extract public_id from URL
    const publicId = extractPublicIdFromUrl(url)

    if (!publicId) {
      console.error("Could not extract public_id from URL:", url)
      return
    }

    const response = await fetch("/api/upload/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete image")
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}

// Helper function to extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    // Example URL: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/filename.jpg
    const regex = /\/v\d+\/(.+)\.\w+$/
    const match = url.match(regex)
    return match ? match[1] : null
  } catch (error) {
    console.error("Error extracting public_id from URL:", error)
    return null
  }
}
