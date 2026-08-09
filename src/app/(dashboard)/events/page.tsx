'use client'

import { Calendar } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useEvents } from '@/hooks/useContent'
import { eventsConfig } from '@/lib/admin/configs/events'

export default function Page() {
  return <ResourceListPage config={eventsConfig} useList={useEvents} icon={Calendar} />
}
