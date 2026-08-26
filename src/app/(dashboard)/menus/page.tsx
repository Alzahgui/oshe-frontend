'use client'

import Link from 'next/link'
import { ListTree, Pencil, Trash2 } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { RequirePermission } from '@/components/RequirePermission'
import { useDeleteResource } from '@/hooks/useAdminMutations'
import { useMenus } from '@/hooks/useAdminData'
import { flattenMenus } from '@/lib/admin/menuTree'

const navy = '#0B1628'
const teal = '#03ADB4'

function MenusTable() {
  const { data, isLoading, isError } = useMenus()
  const deleteMutation = useDeleteResource('menus', ['menus'])

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
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Failed to load menus.</p>
      </div>
    )
  }

  const rows = flattenMenus(data ?? [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(11,22,40,0.06)' }}>
            {['Label', 'Path', 'Required', ''].map((h) => (
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-14 text-[0.875rem]" style={{ color: '#6B7C93' }}>
                No menu items found
              </td>
            </tr>
          ) : (
            rows.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}>
                <td className="px-4 py-3.5 text-[0.875rem]" style={{ color: navy, paddingLeft: `${1 + item.depth * 1.5}rem` }}>
                  {item.depth > 0 && <span style={{ color: '#6B7C93' }}>└ </span>}
                  {item.label}
                </td>
                <td className="px-4 py-3.5 text-[0.875rem]" style={{ color: '#6B7C93' }}>{item.path ?? '—'}</td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.required_role && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: 'rgba(253,46,187,0.1)', color: '#FD2EBB' }}>
                        {item.required_role}
                      </span>
                    )}
                    {(item.required_permissions ?? []).map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: 'rgba(3,173,180,0.1)', color: teal }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <Link href={`/menus/${item.id}/edit`} className="p-1.5 rounded-lg transition-colors hover:bg-gray-100" style={{ color: '#6B7C93' }}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => confirm(`Delete menu item "${item.label}"?`) && deleteMutation.mutate(item.id)}
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

export default function MenusPage() {
  return (
    <RequirePermission permission="manage-menus">
      <div>
        <AdminPageHeader icon={ListTree} title="Admin Menus" subtitle="Manage the admin sidebar's structure and access rules" newHref="/menus/new" newLabel="Add Menu Item" />
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
          <MenusTable />
        </div>
      </div>
    </RequirePermission>
  )
}
