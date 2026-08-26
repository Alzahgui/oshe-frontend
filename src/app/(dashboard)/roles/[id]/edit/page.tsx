'use client'

import { useParams } from 'next/navigation'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { RoleForm } from '@/components/admin/RoleForm'
import { RequirePermission } from '@/components/RequirePermission'
import { useRoles } from '@/hooks/useAdminData'

export default function Page() {
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useRoles()
  const role = data?.find((r) => r.id === Number(params.id))

  return (
    <RequirePermission permission="manage-roles">
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : !role ? (
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Role not found.</p>
      ) : (
        <RoleForm mode="edit" role={role} />
      )}
    </RequirePermission>
  )
}
