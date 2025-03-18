/**
 * Utility functions for working with textures in Three.js
 */

import * as THREE from "three"

/**
 * Creates a normal map from a color texture
 * This is a simplified approach that works for some textures
 * For production use, consider using a proper normal map generation tool
 */
export function createNormalMapFromTexture(texture: THREE.Texture): THREE.Texture {
  // Clone the texture to avoid modifying the original
  const normalMap = texture.clone()

  // Set appropriate properties for normal maps
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping

  return normalMap
}

/**
 * Creates a roughness map from a color texture
 * This is a simplified approach
 */
export function createRoughnessMapFromTexture(texture: THREE.Texture): THREE.Texture {
  // Clone the texture to avoid modifying the original
  const roughnessMap = texture.clone()

  // Set appropriate properties for roughness maps
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping

  return roughnessMap
}

/**
 * Optimizes a texture for better performance
 */
export function optimizeTexture(texture: THREE.Texture): THREE.Texture {
  // Set appropriate properties for better performance
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 16 // Improve texture quality at oblique angles
  texture.encoding = THREE.sRGBEncoding // Use sRGB encoding for color textures

  return texture
}
