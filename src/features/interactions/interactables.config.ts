import type { Interactable } from './interaction.types'

// Placeholder terminals — one per zone.
// TASK-10 will replace contentIds with real portfolio.data.ts entries.
export const INTERACTABLES: Interactable[] = [
  {
    id:          'terminal_work',
    position:    [0, 0, -26],
    label:       'Work Projects',
    contentId:   'work-placeholder',
    accentColor: '#a3e635',
  },
  {
    id:          'terminal_pets',
    position:    [26, 0, 0],
    label:       'Pet Projects',
    contentId:   'pets-placeholder',
    accentColor: '#22d3ee',
  },
  {
    id:          'terminal_skills',
    position:    [42, 0, -4],
    label:       'Skills',
    contentId:   'skills-placeholder',
    accentColor: '#a78bfa',
  },
  {
    id:          'terminal_about',
    position:    [0, 0, 26],
    label:       'About Me',
    contentId:   'about-placeholder',
    accentColor: '#fbbf24',
  },
  {
    id:          'terminal_contacts',
    position:    [-26, 0, 0],
    label:       'Contacts',
    contentId:   'contacts-placeholder',
    accentColor: '#f472b6',
  },
]
