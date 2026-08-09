'use client'

import { Award } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useHeroStats } from '@/hooks/useContent'
import { heroStatsConfig } from '@/lib/admin/configs/heroStats'

export default function Page() {
  return <ResourceFormPage config={heroStatsConfig} useList={useHeroStats} icon={Award} mode="create" />
}
