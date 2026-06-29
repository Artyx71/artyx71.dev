import { create } from 'zustand'

interface UIState {
  modalOpen: boolean
  activeContentId: string | null
  controlsHintDismissed: boolean
}

interface UIStore extends UIState {
  openModal: (contentId: string) => void
  closeModal: () => void
  dismissControlsHint: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  modalOpen: false,
  activeContentId: null,
  controlsHintDismissed: false,
  openModal: (contentId) => set({ modalOpen: true, activeContentId: contentId }),
  closeModal: () => set({ modalOpen: false, activeContentId: null }),
  dismissControlsHint: () => set({ controlsHintDismissed: true }),
}))
