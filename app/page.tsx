import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductSlider from "@/components/product-slider"
import HeroSlider from "@/components/hero-slider"
import ContactDialog from "@/components/contact-dialog"
import ParallaxSection from "@/components/parallax-section"
import AnimateOnScroll from "@/components/animate-on-scroll"
import TextureHoverEffect from "@/components/texture-hover-effect"
// import StoneViewer3D from "@/components/stone-viewer-3d"

export default function Home() {
  return (
    <>
      {/* Hero Section with Parallax */}
      <ParallaxSection speed={0.5} className="relative">
        <HeroSlider />
      </ParallaxSection>

      {/* Products Section */}
      {/* <AnimateOnScroll animation="fade-up"> */}
        <section className="py-16">
          <div className="container mx-auto">
            <ProductSlider />
          </div>
        </section>
      {/* </AnimateOnScroll> */}

      {/* About Section with Parallax */}
      <ParallaxSection speed={0.3} className="bg-stone-100">
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <AnimateOnScroll animation="fade-right">
                <div className="flex flex-col justify-center space-y-4">
                  <h2 className="text-3xl font-light text-stone-800">Our Commitment to Excellence</h2>
                  <p className="text-stone-600">
                    We source the finest natural stones from around the world, offering an exquisite collection of
                    marble, granite, and other premium stones. Each piece tells a unique story of Earth geological
                    wonders, bringing timeless beauty to your spaces.
                  </p>
                  <div>
                    <Button className="rounded-none bg-amber-700 text-white hover:bg-amber-800">
                      Discover Our Story
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-left">
                <div className="relative aspect-video overflow-hidden rounded-sm shadow-lg">
                  <TextureHoverEffect>
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Marble Craftsmanship"
                      fill
                      className="object-cover"
                    />
                  </TextureHoverEffect>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* 3D Stone Viewer Section */}
      {/* <AnimateOnScroll animation="fade-up">
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-light text-stone-800">Explore Our Stones in 3D</h2>
            <div className="mx-auto max-w-3xl">
              <StoneViewer3D />
            </div>
          </div>
        </section>
      </AnimateOnScroll> */}

      {/* Featured Projects */}
      <AnimateOnScroll animation="fade-up">
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-light text-stone-800">Featured Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((project) => (
                <AnimateOnScroll key={project} animation="zoom-in" delay={project * 100}>
                  <div className="group overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <TextureHoverEffect>
                        <Image
                          src={`/placeholder.svg?height=500&width=500&text=Project ${project}`}
                          alt={`Featured Project ${project}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </TextureHoverEffect>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-medium">Luxury Residence</h3>
                        <p className="text-sm">Premium marble installation</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/projects">
                <Button className="rounded-none bg-amber-700 text-white hover:bg-amber-800">View All Projects</Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Contact CTA */}
      <AnimateOnScroll animation="fade-up">
        <section className="bg-stone-800 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-light">Transform Your Space with Natural Elegance</h2>
              <p className="mb-8 text-stone-300">
                Connect with our team to discover the perfect stone for your next project
              </p>
              <Link href="/contact">
                <Button className="rounded-none bg-amber-600 text-white hover:bg-amber-700">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Fixed Email Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <ContactDialog />
      </div>
    </>
  )
}

