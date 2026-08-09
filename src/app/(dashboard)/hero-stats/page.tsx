'use client'

import { Award } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useHeroStats } from '@/hooks/useContent'
import { heroStatsConfig } from '@/lib/admin/configs/heroStats'

export default function Page() {
  return <ResourceListPage config={heroStatsConfig} useList={useHeroStats} icon={Award} />
}
