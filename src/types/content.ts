// ── src/types/content.ts ───────────────────────────────────────────────────
// Mirrors the JSON shapes returned by yosh-backend's App\Http\Resources\* classes.

export interface Announcement {
  id: number
  message: string
  linkText: string | null
  linkUrl: string | null
  isActive: boolean
  startsAt: string | null
  endsAt: string | null
  order: number
}

export interface NavMenuItem {
  id: number
  icon: string
  iconColor: string
  iconBg: string
  title: string
  desc: string
  href: string
  order: number
}

export interface NavMenu {
  id: number
  label: string
  order: number
  items: NavMenuItem[]
}

export interface HeroStat {
  id: number
  placement: 'stat_bar' | 'floating'
  icon: string | null
  iconColor: string | null
  iconBg: string | null
  iconBorder: string | null
  value: string
  label: string
  sublabel: string | null
  color: string | null
  order: number
}

export interface QuickAccessCard {
  id: number
  icon: string
  bg: string
  border: string
  shadowColor: string
  title: string
  description: string
  linkText: string
  href: string
  color: string
  order: number
  isActive: boolean
}

export interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  imageUrl: string
  tag: string
  tagColor: string
  tagBg: string
  isFeatured: boolean
  readMinutes: number | null
  publishedAt: string
  order: number
}

export type LawDocumentCategory =
  | 'national_law'
  | 'regulation'
  | 'national_standard'
  | 'international_standard'

export interface LawDocument {
  id: number
  code: string
  title: string
  description: string
  category: LawDocumentCategory
  statusLabel: string
  statusColor: string
  statusBg: string
  icon: string
  iconColor: string
  iconBg: string
  fileUrl: string | null
  downloadsCount: number
  isNew: boolean
  order: number
}

export interface SafetyMetric {
  id: number
  icon: string
  iconColor: string
  iconBg: string
  value: string
  label: string
  sublabel: string
  color: string
  order: number
}

export interface SafetyTrend {
  id: number
  year: number
  accidentRate: number
  nearMissRate: number
  order: number
}

export interface IndustryRisk {
  id: number
  label: string
  score: number
  order: number
}

export interface Event {
  id: number
  title: string
  description: string
  imageUrl: string | null
  category: string
  categoryColor: string
  categoryBg: string
  day: string
  monthLabel: string
  startDate: string
  endDate: string | null
  timeRange: string
  location: string
  isOnline: boolean
  seatsInfo: string
  price: string
  buttonColor: string
  order: number
}

export interface AiFeature {
  id: number
  icon: string
  title: string
  description: string
  order: number
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  initial: string
  avatarBg: string
  rating: number
  order: number
  isActive: boolean
}

export interface Partner {
  id: number
  flagEmoji: string
  name: string
  title: string
  order: number
  isActive: boolean
}

export interface FooterLink {
  id: number
  label: string
  href: string
  order: number
}

export interface FooterLinkGroup {
  id: number
  title: string
  order: number
  links: FooterLink[]
}

/** Flat key → value map from GET /api/site-settings. */
export type SiteSettings = Record<string, string>
