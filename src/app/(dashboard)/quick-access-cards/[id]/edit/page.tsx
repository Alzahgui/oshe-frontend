'use client'

import { useParams } from 'next/navigation'
import { Target } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useQuickAccessCards } from '@/hooks/useContent'
import { quickAccessCardsConfig } from '@/lib/admin/configs/quickAccessCards'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={quickAccessCardsConfig} useList={useQuickAccessCards} icon={Target} mode="edit" id={params.id} />
}
