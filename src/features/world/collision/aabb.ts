export interface AABB {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export interface CollisionResolution {
  resolvedX: number
  resolvedZ: number
  collided:  boolean
}

export function intersect(a: AABB, b: AABB): boolean {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ
}

/**
 * Axis-separated resolution: test X first, then Z independently.
 * Allows sliding along walls instead of sticking at corners.
 */
export function resolveAxisSeparated(
  current:   { x: number; z: number },
  desired:   { x: number; z: number },
  halfSize:  { w: number; d: number },
  obstacles: AABB[],
): CollisionResolution {
  const { w: hw, d: hd } = halfSize
  let resolvedX = desired.x
  let resolvedZ = desired.z
  let collided  = false

  // Test X movement at current Z
  const boxX: AABB = { minX: resolvedX - hw, maxX: resolvedX + hw, minZ: current.z - hd, maxZ: current.z + hd }
  for (const obs of obstacles) {
    if (intersect(boxX, obs)) {
      resolvedX = current.x
      collided  = true
      break
    }
  }

  // Test Z movement at resolved X
  const boxZ: AABB = { minX: resolvedX - hw, maxX: resolvedX + hw, minZ: resolvedZ - hd, maxZ: resolvedZ + hd }
  for (const obs of obstacles) {
    if (intersect(boxZ, obs)) {
      resolvedZ = current.z
      collided  = true
      break
    }
  }

  return { resolvedX, resolvedZ, collided }
}
