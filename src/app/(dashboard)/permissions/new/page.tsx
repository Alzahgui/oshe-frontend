'use client'

import { Key } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { RequirePermission } from '@/components/RequirePermission'
import { usePermissions } from '@/hooks/useAdminData'
import { permissionsConfig } from '@/lib/admin/configs/permissions'

export default function Page() {
  return (
    <RequirePermission permission="manage-permissions">
      <ResourceFormPage config={permissionsConfig} useList={usePermissions} icon={Key} mode="create" />
    </RequirePermission>
  )
}
