'use client'

import { Calendar } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useEvents } from '@/hooks/useContent'
import { eventsConfig } from '@/lib/admin/configs/events'

export default function Page() {
  return <ResourceFormPage config={eventsConfig} useList={useEvents} icon={Calendar} mode="create" />
}
