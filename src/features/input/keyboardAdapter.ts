import type { InputCommand } from './input.types'

const KEY_MAP: Record<string, InputCommand> = {
  w: 'forward',
  W: 'forward',
  ArrowUp: 'forward',
  s: 'backward',
  S: 'backward',
  ArrowDown: 'backward',
  a: 'strafeLeft',
  A: 'strafeLeft',
  ArrowLeft: 'strafeLeft',
  d: 'strafeRight',
  D: 'strafeRight',
  ArrowRight: 'strafeRight',
  Shift: 'run',
  e: 'interact',
  E: 'interact',
}

export function keyToCommand(key: string): InputCommand | null {
  return KEY_MAP[key] ?? null
}
