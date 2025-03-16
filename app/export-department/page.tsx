import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, TrendingUp, Truck, FileText, ShieldCheck, Users } from "lucide-react"

export default function ExportDepartmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-black">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Export Department"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Export Department</h1>
            <p className="text-lg md:text-xl mb-8">
              Bringing Top Modern furniture to customers worldwide with our dedicated export services
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Contact Export Team
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Global Reach, Local Touch</h2>
            <p className="text-gray-600 mb-4">
              At Top Modern, we take pride in our ability to deliver our premium furniture to customers around the
              world. Our dedicated Export Department specializes in international shipping and logistics, ensuring your
              orders are delivered safely and efficiently no matter where you are.
            </p>
            <p className="text-gray-600 mb-6">
              With years of experience in global trade, we understand the complexities of international shipping,
              customs regulations, and documentation requirements. Our team of export specialists is committed to making
              the process as smooth as possible for our international clients.
            </p>
            <div className="flex items-center">
              <Globe className="h-12 w-12 text-red-600 mr-4" />
              <div>
                <h3 className="font-bold text-lg">Serving Over 50 Countries</h3>
                <p className="text-gray-600">From Europe to Asia, Americas to Africa</p>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Global shipping"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Export Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <Truck className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">International Shipping</h3>
                <p className="text-gray-600">
                  We offer various shipping options to meet your needs, from sea freight for large orders to air freight
                  for time-sensitive deliveries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <FileText className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">Documentation Assistance</h3>
                <p className="text-gray-600">
                  Our team handles all necessary export documentation, including commercial invoices, packing lists,
                  certificates of origin, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-red-600 mb-4">
                  <ShieldCheck className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customs Clearance</h3>
                <p className="text-gray-600">
                  We work with trusted customs brokers worldwide to ensure smooth clearance of your shipments through
                  customs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Export Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4 text-red-600">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Experience</h3>
              <p className="text-gray-600">
                With over 15 years of experience in international trade, we have the knowledge and expertise to handle
                exports to virtually any destination.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-red-600">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Dedicated Team</h3>
              <p className="text-gray-600">
                Our export specialists are dedicated to providing personalized service and support throughout the entire
                process.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-red-600">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Global Network</h3>
              <p className="text-gray-600">
                We have established relationships with shipping companies, freight forwarders, and customs brokers
                worldwide.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-red-600">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Secure Packaging</h3>
              <p className="text-gray-600">
                We use specialized packaging techniques to ensure your furniture arrives in perfect condition, no matter
                the distance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Export Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Inquiry",
                description: "Contact our export team with your requirements and destination country.",
              },
              {
                number: "02",
                title: "Quotation",
                description:
                  "Receive a detailed quotation including product costs, shipping, and any applicable duties.",
              },
              {
                number: "03",
                title: "Order Confirmation",
                description: "Confirm your order and make payment according to agreed terms.",
              },
              {
                number: "04",
                title: "Delivery",
                description: "We handle shipping, documentation, and coordinate delivery to your specified location.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Serve */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Countries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "United States",
            "Canada",
            "United Kingdom",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "Australia",
            "Japan",
            "South Korea",
            "UAE",
            "Saudi Arabia",
            "South Africa",
            "Nigeria",
            "Brazil",
            "Mexico",
          ].map((country, index) => (
            <div key={index} className="p-4 border rounded-lg text-center">
              {country}
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-gray-600">And many more! Contact us for specific country inquiries.</p>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Export?</h2>
          <p className="max-w-3xl mx-auto mb-8">
            Contact our export department today to discuss your international furniture needs.
          </p>
          <Link href="/contact-us">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              Contact Export Department
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
