import type { Event } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const eventsConfig: ResourceConfig<Event> = {
  apiPath: 'events',
  label: 'Арга хэмжээ',
  labelPlural: 'Арга хэмжээнүүд',
  queryKey: ['events'],
  listColumns: [
    { key: 'title', label: 'Гарчиг' },
    { key: 'category', label: 'Ангилал' },
    { key: 'startDate', label: 'Эхлэх огноо' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'title', apiKey: 'title', label: 'Гарчиг', type: 'text', required: true },
    { key: 'description', apiKey: 'description', label: 'Тайлбар', type: 'textarea', required: true },
    { key: 'imageUrl', apiKey: 'image_url', label: 'Зургийн URL', type: 'text', required: false },
    { key: 'category', apiKey: 'category', label: 'Ангилал', type: 'text', required: true },
    { key: 'categoryColor', apiKey: 'category_color', label: 'Ангиллын өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'categoryBg', apiKey: 'category_bg', label: 'Ангиллын дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'day', apiKey: 'day', label: 'Өдөр (жиш: 15)', type: 'text', required: true },
    { key: 'monthLabel', apiKey: 'month_label', label: 'Сарын шошго (жиш: 12-Р САР)', type: 'text', required: true },
    { key: 'startDate', apiKey: 'start_date', label: 'Эхлэх огноо (YYYY-MM-DD)', type: 'text', required: true },
    { key: 'endDate', apiKey: 'end_date', label: 'Дуусах огноо (YYYY-MM-DD)', type: 'text', required: false },
    { key: 'timeRange', apiKey: 'time_range', label: 'Цагийн хүрээ', type: 'text', required: true },
    { key: 'location', apiKey: 'location', label: 'Байршил', type: 'text', required: true },
    { key: 'isOnline', apiKey: 'is_online', label: 'Онлайн арга хэмжээ', type: 'boolean' },
    { key: 'seatsInfo', apiKey: 'seats_info', label: 'Суудлын мэдээлэл', type: 'text', required: true },
    { key: 'price', apiKey: 'price', label: 'Үнэ', type: 'text', required: true },
    { key: 'buttonColor', apiKey: 'button_color', label: 'Товчны өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    title: '', description: '', imageUrl: '', category: '', categoryColor: '', categoryBg: '',
    day: '', monthLabel: '', startDate: '', endDate: '', timeRange: '', location: '',
    isOnline: false, seatsInfo: '', price: '', buttonColor: '', order: 0,
  }),
}
