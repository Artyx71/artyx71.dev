import type { BuildingDef } from './city.config'

export function Building({ position, size, color }: BuildingDef) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#0d0d16"
        emissive={color}
        emissiveIntensity={0.12}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  )
}
