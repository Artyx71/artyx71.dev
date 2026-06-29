export type InputCommand =
  | 'forward'
  | 'backward'
  | 'strafeLeft'
  | 'strafeRight'
  | 'run'
  | 'interact'

export interface InputState {
  activeCommands: Set<InputCommand>
  movementVector: { x: number; z: number }
}
