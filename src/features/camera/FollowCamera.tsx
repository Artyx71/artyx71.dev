import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { damp } from '@/utils/math'
import { useCameraOrbit } from './useCameraOrbit'
import {
  CAMERA_RADIUS,
  CAMERA_HEIGHT_OFFSET,
  CAMERA_DAMPING,
} from './camera.constants'

interface FollowCameraProps {
  target:       React.RefObject<THREE.Group | null>
  cameraYawRef: React.MutableRefObject<number>
}

export function FollowCamera({ target, cameraYawRef }: FollowCameraProps) {
  const { camera } = useThree()
  const { yawRef, pitchRef } = useCameraOrbit()
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    const group = target.current
    if (!group) return

    const yaw   = yawRef.current
    const pitch = pitchRef.current

    // Spherical offset from player position
    const sinYaw   = Math.sin(yaw)
    const cosYaw   = Math.cos(yaw)
    const cosPitch = Math.cos(pitch)
    const sinPitch = Math.sin(pitch)

    const desiredX = group.position.x + CAMERA_RADIUS * sinYaw * cosPitch
    const desiredY = group.position.y + CAMERA_HEIGHT_OFFSET + CAMERA_RADIUS * sinPitch
    const desiredZ = group.position.z + CAMERA_RADIUS * cosYaw * cosPitch

    // Damped follow
    camera.position.x = damp(camera.position.x, desiredX, CAMERA_DAMPING, delta)
    camera.position.y = damp(camera.position.y, desiredY, CAMERA_DAMPING, delta)
    camera.position.z = damp(camera.position.z, desiredZ, CAMERA_DAMPING, delta)

    // Look at player chest/head
    lookAt.set(group.position.x, group.position.y + 1.0, group.position.z)
    camera.lookAt(lookAt)

    // Expose yaw so Player can do camera-relative movement
    cameraYawRef.current = yaw

    // TODO(TASK-6-edge): camera↔wall collision — raycast between camera and player,
    // pull camera in if ray hits geometry. Not blocking MVP.
  })

  return null
}
