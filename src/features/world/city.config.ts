import type { AABB } from './collision/aabb'

export interface BuildingDef {
  id:       string
  position: [number, number, number]   // center; Y = height/2
  size:     [number, number, number]   // [x_size, y_size, z_size]
  color:    string                     // emissive accent (zone colour)
}

// ── North street (–Z, Lime / Work projects) ────────────────────────────────
// Buildings flank x=±12, elongated along Z
const NORTH_L: BuildingDef[] = [
  { id: 'nl0', position: [-12,  6, -16], size: [ 6, 12, 10], color: '#a3e635' },
  { id: 'nl1', position: [-12,  4, -28], size: [ 6,  8, 10], color: '#a3e635' },
  { id: 'nl2', position: [-12,7.5, -40], size: [ 6, 15, 10], color: '#a3e635' },
]
const NORTH_R: BuildingDef[] = [
  { id: 'nr0', position: [ 12,  6, -16], size: [ 6, 12, 10], color: '#a3e635' },
  { id: 'nr1', position: [ 12,  4, -28], size: [ 6,  8, 10], color: '#a3e635' },
  { id: 'nr2', position: [ 12,7.5, -40], size: [ 6, 15, 10], color: '#a3e635' },
]

// ── East street (+X, Cyan / Pet projects) ─────────────────────────────────
// Buildings flank z=±12, elongated along X
const EAST_F: BuildingDef[] = [
  { id: 'ef0', position: [ 17,  5, -12], size: [10, 10,  6], color: '#22d3ee' },
  { id: 'ef1', position: [ 29,3.5, -12], size: [10,  7,  6], color: '#22d3ee' },
  { id: 'ef2', position: [ 41,6.5, -12], size: [10, 13,  6], color: '#22d3ee' },
]
const EAST_B: BuildingDef[] = [
  { id: 'eb0', position: [ 17,  5,  12], size: [10, 10,  6], color: '#22d3ee' },
  { id: 'eb1', position: [ 29,3.5,  12], size: [10,  7,  6], color: '#22d3ee' },
  { id: 'eb2', position: [ 41,6.5,  12], size: [10, 13,  6], color: '#22d3ee' },
]

// ── South street (+Z, Amber / About me) ────────────────────────────────────
const SOUTH_L: BuildingDef[] = [
  { id: 'sl0', position: [-12,  4,  16], size: [ 6,  8, 10], color: '#fbbf24' },
  { id: 'sl1', position: [-12,5.5,  28], size: [ 6, 11, 10], color: '#fbbf24' },
  { id: 'sl2', position: [-12,4.5,  40], size: [ 6,  9, 10], color: '#fbbf24' },
]
const SOUTH_R: BuildingDef[] = [
  { id: 'sr0', position: [ 12,  4,  16], size: [ 6,  8, 10], color: '#fbbf24' },
  { id: 'sr1', position: [ 12,5.5,  28], size: [ 6, 11, 10], color: '#fbbf24' },
  { id: 'sr2', position: [ 12,4.5,  40], size: [ 6,  9, 10], color: '#fbbf24' },
]

// ── West street (–X, Magenta / Contacts) ──────────────────────────────────
const WEST_F: BuildingDef[] = [
  { id: 'wf0', position: [-17,4.5, -12], size: [10,  9,  6], color: '#f472b6' },
  { id: 'wf1', position: [-29,  6, -12], size: [10, 12,  6], color: '#f472b6' },
  { id: 'wf2', position: [-41,  4, -12], size: [10,  8,  6], color: '#f472b6' },
]
const WEST_B: BuildingDef[] = [
  { id: 'wb0', position: [-17,4.5,  12], size: [10,  9,  6], color: '#f472b6' },
  { id: 'wb1', position: [-29,  6,  12], size: [10, 12,  6], color: '#f472b6' },
  { id: 'wb2', position: [-41,  4,  12], size: [10,  8,  6], color: '#f472b6' },
]

// ── Corner blocks (neutral slate) ─────────────────────────────────────────
const CORNERS: BuildingDef[] = [
  { id: 'c_ne', position: [ 13, 5, -13], size: [8, 10, 8], color: '#475569' },
  { id: 'c_nw', position: [-13, 5, -13], size: [8, 10, 8], color: '#475569' },
  { id: 'c_se', position: [ 13, 5,  13], size: [8, 10, 8], color: '#475569' },
  { id: 'c_sw', position: [-13, 5,  13], size: [8, 10, 8], color: '#475569' },
]

export const CITY_BUILDINGS: BuildingDef[] = [
  ...CORNERS,
  ...NORTH_L, ...NORTH_R,
  ...EAST_F,  ...EAST_B,
  ...SOUTH_L, ...SOUTH_R,
  ...WEST_F,  ...WEST_B,
]

// Derived AABB collision boxes (Y ignored — flat world)
export const CITY_COLLISION_BOXES: AABB[] = CITY_BUILDINGS.map((b) => ({
  minX: b.position[0] - b.size[0] / 2,
  maxX: b.position[0] + b.size[0] / 2,
  minZ: b.position[2] - b.size[2] / 2,
  maxZ: b.position[2] + b.size[2] / 2,
}))

// ── Lamp post positions ────────────────────────────────────────────────────
export const LAMP_POSITIONS: [number, number, number][] = [
  // North street
  [-7, 0, -16], [ 7, 0, -16], [-7, 0, -28], [ 7, 0, -28], [-7, 0, -40], [ 7, 0, -40],
  // East street
  [ 17, 0, -7], [ 17, 0,  7], [ 29, 0, -7], [ 29, 0,  7], [ 41, 0, -7], [ 41, 0,  7],
  // South street
  [-7, 0,  16], [  7, 0,  16], [-7, 0,  28], [  7, 0,  28], [-7, 0,  40], [ 7, 0,  40],
  // West street
  [-17, 0, -7], [-17, 0,  7], [-29, 0, -7], [-29, 0,  7], [-41, 0, -7], [-41, 0,  7],
  // Plaza corners
  [-8, 0, -8], [8, 0, -8], [-8, 0, 8], [8, 0, 8],
]
