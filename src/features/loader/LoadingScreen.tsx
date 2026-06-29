import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

export function LoadingScreen() {
  const setAppPhase = useAppStore((s) => s.setAppPhase)

  // Placeholder: переходим сразу в scene пока нет реальной загрузки ассетов
  useEffect(() => {
    const t = setTimeout(() => setAppPhase('scene'), 500)
    return () => clearTimeout(t)
  }, [setAppPhase])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <div className="mb-4 font-mono text-xs text-gray-500">Загрузка...</div>
      <div className="h-px w-48 bg-gray-800">
        <div className="h-full w-full animate-pulse bg-[#a3e635]" />
      </div>
    </div>
  )
}
