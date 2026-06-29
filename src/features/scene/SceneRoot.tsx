import { Canvas } from '@react-three/fiber'

export function SceneRoot() {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas camera={{ fov: 60, near: 0.1, far: 500 }}>
        <ambientLight intensity={0.3} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#a3e635" />
        </mesh>
      </Canvas>
    </div>
  )
}
