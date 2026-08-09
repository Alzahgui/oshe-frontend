'use client'

import { Star } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useTestimonials } from '@/hooks/useContent'
import { testimonialsConfig } from '@/lib/admin/configs/testimonials'

export default function Page() {
  return <ResourceListPage config={testimonialsConfig} useList={useTestimonials} icon={Star} />
}
