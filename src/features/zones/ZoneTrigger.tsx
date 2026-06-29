import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useZoneStore } from '@/store/zoneStore'
import { ZONE_EXIT_MULTIPLIER } from './zones.config'
import type { ZoneEntry } from './zones.types'

interface ZoneTriggerProps {
  zone:      ZoneEntry
  playerRef: React.RefObject<THREE.Group | null>
}

export function ZoneTrigger({ zone, playerRef }: ZoneTriggerProps) {
  const inZoneRef  = useRef(false)
  const exitRadius = zone.triggerRadius * ZONE_EXIT_MULTIPLIER
  const [ex, , ez] = zone.entrancePosition

  useFrame(() => {
    const player = playerRef.current
    if (!player) return

    const dx   = player.position.x - ex
    const dz   = player.position.z - ez
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (!inZoneRef.current && dist < zone.triggerRadius) {
      inZoneRef.current = true
      useZoneStore.getState().setCurrentZone(zone.id)
    } else if (inZoneRef.current && dist > exitRadius) {
      inZoneRef.current = false
      useZoneStore.getState().setCurrentZone(null)
    }
  })

  return null
}
