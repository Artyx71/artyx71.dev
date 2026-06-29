import { useAppStore } from '@/store/appStore'
import { LandingScreen } from '@/features/landing/LandingScreen'
import { LoadingScreen } from '@/features/loader/LoadingScreen'
import { SceneRoot } from '@/features/scene/SceneRoot'

export function App() {
  const appPhase = useAppStore((s) => s.appPhase)

  return (
    <>
      {appPhase === 'landing' && <LandingScreen />}
      {appPhase === 'loading' && <LoadingScreen />}
      {appPhase === 'scene' && <SceneRoot />}
    </>
  )
}
