'use client'

import { RoleForm } from '@/components/admin/RoleForm'
import { RequirePermission } from '@/components/RequirePermission'

export default function Page() {
  return (
    <RequirePermission permission="manage-roles">
      <RoleForm mode="create" />
    </RequirePermission>
  )
}
