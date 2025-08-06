import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid" // You'll need to install this: npm install uuid @types/uuid

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    // Create folder if it doesn't exist
    const folderPath = path.join(uploadDir, folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const filePath = path.join(folderPath, fileName)
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Write file to disk
    fs.writeFileSync(path.join(process.cwd(), "public", "uploads", folder, fileName), buffer)
    
    // Return the URL to access the file
    const fileUrl = `/uploads/${folder}/${fileName}`
    
    return NextResponse.json({
      url: fileUrl,
      fileName: fileName
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}