'use client'

import { useParams } from 'next/navigation'
import { Building2 } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { usePartners } from '@/hooks/useContent'
import { partnersConfig } from '@/lib/admin/configs/partners'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={partnersConfig} useList={usePartners} icon={Building2} mode="edit" id={params.id} />
}
