"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { uploadImage } from "@/lib/cloudinary"

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void
  folder: string
  className?: string
}

export default function ImageUploader({ onImageUploaded, folder, className = "" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    setError(null)

    try {
      const imageUrl = await uploadImage(file, folder)
      onImageUploaded(imageUrl)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`relative ${className}`}>
      {error && <div className="mb-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">{error}</div>}

      {preview ? (
        <div className="relative">
          <div className="relative h-40 w-full rounded-md overflow-hidden">
            <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">{uploading ? "Uploading..." : "Click to upload an image"}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  )
}

