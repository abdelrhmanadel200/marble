import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json({ error: "No file path provided" }, { status: 400 })
    }

    // Make sure the path is within our uploads directory for security
    const normalizedPath = path.normalize(filePath).replace(/^\/+/, '')
    const fullPath = path.join(process.cwd(), "public", normalizedPath)
    
    // Verify the file exists and is within our uploads directory
    if (!fullPath.startsWith(path.join(process.cwd(), "public", "uploads")) || !fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 })
    }

    // Delete the file
    fs.unlinkSync(fullPath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}