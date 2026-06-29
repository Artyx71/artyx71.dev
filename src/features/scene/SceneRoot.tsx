import { useRef, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { InputProvider } from '@/features/input/InputProvider'
import { Player } from '@/features/player/Player'
import { FollowCamera } from '@/features/camera/FollowCamera'
import { City } from '@/features/world/City'
import { ZoneTrigger } from '@/features/zones/ZoneTrigger'
import { ZoneLabel } from '@/features/zones/ZoneLabel'
import { ZONES } from '@/features/zones/zones.config'
import { InteractionSystem } from '@/features/interactions/InteractionSystem'
import { InteractableObject } from '@/features/interactions/InteractableObject'
import { INTERACTABLES } from '@/features/interactions/interactables.config'
import { useUIStore } from '@/store/uiStore'

function ModalPlaceholder() {
  const { modalOpen, activeContentId, closeModal } = useUIStore()

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeModal])

  if (!modalOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="border border-lime-400/40 bg-[#0d0d14] p-8 text-lime-400 font-mono max-w-md w-full mx-4">
        <div className="text-xs tracking-widest mb-4 text-lime-400/60">[ TERMINAL ]</div>
        <div className="text-lg mb-6">{activeContentId}</div>
        <div className="text-xs text-lime-400/40">Content loads in TASK-14</div>
        <button
          onClick={closeModal}
          className="mt-6 text-xs tracking-widest text-lime-400/60 hover:text-lime-400 border border-lime-400/20 hover:border-lime-400/60 px-4 py-2 transition-colors"
        >
          [ ESC ] CLOSE
        </button>
      </div>
    </div>
  )
}

export function SceneRoot() {
  const playerGroupRef = useRef<THREE.Group>(null)
  const cameraYawRef   = useRef(0)

  return (
    <div className="relative h-screen w-screen bg-black">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 4, 8] }}
        shadows
      >
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
          <City />

          {ZONES.map((zone) => (
            <ZoneTrigger key={zone.id} zone={zone} playerRef={playerGroupRef} />
          ))}
          {ZONES.map((zone) => (
            <ZoneLabel key={zone.id} zone={zone} />
          ))}

          {INTERACTABLES.map((obj) => (
            <InteractableObject key={obj.id} interactable={obj} playerRef={playerGroupRef} />
          ))}

          <InputProvider>
            <Player groupRef={playerGroupRef} cameraYawRef={cameraYawRef} />
            <FollowCamera target={playerGroupRef} cameraYawRef={cameraYawRef} />
            <InteractionSystem interactables={INTERACTABLES} playerRef={playerGroupRef} />
          </InputProvider>
        </Suspense>
      </Canvas>

      <ModalPlaceholder />
    </div>
  )
}
