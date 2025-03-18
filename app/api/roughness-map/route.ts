import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import sharp from "sharp"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Generate a roughness map from an image URL
 * This uses image processing to create a roughness map based on image details
 */
export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Download the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const imageBuffer = await response.arrayBuffer()

    // Process the image to create a roughness map
    const roughnessMapBuffer = await generateRoughnessMap(Buffer.from(imageBuffer))

    // Upload the roughness map to Cloudinary
    const uploadResult = await uploadToCloudinary(roughnessMapBuffer)

    return NextResponse.json({
      roughnessMapUrl: uploadResult.secure_url,
      message: "Roughness map generated successfully",
    })
  } catch (error) {
    console.error("Error generating roughness map:", error)
    return NextResponse.json({ error: "Failed to generate roughness map" }, { status: 500 })
  }
}

/**
 * Generate a roughness map from an image buffer
 * This uses edge detection and contrast to estimate surface roughness
 */
async function generateRoughnessMap(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Convert to grayscale and resize for better processing
    const grayImage = await sharp(imageBuffer).grayscale().resize(1024, 1024, { fit: "inside" })

    // Create a high-contrast version for edge detection
    const highContrastBuffer = await grayImage.normalize().sharpen(1).toBuffer()

    // Create a blurred version for smooth areas
    const blurredBuffer = await grayImage.blur(5).toBuffer()

    // Combine the two to create a roughness map
    const roughnessBuffer = await sharp(highContrastBuffer)
      .composite([{ input: blurredBuffer, blend: "difference" }])
      .normalize()
      .gamma(2.2) // Adjust gamma for better roughness appearance
      .toBuffer()

    return roughnessBuffer
  } catch (error) {
    console.error("Error in roughness map generation:", error)
    throw error
  }
}

/**
 * Upload a buffer to Cloudinary
 */
async function uploadToCloudinary(buffer: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: "roughness-maps",
      resource_type: "image",
    }

    // Convert buffer to base64 for Cloudinary upload
    const base64Image = buffer.toString("base64")

    cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, uploadOptions, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
