'use client'

import { Bot } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useAiFeatures } from '@/hooks/useContent'
import { aiFeaturesConfig } from '@/lib/admin/configs/aiFeatures'

export default function Page() {
  return <ResourceFormPage config={aiFeaturesConfig} useList={useAiFeatures} icon={Bot} mode="create" />
}
