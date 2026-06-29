import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useZoneStore } from '@/store/zoneStore'
import { ZONES } from '@/features/zones/zones.config'

const NEUTRAL_COLOR     = '#0a0a18'
const NEUTRAL_INTENSITY = 0.2
const LAMBDA            = 3   // exponential decay speed (~0.7s to 90% target)

export function Lights() {
  const ambientRef      = useRef<THREE.AmbientLight>(null)
  const currentColor    = useRef(new THREE.Color(NEUTRAL_COLOR))
  const targetColor     = useRef(new THREE.Color(NEUTRAL_COLOR))
  const currentIntens   = useRef(NEUTRAL_INTENSITY)

  useFrame((_, delta) => {
    if (!ambientRef.current) return

    const zoneId = useZoneStore.getState().currentZone
    const zone   = ZONES.find((z) => z.id === zoneId)

    targetColor.current.set(zone?.theme.ambientLightColor ?? NEUTRAL_COLOR)
    const targetIntens = zone?.theme.ambientLightIntensity ?? NEUTRAL_INTENSITY

    const alpha = 1 - Math.exp(-LAMBDA * delta)
    currentColor.current.lerp(targetColor.current, alpha)
    currentIntens.current += (targetIntens - currentIntens.current) * alpha

    ambientRef.current.color.copy(currentColor.current)
    ambientRef.current.intensity = currentIntens.current
  })

  return (
    <>
      <ambientLight ref={ambientRef} color={NEUTRAL_COLOR} intensity={NEUTRAL_INTENSITY} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  )
}
