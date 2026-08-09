'use client'

import { useParams } from 'next/navigation'
import { Activity } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useSafetyMetrics } from '@/hooks/useContent'
import { safetyMetricsConfig } from '@/lib/admin/configs/safetyMetrics'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={safetyMetricsConfig} useList={useSafetyMetrics} icon={Activity} mode="edit" id={params.id} />
}
