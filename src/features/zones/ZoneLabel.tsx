import { Text } from '@react-three/drei'
import type { ZoneEntry } from './zones.types'

interface ZoneLabelProps {
  zone: ZoneEntry
}

const LABEL_HEIGHT = 3.0

export function ZoneLabel({ zone }: ZoneLabelProps) {
  const [x, , z] = zone.entrancePosition
  return (
    <Text
      position={[x, LABEL_HEIGHT, z]}
      fontSize={0.65}
      color={zone.theme.accentColor}
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.12}
      outlineWidth={0.025}
      outlineColor="#000000"
      renderOrder={1}
    >
      {zone.label}
    </Text>
  )
}
