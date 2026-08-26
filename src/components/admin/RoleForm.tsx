// ── src/components/admin/RoleForm.tsx ─────────────────────────────────────
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Shield } from 'lucide-react'
import { useCreateResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { usePermissions } from '@/hooks/useAdminData'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { Role } from '@/types/auth'

const navy = '#0B1628'
const teal = '#03ADB4'

export function RoleForm({ mode, role }: { mode: 'create' | 'edit'; role?: Role }) {
  const router = useRouter()
  const { data: permissions, isLoading } = usePermissions()
  const createMutation = useCreateResource<Role>('roles', ['roles'])
  const updateMutation = useUpdateResource<Role>('roles', ['roles'])

  const [name, setName] = useState(role?.name ?? '')
  const [selected, setSelected] = useState<Set<string>>(
    new Set(role?.permissions.map((p) => p.codename) ?? [])
  )
  const [error, setError] = useState('')

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const toggle = (codename: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(codename)) next.delete(codename)
      else next.add(codename)
      return next
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Role name is required')
      return
    }
    const payload = { name: name.trim(), permissions: Array.from(selected) }
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload)
      } else {
        await updateMutation.mutateAsync({ id: role!.id, payload })
      }
      router.push('/roles')
    } catch {
      setError('Could not save the role. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5" style={{ color: teal }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
          {mode === 'create' ? 'New Role' : `Edit ${role?.name}`}
        </h1>
      </div>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none"
            style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }}
          />
        </div>

        <div>
          <label className="block text-[0.82rem] font-semibold mb-2" style={{ color: navy }}>Permissions</label>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(permissions ?? []).map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm"
                  style={{ border: '1px solid rgba(11,22,40,0.08)', color: navy }}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(p.codename)}
                    onChange={() => toggle(p.codename)}
                  />
                  {p.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-[0.82rem]" style={{ color: '#ef4444' }}>{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
          <Link
            href="/roles"
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-gray-50"
            style={{ color: navy, border: '1.5px solid rgba(11,22,40,0.12)' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
