import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { InputProvider } from '@/features/input/InputProvider'
import { Player } from '@/features/player/Player'
import { FollowCamera } from '@/features/camera/FollowCamera'

export function SceneRoot() {
  const playerGroupRef = useRef<THREE.Group>(null)
  const cameraYawRef   = useRef(0)

  return (
    <div className="h-screen w-screen bg-black">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 4, 8] }}
        shadows
      >
        {/* Ambient + directional for basic visibility */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={0.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <fog attach="fog" args={['#0a0a12', 20, 80]} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#0d0d14" roughness={1} />
        </mesh>

        <Suspense fallback={null}>
          <InputProvider>
            <Player groupRef={playerGroupRef} cameraYawRef={cameraYawRef} />
            <FollowCamera target={playerGroupRef} cameraYawRef={cameraYawRef} />
          </InputProvider>
        </Suspense>
      </Canvas>
    </div>
  )
}
