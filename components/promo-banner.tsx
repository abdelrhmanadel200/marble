import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BANNER_IMAGES } from "@/lib/image-config"

interface PromoBannerProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  bannerType: "sale" | "newArrivals"
  className?: string
}

export function PromoBanner({
  title,
  description,
  buttonText,
  buttonLink,
  bannerType,
  className = "",
}: PromoBannerProps) {
  const bannerImage = BANNER_IMAGES[bannerType]

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className="relative h-48 md:h-64">
        <Image src={bannerImage.path || "/placeholder.svg"} alt={bannerImage.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="px-6 py-4 w-full">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{title}</h3>
            <p className="text-white mb-4">{description}</p>
            <Link href={buttonLink}>
              <Button className="bg-red-600 hover:bg-red-700">{buttonText}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
