// ── src/hooks/useContent.ts ────────────────────────────────────────────────
// Read-only React Query hooks over yosh-backend's public content endpoints.

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type {
  AiFeature,
  Announcement,
  Event,
  FooterLinkGroup,
  HeroStat,
  IndustryRisk,
  LawDocument,
  LawDocumentCategory,
  NavMenu,
  NewsArticle,
  Partner,
  QuickAccessCard,
  SafetyMetric,
  SafetyTrend,
  SiteSettings,
  Testimonial,
} from '@/types/content'

function fetchList<T>(url: string, params?: Record<string, string | boolean | undefined>) {
  return api.get<{ data: T[] }>(url, { params }).then((r) => r.data.data)
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => fetchList<Announcement>('/api/announcements'),
  })
}

export function useNavMenus() {
  return useQuery({
    queryKey: ['nav-menus'],
    queryFn: () => fetchList<NavMenu>('/api/nav-menus'),
  })
}

export function useHeroStats(placement?: 'stat_bar' | 'floating') {
  return useQuery({
    queryKey: ['hero-stats', placement],
    queryFn: () => fetchList<HeroStat>('/api/hero-stats', placement ? { placement } : undefined),
  })
}

export function useQuickAccessCards() {
  return useQuery({
    queryKey: ['quick-access-cards'],
    queryFn: () => fetchList<QuickAccessCard>('/api/quick-access-cards'),
  })
}

export function useNewsArticles() {
  return useQuery({
    queryKey: ['news-articles'],
    queryFn: () => fetchList<NewsArticle>('/api/news-articles'),
  })
}

export function useLawDocuments(params: { category?: LawDocumentCategory; q?: string } = {}) {
  return useQuery({
    queryKey: ['law-documents', params.category, params.q],
    queryFn: () => fetchList<LawDocument>('/api/law-documents', params),
  })
}

export function useSafetyMetrics() {
  return useQuery({
    queryKey: ['safety-metrics'],
    queryFn: () => fetchList<SafetyMetric>('/api/safety-metrics'),
  })
}

export function useSafetyTrends() {
  return useQuery({
    queryKey: ['safety-trends'],
    queryFn: () => fetchList<SafetyTrend>('/api/safety-trends'),
  })
}

export function useIndustryRisks() {
  return useQuery({
    queryKey: ['industry-risks'],
    queryFn: () => fetchList<IndustryRisk>('/api/industry-risks'),
  })
}

export function useEvents(params?: { upcoming?: boolean }) {
  return useQuery({
    queryKey: ['events', params?.upcoming],
    queryFn: () => fetchList<Event>('/api/events', params),
  })
}

export function useAiFeatures() {
  return useQuery({
    queryKey: ['ai-features'],
    queryFn: () => fetchList<AiFeature>('/api/ai-features'),
  })
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => fetchList<Testimonial>('/api/testimonials'),
  })
}

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => fetchList<Partner>('/api/partners'),
  })
}

export function useFooterLinkGroups() {
  return useQuery({
    queryKey: ['footer-link-groups'],
    queryFn: () => fetchList<FooterLinkGroup>('/api/footer-link-groups'),
  })
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: () => api.get<SiteSettings>('/api/site-settings').then((r) => r.data),
  })
}
