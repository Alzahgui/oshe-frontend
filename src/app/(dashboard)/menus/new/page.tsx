'use client'

import { MenuForm } from '@/components/admin/MenuForm'
import { RequirePermission } from '@/components/RequirePermission'

export default function Page() {
  return (
    <RequirePermission permission="manage-menus">
      <MenuForm mode="create" />
    </RequirePermission>
  )
}
