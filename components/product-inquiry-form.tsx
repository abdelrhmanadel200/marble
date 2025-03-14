"use client"

import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

type Product = {
  id: string
  name: string
  category: string
}

export default function ProductInquiryForm({ product }: { product: Product }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${product.name} (${product.category}) and would like to get more information.`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: product.id,
          productName: product.name,
          productCategory: product.category,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast.success({
        title: "Inquiry Sent",
        description: "We have received your inquiry and will contact you soon.",
      })

      // Reset form fields except the product message
      setFormData((prev) => ({
        name: "",
        email: "",
        phone: "",
        message: prev.message,
      }))
    } catch (error: unknown) {
      console.error("Error submitting inquiry:", error)

      toast.error({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem sending your inquiry. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Name"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <InputField
        label="Phone (Optional)"
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
      />

      <TextAreaField
        label="Message"
        id="message"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-none bg-amber-700 text-white hover:bg-amber-800"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
        <Mail className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

// Reusable Input Component
function InputField({
  label,
  id,
  type,
  value,
  onChange,
  required = false,
}: {
  label: string
  id: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
      />
    </div>
  )
}

// Reusable Textarea Component
function TextAreaField({
  label,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={4}
        required={required}
        className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
      />
    </div>
  )
}