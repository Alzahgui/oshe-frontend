'use client'

import { useParams } from 'next/navigation'
import { Scale } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useLawDocuments } from '@/hooks/useContent'
import { lawDocumentsConfig } from '@/lib/admin/configs/lawDocuments'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={lawDocumentsConfig} useList={useLawDocuments} icon={Scale} mode="edit" id={params.id} />
}
