import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useCharacterAnimations } from './useCharacterAnimations'
import { usePlayerController } from './usePlayerController'
import {
  PLAYER_VISUAL,
  PLAYER_CLOTHES_COLOR,
  PLAYER_RIM_DISTANCE,
  PLAYER_RIM_INTENSITY,
} from './player.visual.constants'

interface PlayerProps {
  groupRef:     React.RefObject<THREE.Group | null>
  cameraYawRef: React.MutableRefObject<number>
}

export function Player({ groupRef, cameraYawRef }: PlayerProps) {
  const { scene, animations } = useGLTF('/models/character.glb')
  const setAnimation = useCharacterAnimations(animations, groupRef)
  usePlayerController(groupRef, cameraYawRef, setAnimation)

  // Override materials: dark clothes + slight emissive for depth
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.SkinnedMesh || child instanceof THREE.Mesh) {
        const apply = (mat: THREE.Material) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.setHex(PLAYER_CLOTHES_COLOR)
            mat.roughness = 0.85
            mat.metalness = 0.05
            mat.needsUpdate = true
          }
        }
        if (Array.isArray(child.material)) child.material.forEach(apply)
        else apply(child.material)
      }
    })
  }, [scene])

  // Internal ref used only for the initial spawn position
  const spawnedRef = useRef(false)

  return (
    <group ref={groupRef as React.RefObject<THREE.Group>} position={[0, 0, 0]}>
      {!spawnedRef.current && (() => { spawnedRef.current = true; return null })()}
      <primitive object={scene} />

      {/* Rim-light: lime point light centered on character */}
      <pointLight
        color={PLAYER_VISUAL.outlineColor}
        intensity={PLAYER_RIM_INTENSITY}
        distance={PLAYER_RIM_DISTANCE}
        decay={2}
        position={[0, 1, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/character.glb')
