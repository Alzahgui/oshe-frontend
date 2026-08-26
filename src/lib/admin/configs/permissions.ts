import type { Permission } from '@/types/auth'
import type { ResourceConfig } from '../resourceConfig'

export const permissionsConfig: ResourceConfig<Permission> = {
  apiPath: 'permissions',
  label: 'Зөвшөөрөл',
  labelPlural: 'Зөвшөөрлүүд',
  queryKey: ['permissions'],
  listColumns: [
    { key: 'name', label: 'Нэр' },
    { key: 'codename', label: 'Кодоор' },
  ],
  formFields: [
    { key: 'name', apiKey: 'name', label: 'Нэр (жишээ: manage-users)', type: 'text', required: true },
  ],
  emptyValues: () => ({ name: '' }),
}
