'use client'

import { useParams } from 'next/navigation'
import { Key } from 'lucide-react'
import { ResourceFormPage } from '@/components/admin/ResourceFormPage'
import { RequirePermission } from '@/components/RequirePermission'
import { usePermissions } from '@/hooks/useAdminData'
import { permissionsConfig } from '@/lib/admin/configs/permissions'

export default function Page() {
  const params = useParams<{ id: string }>()
  return (
    <RequirePermission permission="manage-permissions">
      <ResourceFormPage config={permissionsConfig} useList={usePermissions} icon={Key} mode="edit" id={params.id} />
    </RequirePermission>
  )
}
