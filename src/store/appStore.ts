import { create } from 'zustand'
import type { AppPhase } from '@/app/AppPhase'

interface AppStore {
  appPhase: AppPhase
  setAppPhase: (phase: AppPhase) => void
}

export const useAppStore = create<AppStore>((set) => ({
  appPhase: 'landing',
  setAppPhase: (phase) => set({ appPhase: phase }),
}))
