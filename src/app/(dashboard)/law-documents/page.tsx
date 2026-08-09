'use client'

import { Scale } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useLawDocuments } from '@/hooks/useContent'
import { lawDocumentsConfig } from '@/lib/admin/configs/lawDocuments'

export default function Page() {
  return <ResourceListPage config={lawDocumentsConfig} useList={useLawDocuments} icon={Scale} />
}
