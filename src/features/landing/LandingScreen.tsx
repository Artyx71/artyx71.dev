import { useAppStore } from '@/store/appStore'

export function LandingScreen() {
  const setAppPhase = useAppStore((s) => s.setAppPhase)

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-2 font-mono text-4xl font-bold tracking-tight text-white">
        Andrew Gabaraev
      </h1>
      <p className="mb-12 font-mono text-sm text-gray-400">
        Software Engineer
      </p>
      <button
        onClick={() => setAppPhase('loading')}
        className="rounded border border-[#a3e635] px-6 py-3 font-mono text-sm text-[#a3e635] transition-colors hover:bg-[#a3e635] hover:text-black"
      >
        Начать путешествие
      </button>
    </div>
  )
}
