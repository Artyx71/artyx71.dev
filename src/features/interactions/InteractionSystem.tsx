import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useInput } from '@/features/input/useInput'
import { useUIStore } from '@/store/uiStore'
import { INTERACT_RADIUS } from '@/utils/constants'
import type { Interactable } from './interaction.types'

interface InteractionSystemProps {
  interactables: Interactable[]
  playerRef:     React.RefObject<THREE.Group | null>
}

export function InteractionSystem({ interactables, playerRef }: InteractionSystemProps) {
  const { activeCommandsRef } = useInput()
  const nearestContentId      = useRef<string | null>(null)
  const eWasDown              = useRef(false)

  useFrame(() => {
    const player = playerRef.current
    if (!player) return

    // Proximity — find nearest interactable within radius
    let best: Interactable | null = null
    let bestDist = Infinity
    for (const obj of interactables) {
      const dx = player.position.x - obj.position[0]
      const dz = player.position.z - obj.position[2]
      const d  = Math.sqrt(dx * dx + dz * dz)
      if (d < INTERACT_RADIUS && d < bestDist) {
        bestDist = d
        best     = obj
      }
    }
    nearestContentId.current = best?.contentId ?? null

    // Rising-edge E detection — fire once per keypress
    const eDown = activeCommandsRef.current?.has('interact') ?? false
    if (eDown && !eWasDown.current && nearestContentId.current) {
      useUIStore.getState().openModal(nearestContentId.current)
    }
    eWasDown.current = eDown
  })

  return null
}
