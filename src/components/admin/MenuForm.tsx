// ── src/components/admin/MenuForm.tsx ─────────────────────────────────────
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ListTree } from 'lucide-react'
import { useCreateResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { useMenus, usePermissions } from '@/hooks/useAdminData'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { descendantIds, flattenMenus, type FlatMenuItem } from '@/lib/admin/menuTree'
import type { MenuItem } from '@/types/auth'

const navy = '#0B1628'
const teal = '#03ADB4'

export function MenuForm({ mode, menu }: { mode: 'create' | 'edit'; menu?: FlatMenuItem }) {
  const router = useRouter()
  const { data: allMenus, isLoading: menusLoading } = useMenus()
  const { data: permissions, isLoading: permissionsLoading } = usePermissions()
  const createMutation = useCreateResource<MenuItem>('menus', ['menus'])
  const updateMutation = useUpdateResource<MenuItem>('menus', ['menus'])

  const [label, setLabel] = useState(menu?.label ?? '')
  const [icon, setIcon] = useState(menu?.icon ?? '')
  const [path, setPath] = useState(menu?.path ?? '')
  const [order, setOrder] = useState(menu?.order ?? 0)
  const [parentId, setParentId] = useState<string>(menu?.parentId != null ? String(menu.parentId) : '')
  const [requiredRole, setRequiredRole] = useState(menu?.required_role ?? '')
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(menu?.required_permissions ?? [])
  )
  const [error, setError] = useState('')

  const isSubmitting = createMutation.isPending || updateMutation.isPending
  const flat = flattenMenus(allMenus ?? [])
  const excluded = menu ? descendantIds(flat, menu.id) : new Set<number>()

  const togglePermission = (codename: string) => {
    setSelectedPermissions((prev) => {
      const next = new Set(prev)
      if (next.has(codename)) next.delete(codename)
      else next.add(codename)
      return next
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!label.trim()) {
      setError('Label is required')
      return
    }
    const payload = {
      label: label.trim(),
      icon: icon.trim() || null,
      path: path.trim() || null,
      order,
      parent_id: parentId ? Number(parentId) : null,
      required_role: requiredRole.trim() || null,
      required_permissions: Array.from(selectedPermissions),
    }
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload)
      } else {
        await updateMutation.mutateAsync({ id: menu!.id, payload })
      }
      router.push('/menus')
    } catch {
      setError('Could not save the menu item. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <ListTree className="w-5 h-5" style={{ color: teal }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
          {mode === 'create' ? 'New Menu Item' : `Edit ${menu?.label}`}
        </h1>
      </div>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Label</label>
            <input value={label} onChange={(e) => setLabel(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
          </div>
          <div>
            <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Icon (lucide name)</label>
            <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g. Users" className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
          </div>
          <div>
            <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Path</label>
            <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/users" className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
          </div>
          <div>
            <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Order</label>
            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
          </div>
        </div>

        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Parent (section)</label>
          {menusLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
              style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }}
            >
              <option value="">— Top level —</option>
              {flat
                .filter((item) => !excluded.has(item.id))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {'—'.repeat(item.depth)} {item.label}
                  </option>
                ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Required role (optional)</label>
          <input value={requiredRole} onChange={(e) => setRequiredRole(e.target.value)} placeholder="e.g. Super Admin" className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
        </div>

        <div>
          <label className="block text-[0.82rem] font-semibold mb-2" style={{ color: navy }}>Required permissions (any one grants access)</label>
          {permissionsLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(permissions ?? []).map((p) => (
                <label key={p.id} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm" style={{ border: '1px solid rgba(11,22,40,0.08)', color: navy }}>
                  <input type="checkbox" checked={selectedPermissions.has(p.codename)} onChange={() => togglePermission(p.codename)} />
                  {p.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-[0.82rem]" style={{ color: '#ef4444' }}>{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}>
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
          <Link href="/menus" className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-gray-50" style={{ color: navy, border: '1.5px solid rgba(11,22,40,0.12)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
