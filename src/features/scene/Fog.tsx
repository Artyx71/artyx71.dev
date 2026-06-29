import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useZoneStore } from '@/store/zoneStore'
import { ZONES } from '@/features/zones/zones.config'

const NEUTRAL_COLOR = '#0a0a12'
const FOG_NEAR      = 20
const FOG_FAR       = 80
const LAMBDA        = 3

export function Fog() {
  const fogRef      = useRef<THREE.Fog>(null)
  const currentColor = useRef(new THREE.Color(NEUTRAL_COLOR))
  const targetColor  = useRef(new THREE.Color(NEUTRAL_COLOR))

  useFrame((_, delta) => {
    if (!fogRef.current) return

    const zoneId = useZoneStore.getState().currentZone
    const zone   = ZONES.find((z) => z.id === zoneId)

    targetColor.current.set(zone?.theme.fogColor ?? NEUTRAL_COLOR)

    const alpha = 1 - Math.exp(-LAMBDA * delta)
    currentColor.current.lerp(targetColor.current, alpha)
    fogRef.current.color.copy(currentColor.current)
  })

  return (
    <fog ref={fogRef} attach="fog" args={[NEUTRAL_COLOR, FOG_NEAR, FOG_FAR]} />
  )
}
