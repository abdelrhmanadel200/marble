import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Award, Clock } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-black">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="About Top Modern"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-lg md:text-xl">
              Discover the story behind Top Modern and our commitment to quality furniture
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Top Modern was founded in 2005 with a simple mission: to create exceptional furniture that combines
              functionality, aesthetics, and quality craftsmanship. What began as a small workshop has grown into a
              respected name in the furniture industry, known for our attention to detail and commitment to excellence.
            </p>
            <p className="text-gray-600 mb-6">
              Our journey has been defined by a passion for design and a dedication to using the finest materials. We
              believe that furniture should not only be beautiful but also durable and comfortable, enhancing the lives
              of those who use it every day.
            </p>
            <p className="text-gray-600">
              Today, Top Modern continues to innovate and expand, bringing our unique designs to customers around the
              world while maintaining the craftsmanship and quality that has been our hallmark from the beginning.
            </p>
          </div>
          <div className="relative h-96">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Our workshop"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 mb-4">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. From the materials we select to the finishing touches, every detail
                matters in creating furniture that lasts for generations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 mb-4">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We listen to your needs and strive to exceed your
                expectations with every piece of furniture we create.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-600 mb-4">
                <Award className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new designs, materials, and techniques to bring fresh and innovative furniture
                solutions to our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: "John Smith", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
            { name: "Sarah Johnson", role: "Head of Design", image: "/placeholder.svg?height=300&width=300" },
            { name: "Michael Brown", role: "Production Manager", image: "/placeholder.svg?height=300&width=300" },
            { name: "Emily Davis", role: "Export Director", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 overflow-hidden rounded-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-12">
            {[
              {
                year: "2005",
                title: "Founded",
                description: "Top Modern was established with a small workshop and a team of skilled craftsmen.",
              },
              {
                year: "2010",
                title: "Expansion",
                description:
                  "Opened our first showroom and expanded our product line to include more furniture categories.",
              },
              {
                year: "2015",
                title: "International Reach",
                description:
                  "Started exporting our products to international markets, bringing Top Modern furniture to customers worldwide.",
              },
              {
                year: "2020",
                title: "Innovation Hub",
                description:
                  "Launched our design innovation center to explore new materials and sustainable production methods.",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Clock className="h-6 w-6 text-red-600 mr-2" />
                    <span className="text-2xl font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Top Modern Difference</h2>
          <p className="max-w-3xl mx-auto mb-8">
            Discover our collection of premium furniture designed with quality, comfort, and style in mind.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
            Browse Our Products
          </Button>
        </div>
      </section>
    </div>
  )
}
