"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import * as THREE from "three"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

interface StoneViewerProps {
  productImages: string[]
  productName: string
}

function Stone({ textureUrl }: { textureUrl: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous"

    textureLoader.load(
      textureUrl,
      (loadedTexture) => {
        // Configure texture for better appearance
        loadedTexture.wrapS = loadedTexture.wrapT = THREE.RepeatWrapping
        loadedTexture.repeat.set(1, 1)
        loadedTexture.anisotropy = 16
        setTexture(loadedTexture)
        setIsLoading(false)
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", err)
        setError("Failed to load texture")
        setIsLoading(false)
      },
    )

    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [textureUrl])

  if (isLoading) {
    return null
  }

  if (error || !texture) {
    return (
      <mesh>
        <boxGeometry args={[3, 3, 0.2]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    )
  }

  return (
    <mesh>
      <boxGeometry args={[3, 3, 0.2]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.5}
        metalness={0.2}
        // Use the same texture for normal map with reduced effect
        normalMap={texture}
        normalScale={new THREE.Vector2(0.15, 0.15)}
        // Enhance the material with some displacement for texture
        displacementMap={texture}
        displacementScale={0.05}
      />
    </mesh>
  )
}

function Scene({
  textureUrl,
  cameraPosition,
  setCameraPosition,
}: {
  textureUrl: string
  cameraPosition: [number, number, number]
  setCameraPosition: (position: [number, number, number]) => void
}) {
  const { camera } = useThree()
  const controlsRef = useRef<OrbitControlsImpl>(null)

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  useEffect(() => {
    camera.position.set(...cameraPosition)
    camera.updateProjectionMatrix()
  }, [camera, cameraPosition])

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        onChange={() => {
          const newPosition = camera.position.toArray() as [number, number, number]
          setCameraPosition(newPosition)
        }}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1} />
      <Stone textureUrl={textureUrl} />
      <Environment preset="studio" />
    </>
  )
}

export default function ProductViewer3D({ productImages, productName }: StoneViewerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5])

  // Filter out valid image URLs
  const validImages = productImages.filter((img) => img && !img.includes("placeholder"))

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [activeImageIndex])

  const handleReset = () => {
    setCameraPosition([0, 0, 5])
  }

  const handleZoomIn = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.max(prev[2] - 0.5, 2)])
  }

  const handleZoomOut = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.min(prev[2] + 0.5, 10)])
  }

  // If no valid images, show a message
  if (validImages.length === 0) {
    return (
      <div className="bg-stone-100 rounded-md p-6 text-center">
        <p className="text-stone-500">No images available for 3D preview</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold mb-2">3D Stone Viewer</h2>

      {validImages.length > 1 ? (
        <Tabs defaultValue={String(0)} onValueChange={(value) => setActiveImageIndex(Number.parseInt(value))}>
          <TabsList className={`grid w-full grid-cols-${Math.min(validImages.length, 4)}`}>
            {validImages.map((_, index) => (
              <TabsTrigger key={index} value={String(index)}>
                View {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {validImages.map((image, index) => (
            <TabsContent key={index} value={String(index)} className="mt-0">
              <div className="relative aspect-[4/3] bg-stone-100 rounded-md overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-100/80 z-10">
                    <Loader className="h-8 w-8 animate-spin text-stone-500" />
                  </div>
                )}
                <Canvas>
                  <Scene
                    textureUrl={validImages[activeImageIndex]}
                    cameraPosition={cameraPosition}
                    setCameraPosition={setCameraPosition}
                  />
                </Canvas>
              </div>
              <div className="text-center text-sm text-stone-500 mt-2">Click and drag to rotate • Scroll to zoom</div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        // If only one image, don't show tabs
        <div>
          <div className="relative aspect-[4/3] bg-stone-100 rounded-md overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100/80 z-10">
                <Loader className="h-8 w-8 animate-spin text-stone-500" />
              </div>
            )}
            <Canvas>
              <Scene
                textureUrl={validImages[0]}
                cameraPosition={cameraPosition}
                setCameraPosition={setCameraPosition}
              />
            </Canvas>
          </div>
          <div className="text-center text-sm text-stone-500 mt-2">Click and drag to rotate • Scroll to zoom</div>
        </div>
      )}

      <div className="flex justify-center space-x-2">
        <Button variant="outline" size="icon" onClick={handleReset} className="rounded-full">
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset View</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomIn} className="rounded-full">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom In</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut} className="rounded-full">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom Out</span>
        </Button>
      </div>
    </div>
  )
}
