'use client'

import { UserForm } from '@/components/admin/UserForm'
import { RequirePermission } from '@/components/RequirePermission'

export default function Page() {
  return (
    <RequirePermission permission="manage-users">
      <UserForm mode="create" />
    </RequirePermission>
  )
}
