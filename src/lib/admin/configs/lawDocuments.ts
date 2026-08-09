import type { LawDocument } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const lawDocumentsConfig: ResourceConfig<LawDocument> = {
  apiPath: 'law-documents',
  label: 'Хууль/стандарт',
  labelPlural: 'Хууль, стандартууд',
  queryKey: ['law-documents'],
  listColumns: [
    { key: 'code', label: 'Код' },
    { key: 'title', label: 'Гарчиг' },
    { key: 'category', label: 'Ангилал' },
    { key: 'isNew', label: 'Шинэ' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    { key: 'code', apiKey: 'code', label: 'Код', type: 'text', required: true },
    { key: 'title', apiKey: 'title', label: 'Гарчиг', type: 'text', required: true },
    { key: 'description', apiKey: 'description', label: 'Тайлбар', type: 'textarea', required: true },
    {
      key: 'category', apiKey: 'category', label: 'Ангилал', type: 'select', required: true,
      options: [
        { value: 'national_law', label: 'Үндэсний хууль' },
        { value: 'regulation', label: 'Дүрэм журам' },
        { value: 'national_standard', label: 'Үндэсний стандарт' },
        { value: 'international_standard', label: 'Олон улсын' },
      ],
    },
    { key: 'statusLabel', apiKey: 'status_label', label: 'Статус шошго', type: 'text', required: true },
    { key: 'statusColor', apiKey: 'status_color', label: 'Статусын өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'statusBg', apiKey: 'status_bg', label: 'Статусын дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'icon', apiKey: 'icon', label: 'Icon нэр', type: 'text', required: true, preview: 'icon' },
    { key: 'iconColor', apiKey: 'icon_color', label: 'Icon өнгө', type: 'text', required: true, preview: 'color' },
    { key: 'iconBg', apiKey: 'icon_bg', label: 'Icon дэвсгэр', type: 'text', required: true, preview: 'color' },
    { key: 'fileUrl', apiKey: 'file_url', label: 'Файлын URL', type: 'text', required: false },
    { key: 'downloadsCount', apiKey: 'downloads_count', label: 'Татсан тоо', type: 'number' },
    { key: 'isNew', apiKey: 'is_new', label: 'Шинэ гэж тэмдэглэх', type: 'boolean' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    code: '', title: '', description: '', category: 'national_law',
    statusLabel: '', statusColor: '', statusBg: '', icon: '', iconColor: '', iconBg: '',
    fileUrl: '', downloadsCount: 0, isNew: false, order: 0,
  }),
}
