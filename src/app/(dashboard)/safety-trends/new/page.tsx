'use client'

import { TrendingDown } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useSafetyTrends } from '@/hooks/useContent'
import { safetyTrendsConfig } from '@/lib/admin/configs/safetyTrends'

export default function Page() {
  return <ResourceFormPage config={safetyTrendsConfig} useList={useSafetyTrends} icon={TrendingDown} mode="create" />
}
