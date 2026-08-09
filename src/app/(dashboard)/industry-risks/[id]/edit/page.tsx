'use client'

import { useParams } from 'next/navigation'
import { TriangleAlert } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useIndustryRisks } from '@/hooks/useContent'
import { industryRisksConfig } from '@/lib/admin/configs/industryRisks'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={industryRisksConfig} useList={useIndustryRisks} icon={TriangleAlert} mode="edit" id={params.id} />
}
