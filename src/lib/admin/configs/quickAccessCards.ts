import type { QuickAccessCard } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const quickAccessCardsConfig: ResourceConfig<QuickAccessCard> = {
  apiPath: 'quick-access-cards',
  label: 'Түргэн хандалтын карт',
  labelPlural: 'Түргэн хандалтын картууд',
  queryKey: ['quick-access-cards'],
  listColumns: [
    { key: 'title', label: 'Гарчиг' },
    { key: 'linkText', label: 'Холбоосын текст' },
    { key: 'isActive', label: 'Идэвхтэй' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'icon', apiKey: 'icon', label: 'Icon нэр', type: 'text', required: true, preview: 'icon' },
    { key: 'bg', apiKey: 'bg', label: 'Дэвсгэр өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'border', apiKey: 'border', label: 'Хүрээний өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'shadowColor', apiKey: 'shadow_color', label: 'Сүүдрийн өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'title', apiKey: 'title', label: 'Гарчиг', type: 'text', required: true },
    { key: 'description', apiKey: 'description', label: 'Тайлбар', type: 'textarea', required: true },
    { key: 'linkText', apiKey: 'link_text', label: 'Холбоосын текст', type: 'text', required: true },
    { key: 'href', apiKey: 'href', label: 'Холбоос (href)', type: 'text', required: true },
    { key: 'color', apiKey: 'color', label: 'Текстийн өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
    { key: 'isActive', apiKey: 'is_active', label: 'Идэвхтэй', type: 'boolean' },
  ],
  emptyValues: () => ({
    icon: '', bg: '', border: '', shadowColor: '', title: '', description: '',
    linkText: '', href: '#', color: '', order: 0, isActive: true,
  }),
}
