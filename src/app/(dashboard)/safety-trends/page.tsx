'use client'

import { TrendingDown } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useSafetyTrends } from '@/hooks/useContent'
import { safetyTrendsConfig } from '@/lib/admin/configs/safetyTrends'

export default function Page() {
  return <ResourceListPage config={safetyTrendsConfig} useList={useSafetyTrends} icon={TrendingDown} />
}
