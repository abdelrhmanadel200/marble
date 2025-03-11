"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)




      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      })
    
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <Label>Subject</Label>
        <RadioGroup value={formData.subject} onValueChange={handleSubjectChange} className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <RadioGroupItem value="General Inquiry" id="general" />
            <Label htmlFor="general" className="ml-2 cursor-pointer">
              General Inquiry
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="Product Information" id="product" />
            <Label htmlFor="product" className="ml-2 cursor-pointer">
              Product Information
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="Quote Request" id="quote" />
            <Label htmlFor="quote" className="ml-2 cursor-pointer">
              Quote Request
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="Other" id="other" />
            <Label htmlFor="other" className="ml-2 cursor-pointer">
              Other
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-none bg-amber-700 px-10 text-white hover:bg-amber-800"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

