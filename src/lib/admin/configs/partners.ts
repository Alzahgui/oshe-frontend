import type { Partner } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const partnersConfig: ResourceConfig<Partner> = {
  apiPath: 'partners',
  label: 'Түнш байгууллага',
  labelPlural: 'Түнш байгууллагууд',
  queryKey: ['partners'],
  listColumns: [
    { key: 'name', label: 'Нэр' },
    { key: 'title', label: 'Тайлбар' },
    { key: 'isActive', label: 'Идэвхтэй' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'flagEmoji', apiKey: 'flag_emoji', label: 'Emoji/туг', type: 'text', required: true },
    { key: 'name', apiKey: 'name', label: 'Нэр', type: 'text', required: true },
    { key: 'title', apiKey: 'title', label: 'Тайлбар', type: 'text', required: true },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
    { key: 'isActive', apiKey: 'is_active', label: 'Идэвхтэй', type: 'boolean' },
  ],
  emptyValues: () => ({ flagEmoji: '', name: '', title: '', order: 0, isActive: true }),
}
