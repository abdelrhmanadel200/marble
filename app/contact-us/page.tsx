"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react"
import { sendContactForm } from "@/actions/send-email"

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await sendContactForm(formData)

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setIsSubmitting(false)
        alert("Failed to send message: " + (result.error || "Unknown error"))
      }
    } catch (error) {
      setIsSubmitting(false)
      alert("An error occurred while sending your message. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-black">
        <Image
          src="/placeholder.svg?height=300&width=1920"
          alt="Contact Us"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl">We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Location</h3>
            <p className="text-gray-600">
              123 Furniture Street
              <br />
              Design District
              <br />
              Cairo, Egypt
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600">
              +201221982198
              <br />
              +201224300323
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-red-600 mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">
              info@topmodern.net
              <br />
              sales@topmodern.net
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-8 px-4 md:px-6 max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-red-600 hover:bg-red-700">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <Input id="name" name="name" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <Input id="subject" name="subject" required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <Textarea id="message" name="message" rows={5} required />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Location</h2>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600&text=Map" alt="Map" fill className="object-cover" />
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
