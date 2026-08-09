'use client'

import { useParams } from 'next/navigation'
import { TrendingDown } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useSafetyTrends } from '@/hooks/useContent'
import { safetyTrendsConfig } from '@/lib/admin/configs/safetyTrends'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={safetyTrendsConfig} useList={useSafetyTrends} icon={TrendingDown} mode="edit" id={params.id} />
}
