import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductInquiryForm from "@/components/product-inquiry-form"

// Sample product data - in a real app, this would come from your data source
const products = [
  {
    id: 1,
    name: "Black Galaxy",
    category: "Granite",
    description:
      "A rich black granite with small gold flecks that resemble stars in the night sky. Ideal for kitchen countertops, vanities, and flooring.",
    origin: "India",
    finishes: ["Polished", "Honed", "Flamed"],
    image: "/marble7.jpg",
  },
  {
    id: 2,
    name: "Calacatta Gold",
    category: "Marble",
    description:
      "A luxurious white marble with dramatic gold veining. Perfect for statement walls, countertops, and elegant flooring.",
    origin: "Italy",
    finishes: ["Polished", "Honed"],
    image: "/marble1.jpg",
  },
  {
    id: 3,
    name: "Silver Travertine",
    category: "Travertine",
    description:
      "A sophisticated silver-gray travertine with subtle natural patterns. Excellent for both interior and exterior applications.",
    origin: "Turkey",
    finishes: ["Polished", "Honed", "Brushed"],
    image: "/marble2.jpg",
  },
  {
    id: 4,
    name: "Honey Onyx",
    category: "Onyx",
    description:
      "A translucent golden onyx with honey-toned veining. Perfect for backlit features, bar tops, and luxury bathrooms.",
    origin: "Iran",
    finishes: ["Polished"],
    image: "/marble3.jpg",
  },
  {
    id: 5,
    name: "Emerald Pearl",
    category: "Granite",
    description:
      "A stunning black granite with iridescent green and blue flecks. Ideal for countertops and accent pieces.",
    origin: "Norway",
    finishes: ["Polished", "Leathered"],
    image: "/marble4.jpg",
  },
  {
    id: 6,
    name: "Statuario",
    category: "Marble",
    description:
      "A classic white marble with elegant gray veining. Perfect for luxury bathrooms and kitchen countertops.",
    origin: "Italy",
    finishes: ["Polished", "Honed", "Brushed"],
    image: "/marble5.jpg",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <Link href="/stones" className="mb-6 inline-flex items-center text-sm text-stone-600 hover:text-amber-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all stones
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-sm shadow-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm font-medium uppercase text-amber-700">{product.category}</p>
              <h1 className="mt-1 text-3xl font-light text-stone-800 md:text-4xl">{product.name}</h1>
            </div>

            <div className="space-y-4 text-stone-600">
              <p>{product.description}</p>

              <div className="space-y-2">
                <p>
                  <span className="font-medium text-stone-800">Origin:</span> {product.origin}
                </p>
                <p>
                  <span className="font-medium text-stone-800">Available Finishes:</span> {product.finishes.join(", ")}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="mb-4 text-xl font-medium text-stone-800">Inquire About This Stone</h2>
              <ProductInquiryForm product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-light text-stone-800">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((p) => p.id !== productId)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/stones/${relatedProduct.id}`} className="group cursor-pointer">
                  <div className="overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2 space-y-1 p-2 text-center">
                      <h3 className="font-medium text-stone-800 transition-colors group-hover:text-amber-700">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-stone-600">{relatedProduct.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
