import { useMemo } from 'react'
import type { AABB } from './aabb'
// import { CITY_COLLISION_BOXES } from '../city.config'  // wired in TASK-8

export function useCollisionWorld(): AABB[] {
  return useMemo<AABB[]>(() => {
    // TODO(TASK-8): return CITY_COLLISION_BOXES from city.config
    return []
  }, [])
}
