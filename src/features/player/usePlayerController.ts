import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useInput } from '@/features/input/useInput'
import { useUIStore } from '@/store/uiStore'
import { usePlayerStore } from '@/store/playerStore'
import { clamp, lerpAngle } from '@/utils/math'
import { WALK_SPEED, RUN_SPEED, PLAYER_HALF_W, PLAYER_HALF_D } from '@/utils/constants'
import { useCollisionWorld } from '@/features/world/collision/useCollisionWorld'
import { resolveAxisSeparated } from '@/features/world/collision/aabb'
import type { AnimationName } from './player.types'

const WORLD_BOUNDARY = 50
const STORE_THROTTLE = 6
const PLAYER_HALF_SIZE = { w: PLAYER_HALF_W, d: PLAYER_HALF_D }

const _direction = new THREE.Vector3()
const _euler     = new THREE.Euler(0, 0, 0, 'YXZ')

export function usePlayerController(
  groupRef:     React.RefObject<THREE.Group | null>,
  cameraYawRef: React.MutableRefObject<number>,
  setAnimation: (name: AnimationName) => void,
) {
  const { movementVectorRef, activeCommandsRef } = useInput()
  const frameCountRef = useRef(0)
  const setPosition   = usePlayerStore.getState().setPosition
  const setRotationY  = usePlayerStore.getState().setRotationY
  const obstacles     = useCollisionWorld()

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

    // Camera-relative movement vector → world space
    _euler.set(0, cameraYawRef.current, 0)
    _direction.set(mv.x, 0, mv.z).applyEuler(_euler)

    const moving = _direction.lengthSq() > 0.001

    if (moving) {
      const speed   = isRunning ? RUN_SPEED : WALK_SPEED
      const current = { x: group.position.x, z: group.position.z }
      const desired = {
        x: clamp(current.x + _direction.x * speed * delta, -WORLD_BOUNDARY, WORLD_BOUNDARY),
        z: clamp(current.z + _direction.z * speed * delta, -WORLD_BOUNDARY, WORLD_BOUNDARY),
      }

      const { resolvedX, resolvedZ } = resolveAxisSeparated(
        current, desired, PLAYER_HALF_SIZE, obstacles,
      )

      group.position.x = resolvedX
      group.position.z = resolvedZ

      // Face movement direction (slerp)
      const targetAngle = Math.atan2(_direction.x, _direction.z)
      group.rotation.y  = lerpAngle(group.rotation.y, targetAngle, 1 - Math.exp(-12 * delta))

      setAnimation(isRunning ? 'run' : 'walk')
    } else {
      setAnimation('idle')
    }

    // Throttled Zustand write (UI components, not game loop)
    if (++frameCountRef.current % STORE_THROTTLE === 0) {
      const p = group.position
      setPosition([p.x, p.y, p.z])
      setRotationY(group.rotation.y)
    }
  })
}
