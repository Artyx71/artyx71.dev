import { PORTFOLIO_ITEMS } from '@/features/portfolio-content/portfolio.data'
import type { Interactable } from './interaction.types'

export const INTERACTABLES: Interactable[] = PORTFOLIO_ITEMS.map((item) => ({
  id:          item.id,
  position:    item.position,
  label:       item.title,
  contentId:   item.id,
  accentColor: item.accentColor,
}))
