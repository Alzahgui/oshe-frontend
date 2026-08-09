import type { Announcement } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const announcementsConfig: ResourceConfig<Announcement> = {
  apiPath: 'announcements',
  label: 'Зарлал',
  labelPlural: 'Зарлалууд',
  queryKey: ['announcements'],
  listColumns: [
    { key: 'message', label: 'Мессеж' },
    { key: 'linkText', label: 'Холбоосын текст' },
    { key: 'isActive', label: 'Идэвхтэй' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'message', apiKey: 'message', label: 'Мессеж', type: 'textarea', required: true },
    { key: 'linkText', apiKey: 'link_text', label: 'Холбоосын текст', type: 'text', required: false },
    { key: 'linkUrl', apiKey: 'link_url', label: 'Холбоосын URL', type: 'text', required: false },
    { key: 'isActive', apiKey: 'is_active', label: 'Идэвхтэй', type: 'boolean' },
    { key: 'startsAt', apiKey: 'starts_at', label: 'Эхлэх огноо (YYYY-MM-DD)', type: 'text', required: false },
    { key: 'endsAt', apiKey: 'ends_at', label: 'Дуусах огноо (YYYY-MM-DD)', type: 'text', required: false },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    message: '', linkText: '', linkUrl: '', isActive: true, startsAt: '', endsAt: '', order: 0,
  }),
}
