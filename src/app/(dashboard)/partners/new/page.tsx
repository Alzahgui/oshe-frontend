'use client'

import { Building2 } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { usePartners } from '@/hooks/useContent'
import { partnersConfig } from '@/lib/admin/configs/partners'

export default function Page() {
  return <ResourceFormPage config={partnersConfig} useList={usePartners} icon={Building2} mode="create" />
}
