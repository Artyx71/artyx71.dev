import { useZoneStore } from '@/store/zoneStore'
import { ZONES } from '@/features/zones/zones.config'

export function HUD() {
  const currentZone = useZoneStore((s) => s.currentZone)
  const zone        = ZONES.find((z) => z.id === currentZone)

  return (
    <div className="pointer-events-none absolute inset-0 font-mono">
      {/* Zone indicator — top-right */}
      <div
        className="absolute right-6 top-6 text-xs tracking-widest transition-all duration-700"
        style={{
          color:   zone?.theme.accentColor ?? 'transparent',
          opacity: zone ? 1 : 0,
        }}
      >
        [ {zone?.label} ]
      </div>
    </div>
  )
}
