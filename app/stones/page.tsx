import Image from "next/image"
import ProductGrid from "@/components/product-grid"

// Sample categories for filter
const categories = [
  { name: "All", count: 9 },
  { name: "Marble", count: 3 },
  { name: "Granite", count: 3 },
  { name: "Travertine", count: 2 },
  { name: "Onyx", count: 1 },
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
        <ProductGrid />
      </div>
    </div>
  )
}

