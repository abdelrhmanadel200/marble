import * as THREE from "three"

// Helper function to load textures with proper CORS settings
export const loadTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous"

    textureLoader.load(
      url,
      (texture) => {
        resolve(texture)
      },
      undefined,
      (error) => {
        reject(error)
      },
    )
  })
}

// Helper function to create a standard material with textures
export const createStoneMaterial = async (
  diffuseMap: string,
  normalMap?: string,
  roughnessMap?: string,
  aoMap?: string,
): Promise<THREE.MeshStandardMaterial> => {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.2,
  })

  try {
    // Load diffuse texture
    material.map = await loadTexture(diffuseMap)

    // Load optional textures if provided
    if (normalMap) {
      material.normalMap = await loadTexture(normalMap)
    }

    if (roughnessMap) {
      material.roughnessMap = await loadTexture(roughnessMap)
    }

    if (aoMap) {
      material.aoMap = await loadTexture(aoMap)
    }

    material.needsUpdate = true
    return material
  } catch (error) {
    console.error("Error loading textures:", error)
    return material
  }
}

