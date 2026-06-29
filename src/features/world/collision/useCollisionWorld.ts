import { useMemo } from 'react'
import type { AABB } from './aabb'
import { CITY_COLLISION_BOXES } from '../city.config'

export function useCollisionWorld(): AABB[] {
  // Stable reference — config is static, memo never invalidates
  return useMemo<AABB[]>(() => CITY_COLLISION_BOXES, [])
}
