import Image from "next/image"
import Link from "next/link"

// Sample product data - in a real app, this would come from your data source
const products = [
  {
    id: "1",
    name: "Black Galaxy",
    category: "Granite",
    image: "/marble7.jpg",
  },
  {
    id: "2",
    name: "Calacatta Gold",
    category: "Marble",
    image: "/marble1.jpg",
  },
  {
    id: "3",
    name: "Silver Travertine",
    category: "Travertine",
    image: "/marble2.jpg",
  },
  {
    id: "4",
    name: "Honey Onyx",
    category: "Onyx",
    image: "/marble3.jpg",
  },
  {
    id: "5",
    name: "Emerald Pearl",
    category: "Granite",
    image: "/marble4.jpg",
  },
  {
    id: "6",
    name: "Statuario",
    category: "Marble",
    image: "/marble5.jpg",
  },
]

// Sample categories for filter
const categories = [
  { name: "All", count: products.length },
  { name: "Marble", count: products.filter((p) => p.category === "Marble").length },
  { name: "Granite", count: products.filter((p) => p.category === "Granite").length },
  { name: "Travertine", count: products.filter((p) => p.category === "Travertine").length },
  { name: "Onyx", count: products.filter((p) => p.category === "Onyx").length },
]

export default function StonesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1600&text=Our+Stone+Collection"
            alt="Stone Collection"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">Our Stone Collection</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-stone-600">
            Explore our curated collection of natural stone materials. Each piece is carefully selected for its unique
            beauty and quality, offering timeless elegance for your projects.
          </p>
        </div>

        {/* Filters - In a real app, these would be functional */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`cursor-pointer rounded-full border px-6 py-2 text-sm ${
                category.name === "All"
                  ? "border-amber-700 bg-amber-700 text-white"
                  : "border-stone-300 bg-white text-stone-600 hover:border-amber-700 hover:text-amber-700"
              }`}
            >
              {category.name} ({category.count})
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} href={`/stones/${product.id}`} className="group cursor-pointer">
              <div className="overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 space-y-1 p-4 text-center">
                  <h3 className="font-medium text-stone-800 transition-colors group-hover:text-amber-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-600">{product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

