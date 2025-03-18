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
 * Generate a normal map from an image URL
 * This uses the Sobel operator to detect edges and create a normal map
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

    // Process the image to create a normal map
    const normalMapBuffer = await generateNormalMap(Buffer.from(imageBuffer))

    // Upload the normal map to Cloudinary
    const uploadResult = await uploadToCloudinary(normalMapBuffer)

    return NextResponse.json({
      normalMapUrl: uploadResult.secure_url,
      message: "Normal map generated successfully",
    })
  } catch (error) {
    console.error("Error generating normal map:", error)
    return NextResponse.json({ error: "Failed to generate normal map" }, { status: 500 })
  }
}

/**
 * Generate a normal map from an image buffer using the Sobel operator
 */
async function generateNormalMap(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Convert to grayscale and resize for better processing
    const grayImage = await sharp(imageBuffer)
      .grayscale()
      .resize(1024, 1024, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { data, info } = grayImage
    const { width, height } = info

    // Create a new buffer for the normal map (RGBA)
    const normalMap = Buffer.alloc(width * height * 4)

    // Apply Sobel operator to detect edges
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        // Get surrounding pixels
        const topLeft = data[(y - 1) * width + (x - 1)]
        const top = data[(y - 1) * width + x]
        const topRight = data[(y - 1) * width + (x + 1)]
        const left = data[y * width + (x - 1)]
        const right = data[y * width + (x + 1)]
        const bottomLeft = data[(y + 1) * width + (x - 1)]
        const bottom = data[(y + 1) * width + x]
        const bottomRight = data[(y + 1) * width + (x + 1)]

        // Sobel X gradient (horizontal)
        const sobelX = -1 * topLeft + -2 * left + -1 * bottomLeft + 1 * topRight + 2 * right + 1 * bottomRight

        // Sobel Y gradient (vertical)
        const sobelY = -1 * topLeft + -2 * top + -1 * topRight + 1 * bottomLeft + 2 * bottom + 1 * bottomRight

        // Calculate normal vector
        // X and Y are swapped and Y is negated to match OpenGL coordinate system
        const normalX = -sobelX
        const normalY = -sobelY
        const normalZ = 255 // Fixed Z value for height

        // Normalize the vector
        const length = Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ)

        // Set the normal map pixel (RGBA)
        const index = (y * width + x) * 4
        normalMap[index] = Math.floor(((normalX / length) * 0.5 + 0.5) * 255) // R: X component
        normalMap[index + 1] = Math.floor(((normalY / length) * 0.5 + 0.5) * 255) // G: Y component
        normalMap[index + 2] = Math.floor(((normalZ / length) * 0.5 + 0.5) * 255) // B: Z component
        normalMap[index + 3] = 255 // A: Alpha (fully opaque)
      }
    }

    // Convert raw buffer back to PNG
    return await sharp(normalMap, {
      raw: {
        width,
        height,
        channels: 4,
      },
    })
      .png()
      .toBuffer()
  } catch (error) {
    console.error("Error in normal map generation:", error)
    throw error
  }
}

/**
 * Upload a buffer to Cloudinary
 */
async function uploadToCloudinary(buffer: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: "normal-maps",
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
