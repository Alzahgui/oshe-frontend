'use client'

import { Activity } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useSafetyMetrics } from '@/hooks/useContent'
import { safetyMetricsConfig } from '@/lib/admin/configs/safetyMetrics'

export default function Page() {
  return <ResourceFormPage config={safetyMetricsConfig} useList={useSafetyMetrics} icon={Activity} mode="create" />
}
