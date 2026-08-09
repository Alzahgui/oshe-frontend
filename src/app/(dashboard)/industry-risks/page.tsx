'use client'

import { TriangleAlert } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useIndustryRisks } from '@/hooks/useContent'
import { industryRisksConfig } from '@/lib/admin/configs/industryRisks'

export default function Page() {
  return <ResourceListPage config={industryRisksConfig} useList={useIndustryRisks} icon={TriangleAlert} />
}
