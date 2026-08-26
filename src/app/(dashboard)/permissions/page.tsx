'use client'

import { Key } from 'lucide-react'
import { ResourceListPage } from '@/components/admin/ResourceListPage'
import { RequirePermission } from '@/components/RequirePermission'
import { usePermissions } from '@/hooks/useAdminData'
import { permissionsConfig } from '@/lib/admin/configs/permissions'

export default function Page() {
  return (
    <RequirePermission permission="manage-permissions">
      <ResourceListPage config={permissionsConfig} useList={usePermissions} icon={Key} />
    </RequirePermission>
  )
}
