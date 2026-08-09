import type { NewsArticle } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const newsArticlesConfig: ResourceConfig<NewsArticle> = {
  apiPath: 'news-articles',
  label: 'Мэдээ',
  labelPlural: 'Мэдээнүүд',
  queryKey: ['news-articles'],
  listColumns: [
    { key: 'title', label: 'Гарчиг' },
    { key: 'tag', label: 'Таг' },
    { key: 'isFeatured', label: 'Онцлох' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'title', apiKey: 'title', label: 'Гарчиг', type: 'text', required: true },
    { key: 'slug', apiKey: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'excerpt', apiKey: 'excerpt', label: 'Товч агуулга', type: 'textarea', required: true },
    { key: 'imageUrl', apiKey: 'image_url', label: 'Зургийн URL', type: 'text', required: true },
    { key: 'tag', apiKey: 'tag', label: 'Таг', type: 'text', required: true },
    { key: 'tagColor', apiKey: 'tag_color', label: 'Тагийн өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'tagBg', apiKey: 'tag_bg', label: 'Тагийн дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'isFeatured', apiKey: 'is_featured', label: 'Онцлох мэдээ', type: 'boolean' },
    { key: 'readMinutes', apiKey: 'read_minutes', label: 'Унших хугацаа (мин)', type: 'number', required: false },
    { key: 'publishedAt', apiKey: 'published_at', label: 'Нийтэлсэн огноо (YYYY-MM-DD)', type: 'text', required: true },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    title: '', slug: '', excerpt: '', imageUrl: '', tag: '', tagColor: '', tagBg: '',
    isFeatured: false, readMinutes: null, publishedAt: '', order: 0,
  }),
}
