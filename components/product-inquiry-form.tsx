"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendProductInquiry } from "@/actions/send-email"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface ProductInquiryFormProps {
  productName: string
  productId: string
}

export function ProductInquiryForm({ productName, productId }: ProductInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  async function handleSubmit(formData: FormData) {
    // Basic validation
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      setFormStatus({
        success: false,
        message: "Please fill in all required fields.",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormStatus({
        success: false,
        message: "Please enter a valid email address.",
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await sendProductInquiry(formData)

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Your inquiry has been sent successfully! We will get back to you soon.",
        })
        // Reset form
        const form = document.getElementById("product-inquiry-form") as HTMLFormElement
        form.reset()
      } else {
        setFormStatus({
          success: false,
          message: result.error || "Failed to send inquiry. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Product Inquiry</h3>

      {formStatus.success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{formStatus.message}</p>
          </div>
        </div>
      ) : formStatus.message ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{formStatus.message}</p>
          </div>
        </div>
      ) : null}

      <form id="product-inquiry-form" action={handleSubmit} className="space-y-4">
        <input type="hidden" name="productName" value={productName} />
        <input type="hidden" name="productId" value={productId} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name <span className="text-red-600">*</span>
          </label>
          <Input id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <Input id="phone" name="phone" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message <span className="text-red-600">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder={`I'm interested in ${productName}. Please provide more information.`}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </Button>
      </form>
    </div>
  )
}
