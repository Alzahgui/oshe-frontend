'use client'

import { useParams } from 'next/navigation'
import { Megaphone } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useAnnouncements } from '@/hooks/useContent'
import { announcementsConfig } from '@/lib/admin/configs/announcements'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={announcementsConfig} useList={useAnnouncements} icon={Megaphone} mode="edit" id={params.id} />
}
