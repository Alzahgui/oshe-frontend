import type { SafetyTrend } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const safetyTrendsConfig: ResourceConfig<SafetyTrend> = {
  apiPath: 'safety-trends',
  label: 'Ослын статистик (жилээр)',
  labelPlural: 'Ослын статистик (жилээр)',
  queryKey: ['safety-trends'],
  listColumns: [
    { key: 'year', label: 'Он' },
    { key: 'accidentRate', label: 'Ослын түвшин' },
    { key: 'nearMissRate', label: 'Ослын дөхөмдөл' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'year', apiKey: 'year', label: 'Он', type: 'number', required: true },
    { key: 'accidentRate', apiKey: 'accident_rate', label: 'Ослын түвшин (1,000 ажилчинд)', type: 'number', required: true },
    { key: 'nearMissRate', apiKey: 'near_miss_rate', label: 'Ослын дөхөмдөл (1,000 ажилчинд)', type: 'number', required: true },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({ year: new Date().getFullYear(), accidentRate: 0, nearMissRate: 0, order: 0 }),
}
