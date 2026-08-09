import type { Testimonial } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const testimonialsConfig: ResourceConfig<Testimonial> = {
  apiPath: 'testimonials',
  label: 'Сэтгэгдэл',
  labelPlural: 'Сэтгэгдлүүд',
  queryKey: ['testimonials'],
  listColumns: [
    { key: 'name', label: 'Нэр' },
    { key: 'role', label: 'Албан тушаал' },
    { key: 'rating', label: 'Үнэлгээ' },
    { key: 'isActive', label: 'Идэвхтэй' },
  ],
  formFields: [
    { key: 'quote', apiKey: 'quote', label: 'Сэтгэгдэл', type: 'textarea', required: true },
    { key: 'name', apiKey: 'name', label: 'Нэр', type: 'text', required: true },
    { key: 'role', apiKey: 'role', label: 'Албан тушаал', type: 'text', required: true },
    { key: 'initial', apiKey: 'initial', label: 'Үсэг (avatar)', type: 'text', required: true },
    { key: 'avatarBg', apiKey: 'avatar_bg', label: 'Avatar дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'rating', apiKey: 'rating', label: 'Үнэлгээ (1-5)', type: 'number' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
    { key: 'isActive', apiKey: 'is_active', label: 'Идэвхтэй', type: 'boolean' },
  ],
  emptyValues: () => ({
    quote: '', name: '', role: '', initial: '', avatarBg: '', rating: 5, order: 0, isActive: true,
  }),
}
