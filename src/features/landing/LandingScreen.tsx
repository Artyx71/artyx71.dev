import { useAppStore } from '@/store/appStore'

export function LandingScreen() {
  const setAppPhase = useAppStore((s) => s.setAppPhase)

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center bg-[#06060a] font-mono overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg,transparent,transparent 39px,#0d0d18 39px,#0d0d18 40px),' +
          'repeating-linear-gradient(90deg,transparent,transparent 39px,#0d0d18 39px,#0d0d18 40px)',
      }}
    >
      {/* Corner decorations */}
      <span className="pointer-events-none absolute left-6 top-6 select-none text-lg text-[#a3e635]/20">┌</span>
      <span className="pointer-events-none absolute right-6 top-6 select-none text-lg text-[#a3e635]/20">┐</span>
      <span className="pointer-events-none absolute left-6 bottom-6 select-none text-lg text-[#a3e635]/20">└</span>
      <span className="pointer-events-none absolute right-6 bottom-6 select-none text-lg text-[#a3e635]/20">┘</span>

      {/* Domain tag */}
      <p className="mb-12 text-[10px] uppercase tracking-[0.3em] text-[#a3e635]/40">
        artyx71.dev
      </p>

      {/* Name */}
      <h1 className="mb-2 text-5xl font-bold uppercase tracking-[0.15em] text-white">
        Andrew Gabaraev
      </h1>

      {/* Role */}
      <p className="mb-14 text-xs uppercase tracking-[0.4em] text-white/30">
        Frontend Developer
      </p>

      {/* CTA */}
      <button
        onClick={() => setAppPhase('loading')}
        className="border border-[#a3e635]/50 px-10 py-3 text-xs uppercase tracking-[0.35em] text-[#a3e635] transition-all duration-300 hover:border-[#a3e635] hover:bg-[#a3e635]/10 hover:shadow-[0_0_24px_#a3e63530]"
      >
        Начать путешествие
      </button>

      {/* Bottom hint */}
      <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] text-white/15">
        3D · Interactive · WASD
      </p>
    </div>
  )
}
