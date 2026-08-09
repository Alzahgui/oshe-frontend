'use client'

import { Newspaper } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { useNewsArticles } from '@/hooks/useContent'
import { newsArticlesConfig } from '@/lib/admin/configs/newsArticles'

export default function Page() {
  return <ResourceListPage config={newsArticlesConfig} useList={useNewsArticles} icon={Newspaper} />
}
