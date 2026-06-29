import { CITY_BUILDINGS } from './city.config'
import { Building } from './Building'
import { InstancedProps } from './InstancedProps'

const ROAD_MAT_COLOR   = '#09090f'
const PLAZA_MAT_COLOR  = '#10101a'

export function City() {
  return (
    <group>
      {/* ── Road / plaza surfaces (y=0.005 to avoid z-fight with ground) ── */}
      {/* Central plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={PLAZA_MAT_COLOR} roughness={1} />
      </mesh>

      {/* North street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -30]} receiveShadow>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial color={ROAD_MAT_COLOR} roughness={1} />
      </mesh>

      {/* East street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[30, 0.005, 0]} receiveShadow>
        <planeGeometry args={[40, 12]} />
        <meshStandardMaterial color={ROAD_MAT_COLOR} roughness={1} />
      </mesh>

      {/* South street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 30]} receiveShadow>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial color={ROAD_MAT_COLOR} roughness={1} />
      </mesh>

      {/* West street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-30, 0.005, 0]} receiveShadow>
        <planeGeometry args={[40, 12]} />
        <meshStandardMaterial color={ROAD_MAT_COLOR} roughness={1} />
      </mesh>

      {/* ── Buildings ──────────────────────────────────────────────────────── */}
      {CITY_BUILDINGS.map((b) => (
        <Building key={b.id} {...b} />
      ))}

      {/* ── Lamp posts (InstancedMesh) ──────────────────────────────────── */}
      <InstancedProps />
    </group>
  )
}
