"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string
  name: string
  category: string
}

export default function ProductInquiryForm({ product }: { product: Product }) {
  const { toast } = useToast()
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
      // In a real app, this would call an API route
      const response = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productId: product.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast({
        title: "Inquiry Sent",
        description: "We've received your inquiry and will contact you soon.",
      })

      // Reset form fields except product message
      setFormData((prev) => ({
        name: "",
        email: "",
        phone: "",
        message: prev.message,
      }))
    } catch (error: unknown) {
      console.error("Error submitting inquiry:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "There was a problem sending your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
        />
      </div>
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

