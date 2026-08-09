'use client'

import { Star } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useTestimonials } from '@/hooks/useContent'
import { testimonialsConfig } from '@/lib/admin/configs/testimonials'

export default function Page() {
  return <ResourceFormPage config={testimonialsConfig} useList={useTestimonials} icon={Star} mode="create" />
}
