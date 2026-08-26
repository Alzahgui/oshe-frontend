'use client'

import Link from 'next/link'
import { Pencil, Shield, Trash2 } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { RequirePermission } from '@/components/RequirePermission'
import { useDeleteResource } from '@/hooks/useAdminMutations'
import { useRoles } from '@/hooks/useAdminData'

const navy = '#0B1628'
const teal = '#03ADB4'

function RolesTable() {
  const { data, isLoading, isError } = useRoles()
  const deleteMutation = useDeleteResource('roles', ['roles'])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Failed to load roles.</p>
      </div>
    )
  }

  const roles = data ?? []

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(11,22,40,0.06)' }}>
            {['Name', 'Permissions', ''].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-wider"
                style={{ color: '#6B7C93' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-14 text-[0.875rem]" style={{ color: '#6B7C93' }}>
                No roles found
              </td>
            </tr>
          ) : (
            roles.map((role) => (
              <tr key={role.id} style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}>
                <td className="px-4 py-3.5 font-semibold text-[0.875rem]" style={{ color: navy }}>
                  {role.name}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p) => (
                      <span
                        key={p.id}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold"
                        style={{ background: 'rgba(3,173,180,0.1)', color: teal }}
                      >
                        {p.codename}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <Link
                      href={`/roles/${role.id}/edit`}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                      style={{ color: '#6B7C93' }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => confirm(`Delete role "${role.name}"?`) && deleteMutation.mutate(role.id)}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function RolesPage() {
  return (
    <RequirePermission permission="manage-roles">
      <div>
        <AdminPageHeader icon={Shield} title="Roles" subtitle="Manage roles and their permissions" newHref="/roles/new" newLabel="Add Role" />
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
          <RolesTable />
        </div>
      </div>
    </RequirePermission>
  )
}
