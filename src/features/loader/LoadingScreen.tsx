import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { useAppStore } from '@/store/appStore'

const MIN_DISPLAY_MS = 1200

export function LoadingScreen() {
  const setAppPhase                = useAppStore((s) => s.setAppPhase)
  const { progress, active, errors } = useProgress()
  const [minElapsed, setMinElapsed]  = useState(false)

  // Enforce minimum display time so the screen doesn't flash by instantly
  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), MIN_DISPLAY_MS)
    return () => clearTimeout(t)
  }, [])

  // Transition once min time has passed AND loading is no longer active
  useEffect(() => {
    if (minElapsed && !active) setAppPhase('scene')
  }, [minElapsed, active, setAppPhase])

  const displayProgress = active ? Math.round(progress) : 100

  if (errors.length > 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#06060a] font-mono">
        <p className="mb-4 text-xs uppercase tracking-widest text-red-400/70">
          Failed to load assets
        </p>
        <button
          onClick={() => setAppPhase('scene')}
          className="border border-red-400/30 px-6 py-2 text-xs uppercase tracking-widest text-red-400/60 hover:border-red-400/60 transition-colors"
        >
          Continue anyway
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#06060a] font-mono">
      <p className="mb-8 text-[10px] uppercase tracking-[0.4em] text-white/20">
        Loading
      </p>

      {/* Progress bar */}
      <div className="relative h-px w-64 bg-white/5">
        <div
          className="absolute inset-y-0 left-0 bg-[#a3e635] transition-all duration-300"
          style={{ width: `${displayProgress}%` }}
        />
        {/* Glow */}
        <div
          className="absolute inset-y-0 left-0 blur-sm bg-[#a3e635]/50 transition-all duration-300"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <p className="mt-4 text-[10px] tabular-nums tracking-widest text-[#a3e635]/50">
        {displayProgress}%
      </p>
    </div>
  )
}
