import { useEffect, useRef } from 'react'
import { useAnimations } from '@react-three/drei'
import type { Group, AnimationClip } from 'three'
import type { AnimationName } from './player.types'

const CLIP_NAME: Record<AnimationName, string> = {
  idle: 'Idle',
  walk: 'Walk',
  run:  'Run',
}

export function useCharacterAnimations(
  animations: AnimationClip[],
  groupRef: React.RefObject<Group | null>,
) {
  const { actions } = useAnimations(animations, groupRef)
  const currentRef = useRef<AnimationName>('idle')

  useEffect(() => {
    actions[CLIP_NAME.idle]?.play()
  }, [actions])

  function setAnimation(next: AnimationName) {
    if (next === currentRef.current) return
    const prevClip = actions[CLIP_NAME[currentRef.current]]
    const nextClip = actions[CLIP_NAME[next]]
    if (!nextClip) return
    prevClip?.fadeOut(0.2)
    nextClip.reset().fadeIn(0.2).play()
    currentRef.current = next
  }

  return setAnimation
}
