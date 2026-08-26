'use client'

import { useParams } from 'next/navigation'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { UserForm } from '@/components/admin/UserForm'
import { RequirePermission } from '@/components/RequirePermission'
import { useUsers } from '@/hooks/useAdminData'

export default function Page() {
  const params = useParams<{ id: string }>()
  const { data, isLoading } = useUsers()
  const user = data?.find((u) => u.id === Number(params.id))

  return (
    <RequirePermission permission="manage-users">
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : !user ? (
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>User not found.</p>
      ) : (
        <UserForm mode="edit" user={user} />
      )}
    </RequirePermission>
  )
}
