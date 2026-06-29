import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useInput } from '@/features/input/useInput'
import { useUIStore } from '@/store/uiStore'
import { usePlayerStore } from '@/store/playerStore'
import { clamp, lerpAngle } from '@/utils/math'
import { WALK_SPEED, RUN_SPEED } from '@/utils/constants'
import type { AnimationName } from './player.types'

const WORLD_BOUNDARY = 50
const STORE_THROTTLE = 6   // write playerStore every N frames

const _direction = new THREE.Vector3()
const _euler = new THREE.Euler(0, 0, 0, 'YXZ')

export function usePlayerController(
  groupRef:     React.RefObject<THREE.Group | null>,
  cameraYawRef: React.MutableRefObject<number>,
  setAnimation: (name: AnimationName) => void,
) {
  const { movementVectorRef, activeCommandsRef } = useInput()
  const frameCountRef = useRef(0)
  const setPosition  = usePlayerStore.getState().setPosition
  const setRotationY = usePlayerStore.getState().setRotationY

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    if (useUIStore.getState().modalOpen) {
      setAnimation('idle')
      return
    }

    const mv = movementVectorRef.current
    if (!mv || !activeCommandsRef.current) return
    const isRunning = activeCommandsRef.current.has('run')

    // Rotate input vector into world space by camera yaw
    _euler.set(0, cameraYawRef.current ?? 0, 0)
    _direction.set(mv.x, 0, mv.z).applyEuler(_euler)

    const moving = _direction.lengthSq() > 0.001

    if (moving) {
      const speed = isRunning ? RUN_SPEED : WALK_SPEED
      group.position.x += _direction.x * speed * delta
      group.position.z += _direction.z * speed * delta

      // Clamp within world boundary
      group.position.x = clamp(group.position.x, -WORLD_BOUNDARY, WORLD_BOUNDARY)
      group.position.z = clamp(group.position.z, -WORLD_BOUNDARY, WORLD_BOUNDARY)

      // Smooth rotation toward movement direction
      const targetAngle = Math.atan2(_direction.x, _direction.z)
      group.rotation.y = lerpAngle(group.rotation.y, targetAngle, 1 - Math.exp(-12 * delta))

      setAnimation(isRunning ? 'run' : 'walk')
    } else {
      setAnimation('idle')
    }

    // TODO(TASK-7): apply AABB collision resolution before writing position

    // Throttled write to Zustand (UI-facing, not game-loop-facing)
    if (++frameCountRef.current % STORE_THROTTLE === 0) {
      const p = group.position
      setPosition([p.x, p.y, p.z])
      setRotationY(group.rotation.y)
    }
  })
}
