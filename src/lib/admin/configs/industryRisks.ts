import type { IndustryRisk } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const industryRisksConfig: ResourceConfig<IndustryRisk> = {
  apiPath: 'industry-risks',
  label: 'Салбарын эрсдэл',
  labelPlural: 'Салбарын эрсдэлүүд',
  queryKey: ['industry-risks'],
  listColumns: [
    { key: 'label', label: 'Салбар' },
    { key: 'score', label: 'Оноо (0-100)' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'label', apiKey: 'label', label: 'Салбар', type: 'text', required: true },
    { key: 'score', apiKey: 'score', label: 'Эрсдэлийн оноо (0-100)', type: 'number', required: true },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({ label: '', score: 0, order: 0 }),
}
