import { create } from 'zustand'

interface ZoneStore {
  currentZone: string | null
  visitedZones: Set<string>
  setCurrentZone: (zoneId: string | null) => void
}

export const useZoneStore = create<ZoneStore>((set) => ({
  currentZone: null,
  visitedZones: new Set(),
  setCurrentZone: (zoneId) =>
    set((state) => ({
      currentZone: zoneId,
      visitedZones: zoneId
        ? new Set([...state.visitedZones, zoneId])
        : state.visitedZones,
    })),
}))
