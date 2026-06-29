export type PortfolioItemType = 'project' | 'skill' | 'about' | 'contact'

interface BasePortfolioItem {
  id:          string
  type:        PortfolioItemType
  title:       string
  position:    [number, number, number]
  accentColor: string
}

export interface ProjectItem extends BasePortfolioItem {
  type:          'project'
  description:   string
  stack:         string[]
  githubUrl?:    string
  demoUrl?:      string
  previewImage?: string
}

export interface SkillItem extends BasePortfolioItem {
  type:         'skill'
  skillName:    string
  level:        'learning' | 'comfortable' | 'expert'
  description?: string
}

export interface AboutItem extends BasePortfolioItem {
  type:       'about'
  bio:        string
  resumeUrl?: string
}

export interface ContactItem extends BasePortfolioItem {
  type:    'contact'
  channel: 'email' | 'github' | 'telegram' | 'linkedin'
  value:   string
}

export type PortfolioItem = ProjectItem | SkillItem | AboutItem | ContactItem
