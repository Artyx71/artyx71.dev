import type { PortfolioItem } from './portfolio.types'

// ── Pet Projects (East street, cyan #22d3ee) ──────────────────────────────
// Corridor z∈[-6,6], accessible from x≈14 onwards

const PET_PROJECTS: PortfolioItem[] = [
  {
    id:          'artyx71-dev',
    type:        'project',
    title:       'artyx71.dev',
    position:    [20, 0, -3],
    accentColor: '#22d3ee',
    description: '3D portfolio built as a walkable city. Explore zones on WASD, interact with terminals to read about projects and skills.',
    stack:       ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'Zustand', 'Tailwind', 'Vite'],
    githubUrl:   'https://github.com/artyx71/artyx71.dev',
    demoUrl:     'https://artyx71.dev',
  },
  {
    id:          'livestylesync',
    type:        'project',
    title:       'LiveStyleSync',
    position:    [30, 0, 3],
    accentColor: '#22d3ee',
    description: 'Browser devtools extension for live-syncing CSS custom properties between tabs and design tools. Edit once — update everywhere.',
    stack:       ['TypeScript', 'Chrome Extension API', 'CSS Custom Properties'],
    githubUrl:   'https://github.com/artyx71/livestylesync',
  },
]

// ── Work Projects (North street, lime #a3e635) ────────────────────────────
// Corridor x∈[-6,6], accessible from z≈-14 onwards

const WORK_PROJECTS: PortfolioItem[] = [
  {
    id:          'work-1',
    type:        'project',
    title:       'Work Project 1',
    position:    [3, 0, -22],
    accentColor: '#a3e635',
    description: 'TODO: Add description',
    stack:       ['React', 'TypeScript'],
  },
  {
    id:          'work-2',
    type:        'project',
    title:       'Work Project 2',
    position:    [-3, 0, -32],
    accentColor: '#a3e635',
    description: 'TODO: Add description',
    stack:       ['React', 'TypeScript'],
  },
]

// ── Skills (East street dead end, violet #a78bfa) ─────────────────────────
// Zone trigger at (42,0,0), buildings flank z=±12 from x=36

const SKILLS: PortfolioItem[] = [
  {
    id:          'skill-frontend',
    type:        'skill',
    title:       'Frontend',
    position:    [40, 0, -3],
    accentColor: '#a78bfa',
    skillName:   'Frontend / React ecosystem',
    level:       'expert',
    description: 'React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Query',
  },
  {
    id:          'skill-3d',
    type:        'skill',
    title:       '3D / WebGL',
    position:    [40, 0, 3],
    accentColor: '#a78bfa',
    skillName:   '3D / WebGL',
    level:       'comfortable',
    description: 'Three.js, React Three Fiber, @react-three/drei, GLSL shaders basics',
  },
  {
    id:          'skill-tooling',
    type:        'skill',
    title:       'Dev Tooling',
    position:    [36, 0, -3],
    accentColor: '#a78bfa',
    skillName:   'Dev Tooling',
    level:       'comfortable',
    description: 'Neovim, tmux, Git, Linux, zsh — keyboard-driven workflow',
  },
]

// ── About (South street, amber #fbbf24) ───────────────────────────────────
// Corridor x∈[-6,6], accessible from z≈14 onwards

const ABOUT: PortfolioItem[] = [
  {
    id:          'about-me',
    type:        'about',
    title:       'Andrew Gabaraev',
    position:    [0, 0, 22],
    accentColor: '#fbbf24',
    bio:         'Frontend developer focused on interactive experiences. I build things that move — from complex UIs to 3D worlds in the browser. Currently exploring the space between game dev and web dev.',
  },
]

// ── Contacts (West street, magenta #f472b6) ───────────────────────────────
// Corridor z∈[-6,6], accessible from x≈-14 onwards

const CONTACTS: PortfolioItem[] = [
  {
    id:          'contact-email',
    type:        'contact',
    title:       'Email',
    position:    [-22, 0, -3],
    accentColor: '#f472b6',
    channel:     'email',
    value:       'androgabar@gmail.com',
  },
  {
    id:          'contact-github',
    type:        'contact',
    title:       'GitHub',
    position:    [-22, 0, 3],
    accentColor: '#f472b6',
    channel:     'github',
    value:       'https://github.com/artyx71',
  },
  {
    id:          'contact-telegram',
    type:        'contact',
    title:       'Telegram',
    position:    [-30, 0, -3],
    accentColor: '#f472b6',
    channel:     'telegram',
    value:       '@artyx71',
  },
]

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  ...PET_PROJECTS,
  ...WORK_PROJECTS,
  ...SKILLS,
  ...ABOUT,
  ...CONTACTS,
]

export const PORTFOLIO_MAP = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item]))
