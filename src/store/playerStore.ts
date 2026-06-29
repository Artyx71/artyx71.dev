import { create } from 'zustand'

interface PlayerStore {
  position: [number, number, number]
  rotationY: number
  setPosition: (pos: [number, number, number]) => void
  setRotationY: (y: number) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  position: [0, 0, 0],
  rotationY: 0,
  setPosition: (pos) => set({ position: pos }),
  setRotationY: (y) => set({ rotationY: y }),
}))
