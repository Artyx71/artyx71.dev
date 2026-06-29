import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { PORTFOLIO_MAP } from '@/features/portfolio-content/portfolio.data'
import type {
  ProjectItem,
  SkillItem,
  AboutItem,
  ContactItem,
} from '@/features/portfolio-content/portfolio.types'

// ── Sub-renderers ─────────────────────────────────────────────────────────

const LEVEL_FILL: Record<SkillItem['level'], number> = {
  learning:    1,
  comfortable: 2,
  expert:      3,
}

const CHANNEL_LABEL: Record<ContactItem['channel'], string> = {
  email:    'EMAIL',
  github:   'GITHUB',
  telegram: 'TELEGRAM',
  linkedin: 'LINKEDIN',
}

function contactHref(item: ContactItem): string {
  return item.channel === 'email' ? `mailto:${item.value}` : item.value
}

function SkillLevel({ item }: { item: SkillItem }) {
  const filled = LEVEL_FILL[item.level]
  return (
    <div className="flex items-center gap-3" style={{ color: item.accentColor }}>
      <div className="flex gap-1">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-2 w-8 rounded-sm"
            style={{ backgroundColor: n <= filled ? item.accentColor : '#1a1a2e' }}
          />
        ))}
      </div>
      <span className="text-xs tracking-widest">{item.level.toUpperCase()}</span>
    </div>
  )
}

function LinkBtn({
  href,
  label,
  accent,
}: {
  href: string
  label: string
  accent: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border px-4 py-2 text-xs tracking-widest opacity-70 transition-opacity hover:opacity-100"
      style={{ borderColor: `${accent}60`, color: accent }}
    >
      {label}
    </a>
  )
}

function ProjectContent({ item }: { item: ProjectItem }) {
  return (
    <>
      <p className="text-sm leading-relaxed opacity-75">{item.description}</p>

      {item.stack.length > 0 && (
        <div>
          <div className="mb-2 text-xs tracking-widest opacity-40">STACK</div>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm border px-2 py-0.5 text-xs"
                style={{ borderColor: `${item.accentColor}40`, color: item.accentColor }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {(item.githubUrl || item.demoUrl) && (
        <div className="flex gap-3">
          {item.githubUrl && (
            <LinkBtn href={item.githubUrl} label="[ GITHUB ]" accent={item.accentColor} />
          )}
          {item.demoUrl && (
            <LinkBtn href={item.demoUrl} label="[ DEMO ]" accent={item.accentColor} />
          )}
        </div>
      )}
    </>
  )
}

function SkillContent({ item }: { item: SkillItem }) {
  return (
    <>
      <SkillLevel item={item} />
      {item.description && (
        <p className="text-sm leading-relaxed opacity-75">{item.description}</p>
      )}
    </>
  )
}

function AboutContent({ item }: { item: AboutItem }) {
  return (
    <>
      <p className="text-sm leading-relaxed opacity-75">{item.bio}</p>
      {item.resumeUrl && (
        <LinkBtn href={item.resumeUrl} label="[ RESUME ]" accent={item.accentColor} />
      )}
    </>
  )
}

function ContactContent({ item }: { item: ContactItem }) {
  return (
    <>
      <div className="text-xs tracking-widest opacity-40">
        {CHANNEL_LABEL[item.channel]}
      </div>
      <a
        href={contactHref(item)}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-lg opacity-80 transition-opacity hover:opacity-100"
        style={{ color: item.accentColor }}
      >
        {item.value}
      </a>
    </>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────

export function ProjectModal() {
  const { modalOpen, activeContentId, closeModal } = useUIStore()

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeModal])

  if (!modalOpen || !activeContentId) return null

  const item = PORTFOLIO_MAP.get(activeContentId)
  if (!item) return null

  const typeTag = item.type.replace('-', ' ').toUpperCase()

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div
        className="relative mx-4 w-full max-w-lg border bg-[#09090f] font-mono"
        style={{ borderColor: `${item.accentColor}50` }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between border-b px-6 py-3"
          style={{ borderColor: `${item.accentColor}25` }}
        >
          <span className="text-xs tracking-widest opacity-50">[ {typeTag} ]</span>
          <button
            onClick={closeModal}
            className="text-xs tracking-widest opacity-40 transition-opacity hover:opacity-100"
            style={{ color: item.accentColor }}
          >
            [ ESC ] ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-6">
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: item.accentColor }}
          >
            {item.title}
          </h2>

          {item.type === 'project' && <ProjectContent item={item} />}
          {item.type === 'skill'   && <SkillContent   item={item} />}
          {item.type === 'about'   && <AboutContent   item={item} />}
          {item.type === 'contact' && <ContactContent item={item} />}
        </div>
      </div>
    </div>
  )
}
