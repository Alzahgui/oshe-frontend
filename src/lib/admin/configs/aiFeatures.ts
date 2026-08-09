import type { AiFeature } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const aiFeaturesConfig: ResourceConfig<AiFeature> = {
  apiPath: 'ai-features',
  label: 'AI боломж',
  labelPlural: 'AI боломжууд',
  queryKey: ['ai-features'],
  listColumns: [
    { key: 'title', label: 'Гарчиг' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'icon', apiKey: 'icon', label: 'Icon нэр', type: 'text', required: true, preview: 'icon' },
    { key: 'title', apiKey: 'title', label: 'Гарчиг', type: 'text', required: true },
    { key: 'description', apiKey: 'description', label: 'Тайлбар', type: 'textarea', required: true },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({ icon: '', title: '', description: '', order: 0 }),
}
