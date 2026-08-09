'use client'

import { Activity } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useSafetyMetrics } from '@/hooks/useContent'
import { safetyMetricsConfig } from '@/lib/admin/configs/safetyMetrics'

export default function Page() {
  return <ResourceListPage config={safetyMetricsConfig} useList={useSafetyMetrics} icon={Activity} />
}
