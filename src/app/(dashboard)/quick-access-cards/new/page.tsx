'use client'

import { Target } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useQuickAccessCards } from '@/hooks/useContent'
import { quickAccessCardsConfig } from '@/lib/admin/configs/quickAccessCards'

export default function Page() {
  return <ResourceFormPage config={quickAccessCardsConfig} useList={useQuickAccessCards} icon={Target} mode="create" />
}
