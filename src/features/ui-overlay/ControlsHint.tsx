import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'

const AUTO_DISMISS_MS = 7000

const HINTS = [
  { key: 'WASD',  action: 'move'     },
  { key: 'MOUSE', action: 'camera'   },
  { key: 'E',     action: 'interact' },
]

export function ControlsHint() {
  const { controlsHintDismissed, dismissControlsHint } = useUIStore()

  useEffect(() => {
    if (controlsHintDismissed) return

    const timer = setTimeout(dismissControlsHint, AUTO_DISMISS_MS)
    const onKey = () => dismissControlsHint()

    window.addEventListener('keydown', onKey, { once: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [controlsHintDismissed, dismissControlsHint])

  if (controlsHintDismissed) return null

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center font-mono">
      <div className="flex items-center gap-8">
        {HINTS.map(({ key, action }) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <span className="border border-white/20 px-2 py-0.5 text-white/50 tracking-widest">
              {key}
            </span>
            <span className="text-white/25 tracking-widest">{action}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] tracking-widest text-white/20">
        click to lock pointer
      </div>
    </div>
  )
}
