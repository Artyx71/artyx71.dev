import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { INTERACT_RADIUS } from '@/utils/constants'
import type { Interactable } from './interaction.types'

interface InteractableObjectProps {
  interactable: Interactable
  playerRef:    React.RefObject<THREE.Group | null>
}

export function InteractableObject({ interactable, playerRef }: InteractableObjectProps) {
  const matRef    = useRef<THREE.MeshStandardMaterial>(null)
  const isNearRef = useRef(false)
  const [showHint, setShowHint] = useState(false)

  const [ex, , ez] = interactable.position

  useFrame(() => {
    const player = playerRef.current
    if (!player || !matRef.current) return

    const dx   = player.position.x - ex
    const dz   = player.position.z - ez
    const dist = Math.sqrt(dx * dx + dz * dz)
    const near = dist < INTERACT_RADIUS

    if (near !== isNearRef.current) {
      isNearRef.current = near
      setShowHint(near)
    }

    const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5
    matRef.current.emissiveIntensity = near
      ? 1.2 + pulse * 0.6
      : 0.15 + pulse * 0.05
  })

  return (
    <group position={interactable.position}>
      {/* Terminal screen */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.1]} />
        <meshStandardMaterial
          ref={matRef}
          color="#0d0d18"
          emissive={interactable.accentColor}
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.9} />
      </mesh>

      {/* Base plate */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.4]} />
        <meshStandardMaterial color="#111118" roughness={0.8} />
      </mesh>

      {/* Interaction hint — shown only when nearby */}
      {showHint && (
        <Text
          position={[0, 1.9, 0]}
          fontSize={0.22}
          color={interactable.accentColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          [E] {interactable.label}
        </Text>
      )}
    </group>
  )
}
