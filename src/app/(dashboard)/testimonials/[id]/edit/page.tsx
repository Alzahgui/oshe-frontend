'use client'

import { useParams } from 'next/navigation'
import { Star } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useTestimonials } from '@/hooks/useContent'
import { testimonialsConfig } from '@/lib/admin/configs/testimonials'

export default function Page() {
  const params = useParams<{ id: string }>()
  return <ResourceFormPage config={testimonialsConfig} useList={useTestimonials} icon={Star} mode="edit" id={params.id} />
}
