import { createContext, useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { InputCommand } from './input.types'
import { keyToCommand } from './keyboardAdapter'

export interface InputContextValue {
  movementVectorRef: React.RefObject<{ x: number; z: number }>
  activeCommandsRef: React.RefObject<Set<InputCommand>>
}

export const InputContext = createContext<InputContextValue | null>(null)

function computeMovementVector(commands: Set<InputCommand>): { x: number; z: number } {
  const fwd = commands.has('forward') ? 1 : 0
  const bwd = commands.has('backward') ? 1 : 0
  const lft = commands.has('strafeLeft') ? 1 : 0
  const rgt = commands.has('strafeRight') ? 1 : 0

  const z = bwd - fwd   // -1 = forward, +1 = backward (Three.js: -Z into screen)
  const x = rgt - lft   // +1 = right, -1 = left

  const len = Math.sqrt(x * x + z * z)
  if (len === 0) return { x: 0, z: 0 }
  return { x: x / len, z: z / len }
}

interface Props {
  children: ReactNode
}

export function InputProvider({ children }: Props) {
  const activeCommandsRef = useRef<Set<InputCommand>>(new Set())
  const movementVectorRef = useRef<{ x: number; z: number }>({ x: 0, z: 0 })

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return
    const command = keyToCommand(e.key)
    if (!command) return
    activeCommandsRef.current.add(command)
    movementVectorRef.current = computeMovementVector(activeCommandsRef.current)
  }, [])

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    const command = keyToCommand(e.key)
    if (!command) return
    activeCommandsRef.current.delete(command)
    movementVectorRef.current = computeMovementVector(activeCommandsRef.current)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyDown, onKeyUp])

  return (
    <InputContext.Provider value={{ movementVectorRef, activeCommandsRef }}>
      {children}
    </InputContext.Provider>
  )
}
