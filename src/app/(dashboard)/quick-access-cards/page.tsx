'use client'

import { Target } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useQuickAccessCards } from '@/hooks/useContent'
import { quickAccessCardsConfig } from '@/lib/admin/configs/quickAccessCards'

export default function Page() {
  return <ResourceListPage config={quickAccessCardsConfig} useList={useQuickAccessCards} icon={Target} />
}
