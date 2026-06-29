import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { clamp } from '@/utils/math'
import {
  CAMERA_PITCH_DEFAULT,
  CAMERA_PITCH_MIN,
  CAMERA_PITCH_MAX,
  CAMERA_MOUSE_SENSITIVITY,
} from './camera.constants'

export function useCameraOrbit() {
  const { gl } = useThree()
  const yawRef   = useRef(0)                     // 0 = камера сзади игрока
  const pitchRef = useRef(CAMERA_PITCH_DEFAULT)

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerDown = () => {
      canvas.requestPointerLock()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return
      yawRef.current   += e.movementX * CAMERA_MOUSE_SENSITIVITY
      pitchRef.current  = clamp(
        pitchRef.current - e.movementY * CAMERA_MOUSE_SENSITIVITY,
        CAMERA_PITCH_MIN,
        CAMERA_PITCH_MAX,
      )
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('mousemove', onMouseMove)
      if (document.pointerLockElement === canvas) document.exitPointerLock()
    }
  }, [gl.domElement])

  return { yawRef, pitchRef }
}
