'use client'

import { Megaphone } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useAnnouncements } from '@/hooks/useContent'
import { announcementsConfig } from '@/lib/admin/configs/announcements'

export default function Page() {
  return <ResourceListPage config={announcementsConfig} useList={useAnnouncements} icon={Megaphone} />
}
