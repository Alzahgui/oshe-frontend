'use client'

import { Bot } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useAiFeatures } from '@/hooks/useContent'
import { aiFeaturesConfig } from '@/lib/admin/configs/aiFeatures'

export default function Page() {
  return <ResourceListPage config={aiFeaturesConfig} useList={useAiFeatures} icon={Bot} />
}
