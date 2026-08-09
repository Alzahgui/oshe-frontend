'use client'

import { Megaphone } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useAnnouncements } from '@/hooks/useContent'
import { announcementsConfig } from '@/lib/admin/configs/announcements'

export default function Page() {
  return <ResourceFormPage config={announcementsConfig} useList={useAnnouncements} icon={Megaphone} mode="create" />
}
