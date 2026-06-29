export type AnimationName = 'idle' | 'walk' | 'run'

export interface PlayerState {
  position: [number, number, number]
  rotationY: number
  velocity: { x: number; z: number }
  currentAnimation: AnimationName
}

export interface PlayerVisualConfig {
  outlineColor: string
  outlineIntensity: number
}
