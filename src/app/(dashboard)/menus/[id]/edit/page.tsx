'use client'

import { useParams } from 'next/navigation'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { MenuForm } from '@/components/admin/MenuForm'
import { RequirePermission } from '@/components/RequirePermission'
import { useMenus } from '@/hooks/useAdminData'
import { flattenMenus } from '@/lib/admin/menuTree'

export default function Page() {
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useMenus()
  const menu = flattenMenus(data ?? []).find((m) => m.id === Number(params.id))

  return (
    <RequirePermission permission="manage-menus">
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : !menu ? (
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Menu item not found.</p>
      ) : (
        <MenuForm mode="edit" menu={menu} />
      )}
    </RequirePermission>
  )
}
