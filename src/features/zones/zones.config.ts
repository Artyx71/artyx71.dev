import type { ZoneEntry } from './zones.types'

// Exit radius multiplier for hysteresis — prevents boundary jitter
export const ZONE_EXIT_MULTIPLIER = 1.6

export const ZONES: ZoneEntry[] = [
  // ── North street (–Z) — Work Projects / Lime ────────────────────────────
  {
    id:               'work-projects',
    label:            'WORK',
    entrancePosition: [0, 0, -16],
    triggerRadius:    6,
    theme: {
      fogColor:              '#06140a',
      ambientLightColor:     '#a3e635',
      ambientLightIntensity: 0.35,
      accentColor:           '#a3e635',
    },
    contentIds: [],
  },

  // ── East street (+X) — Pet Projects / Cyan ──────────────────────────────
  {
    id:               'pet-projects',
    label:            'PROJECTS',
    entrancePosition: [16, 0, 0],
    triggerRadius:    6,
    theme: {
      fogColor:              '#041719',
      ambientLightColor:     '#22d3ee',
      ambientLightIntensity: 0.35,
      accentColor:           '#22d3ee',
    },
    contentIds: [],
  },

  // ── East street dead end — Skills / Violet ──────────────────────────────
  // Accessible by walking the full length of the east corridor past Pet Projects
  {
    id:               'skills',
    label:            'SKILLS',
    entrancePosition: [42, 0, 0],
    triggerRadius:    7,
    theme: {
      fogColor:              '#0e0b1a',
      ambientLightColor:     '#a78bfa',
      ambientLightIntensity: 0.40,
      accentColor:           '#a78bfa',
    },
    contentIds: [],
  },

  // ── South street (+Z) — About / Amber ───────────────────────────────────
  {
    id:               'about',
    label:            'ABOUT',
    entrancePosition: [0, 0, 16],
    triggerRadius:    6,
    theme: {
      fogColor:              '#1a1203',
      ambientLightColor:     '#fbbf24',
      ambientLightIntensity: 0.35,
      accentColor:           '#fbbf24',
    },
    contentIds: [],
  },

  // ── West street (–X) — Contacts / Magenta ───────────────────────────────
  {
    id:               'contacts',
    label:            'CONTACTS',
    entrancePosition: [-16, 0, 0],
    triggerRadius:    6,
    theme: {
      fogColor:              '#180b12',
      ambientLightColor:     '#f472b6',
      ambientLightIntensity: 0.35,
      accentColor:           '#f472b6',
    },
    contentIds: [],
  },
]
