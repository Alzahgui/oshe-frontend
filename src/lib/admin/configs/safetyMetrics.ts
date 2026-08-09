import type { SafetyMetric } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const safetyMetricsConfig: ResourceConfig<SafetyMetric> = {
  apiPath: 'safety-metrics',
  label: 'Статистикийн үзүүлэлт',
  labelPlural: 'Статистикийн үзүүлэлтүүд',
  queryKey: ['safety-metrics'],
  listColumns: [
    { key: 'label', label: 'Шошго' },
    { key: 'value', label: 'Утга' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'icon', apiKey: 'icon', label: 'Icon нэр', type: 'text', required: true, preview: 'icon' },
    { key: 'iconColor', apiKey: 'icon_color', label: 'Icon өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'iconBg', apiKey: 'icon_bg', label: 'Icon дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'value', apiKey: 'value', label: 'Утга', type: 'text', required: true },
    { key: 'label', apiKey: 'label', label: 'Шошго', type: 'text', required: true },
    { key: 'sublabel', apiKey: 'sublabel', label: 'Дэд шошго', type: 'text', required: true },
    { key: 'color', apiKey: 'color', label: 'Өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    icon: '', iconColor: '', iconBg: '', value: '', label: '', sublabel: '', color: '', order: 0,
  }),
}
