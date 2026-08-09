'use client'

import { Building2 } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { usePartners } from '@/hooks/useContent'
import { partnersConfig } from '@/lib/admin/configs/partners'

export default function Page() {
  return <ResourceListPage config={partnersConfig} useList={usePartners} icon={Building2} />
}
