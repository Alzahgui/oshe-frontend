'use client'

import { Newspaper } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { useNewsArticles } from '@/hooks/useContent'
import { newsArticlesConfig } from '@/lib/admin/configs/newsArticles'

export default function Page() {
  return <ResourceFormPage config={newsArticlesConfig} useList={useNewsArticles} icon={Newspaper} mode="create" />
}
