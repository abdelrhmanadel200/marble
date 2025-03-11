"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactDialog() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-amber-600 text-white hover:bg-amber-700">
          <Mail className="h-5 w-5" />
          <span className="sr-only">Contact us</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>Send us a quick message and we will get back to you as soon as possible.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="quick-name">Name</Label>
            <Input
              id="quick-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quick-email">Email</Label>
            <Input
              id="quick-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quick-message">Message</Label>
            <Textarea
              id="quick-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="rounded-none border-stone-300 focus:border-amber-600 focus:ring-amber-600"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-none bg-amber-700 text-white hover:bg-amber-800"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

