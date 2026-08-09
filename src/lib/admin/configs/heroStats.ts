import type { HeroStat } from '@/types/content'
import type { ResourceConfig } from '../resourceConfig'

export const heroStatsConfig: ResourceConfig<HeroStat> = {
  apiPath: 'hero-stats',
  label: 'Hero статистик',
  labelPlural: 'Hero статистикууд',
  queryKey: ['hero-stats'],
  listColumns: [
    { key: 'placement', label: 'Байршил' },
    { key: 'value', label: 'Утга' },
    { key: 'label', label: 'Шошго' },
    { key: 'order', label: 'Дараалал' },
  ],
  formFields: [
    {
      key: 'placement', apiKey: 'placement', label: 'Байршил', type: 'select', required: true,
      options: [
        { value: 'stat_bar', label: 'Stat bar (hero доорх мөр)' },
        { value: 'floating', label: 'Floating (зурган дээрх)' },
      ],
    },
    { key: 'icon', apiKey: 'icon', label: 'Icon нэр', type: 'text', required: false, preview: 'icon' },
    { key: 'iconColor', apiKey: 'icon_color', label: 'Icon өнгө', type: 'text', required: false, preview: 'color' },
    { key: 'iconBg', apiKey: 'icon_bg', label: 'Icon дэвсгэр', type: 'text', required: false, preview: 'color' },
    { key: 'iconBorder', apiKey: 'icon_border', label: 'Icon хүрээ', type: 'text', required: false, preview: 'color' },
    { key: 'value', apiKey: 'value', label: 'Утга', type: 'text', required: true },
    { key: 'label', apiKey: 'label', label: 'Шошго', type: 'text', required: true },
    { key: 'sublabel', apiKey: 'sublabel', label: 'Дэд шошго', type: 'text', required: false },
    { key: 'color', apiKey: 'color', label: 'Өнгө', type: 'text', required: false, preview: 'color' },
    { key: 'order', apiKey: 'order', label: 'Дараалал', type: 'number' },
  ],
  emptyValues: () => ({
    placement: 'stat_bar', icon: '', iconColor: '', iconBg: '', iconBorder: '',
    value: '', label: '', sublabel: '', color: '', order: 0,
  }),
}
