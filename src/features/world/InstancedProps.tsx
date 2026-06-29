import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { LAMP_POSITIONS } from './city.config'

const POLE_HEIGHT = 4
const LAMP_COLOR  = '#a3e635'

const _dummy = new THREE.Object3D()

export function InstancedProps() {
  const poleRef = useRef<THREE.InstancedMesh | null>(null)
  const headRef = useRef<THREE.InstancedMesh | null>(null)
  const count   = LAMP_POSITIONS.length

  useEffect(() => {
    LAMP_POSITIONS.forEach(([x, _y, z], i) => {
      _dummy.position.set(x, POLE_HEIGHT / 2, z)
      _dummy.updateMatrix()
      poleRef.current?.setMatrixAt(i, _dummy.matrix)

      _dummy.position.set(x, POLE_HEIGHT + 0.25, z)
      _dummy.updateMatrix()
      headRef.current?.setMatrixAt(i, _dummy.matrix)
    })
    if (poleRef.current) poleRef.current.instanceMatrix.needsUpdate = true
    if (headRef.current) headRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <>
      <instancedMesh ref={poleRef} args={[undefined, undefined, count]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, POLE_HEIGHT, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </instancedMesh>

      <instancedMesh ref={headRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial
          color="#fff"
          emissive={LAMP_COLOR}
          emissiveIntensity={3}
        />
      </instancedMesh>
    </>
  )
}
