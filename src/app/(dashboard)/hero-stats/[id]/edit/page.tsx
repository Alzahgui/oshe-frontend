'use client'

import { useParams } from 'next/navigation'
import { Award } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useHeroStats } from '@/hooks/useContent'
import { heroStatsConfig } from '@/lib/admin/configs/heroStats'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={heroStatsConfig} useList={useHeroStats} icon={Award} mode="edit" id={params.id} />
}
