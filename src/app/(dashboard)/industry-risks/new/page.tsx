'use client'

import { TriangleAlert } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useIndustryRisks } from '@/hooks/useContent'
import { industryRisksConfig } from '@/lib/admin/configs/industryRisks'

export default function Page() {
  return <ResourceFormPage config={industryRisksConfig} useList={useIndustryRisks} icon={TriangleAlert} mode="create" />
}
