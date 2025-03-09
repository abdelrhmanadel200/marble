import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-light text-stone-800 md:text-4xl lg:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-stone-600">
              We'd love to hear from you. Please fill out this form or use our contact information below.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="col-span-2">
              <ContactForm />
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-medium text-stone-800">Our Office</h2>
                <div className="mt-4 space-y-4 text-stone-600">
                  <div className="flex items-start">
                    <MapPin className="mr-2 mt-1 h-5 w-5 shrink-0 text-amber-700" />
                    <div>
                      <p>123 Stone Avenue</p>
                      <p>Marble City, MC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 shrink-0 text-amber-700" />
                    <p>(123) 456-7890</p>
                  </div>

                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 shrink-0 text-amber-700" />
                    <p>info@marblecompany.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium text-stone-800">Business Hours</h2>
                <div className="mt-4 space-y-2 text-stone-600">
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 4PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium text-stone-800">Follow Us</h2>
                <div className="mt-4 flex space-x-4">{/* Social media icons would go here */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
