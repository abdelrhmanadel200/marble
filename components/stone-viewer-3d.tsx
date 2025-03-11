"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import * as THREE from "three"
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

interface StoneTexture {
  id: string
  name: string
  texture: string
  normalMap: string
  roughnessMap: string
}

const STONE_TEXTURES: StoneTexture[] = [
  {
    id: "marble",
    name: "Carrara Marble",
    texture: "/placeholder.svg?height=1024&width=1024&text=Marble Texture",
    normalMap: "/placeholder.svg?height=1024&width=1024&text=Marble Normal Map",
    roughnessMap: "/placeholder.svg?height=1024&width=1024&text=Marble Roughness",
  },
  {
    id: "granite",
    name: "Black Granite",
    texture: "/marble1.jpg",
    normalMap: "/marble1.jpg",
    roughnessMap: "/marble1.jpg",
  },
  {
    id: "travertine",
    name: "Classic Travertine",
    texture: "/placeholder.svg?height=1024&width=1024&text=Travertine Texture",
    normalMap: "/placeholder.svg?height=1024&width=1024&text=Travertine Normal Map",
    roughnessMap: "/placeholder.svg?height=1024&width=1024&text=Travertine Roughness",
  },
]

function Stone({ textureUrls }: { textureUrls: StoneTexture }) {
  const [colorMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    textureUrls.texture,
    textureUrls.normalMap,
    textureUrls.roughnessMap,
  ])

  return (
    <mesh>
      <boxGeometry args={[3, 3, 0.2]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        roughness={0.5}
        metalness={0.2}
      />
    </mesh>
  )
}

function Scene({
  textureUrls,
  cameraPosition,
  setCameraPosition,
}: {
  textureUrls: StoneTexture
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
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1} />
      <Stone textureUrls={textureUrls} />
      <Environment preset="studio" />
    </>
  )
}

export default function StoneViewer3D() {
  const [activeStone, setActiveStone] = useState(STONE_TEXTURES[0].id)
  const [isLoading, setIsLoading] = useState(true)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [activeStone])

  const selectedStone = STONE_TEXTURES.find((stone) => stone.id === activeStone)

  const handleReset = () => {
    setCameraPosition([0, 0, 5])
  }

  const handleZoomIn = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.max(prev[2] - 0.5, 2)])
  }

  const handleZoomOut = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.min(prev[2] + 0.5, 10)])
  }

  if (!selectedStone) {
    return null
  }

  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue={activeStone} onValueChange={setActiveStone}>
        <TabsList className="grid w-full grid-cols-3">
          {STONE_TEXTURES.map((stone) => (
            <TabsTrigger key={stone.id} value={stone.id}>
              {stone.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {STONE_TEXTURES.map((stone) => (
          <TabsContent key={stone.id} value={stone.id} className="mt-0">
            <div className="relative aspect-[4/3] bg-stone-100 rounded-md overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-100/80 z-10">
                  <Loader className="h-8 w-8 animate-spin text-stone-500" />
                </div>
              )}
              <Canvas>
                <Scene
                  textureUrls={selectedStone}
                  cameraPosition={cameraPosition}
                  setCameraPosition={setCameraPosition}
                />
              </Canvas>
            </div>
            <div className="text-center text-sm text-stone-500 mt-2">Click and drag to rotate • Scroll to zoom</div>
          </TabsContent>
        ))}
      </Tabs>

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

