// ── src/components/admin/UserForm.tsx ─────────────────────────────────────
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Users } from 'lucide-react'
import { useCreateResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { useRoles } from '@/hooks/useAdminData'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { User } from '@/types/auth'

const navy = '#0B1628'
const teal = '#03ADB4'

export function UserForm({ mode, user }: { mode: 'create' | 'edit'; user?: User }) {
  const router = useRouter()
  const { data: roles, isLoading: rolesLoading } = useRoles()
  const createMutation = useCreateResource<User>('users', ['users'])
  const updateMutation = useUpdateResource<User>('users', ['users'])

  const [name, setName] = useState(user ? `${user.first_name} ${user.last_name}`.trim() : '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(
    new Set(user?.roles.map((r) => r.name) ?? [])
  )
  const [error, setError] = useState('')

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const toggleRole = (roleName: string) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev)
      if (next.has(roleName)) next.delete(roleName)
      else next.add(roleName)
      return next
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required')
      return
    }
    if (mode === 'create' && password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    const payload: Record<string, unknown> = {
      name: name.trim(),
      email: email.trim(),
      roles: Array.from(selectedRoles),
    }
    if (password) payload.password = password

    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload)
      } else {
        await updateMutation.mutateAsync({ id: user!.id, payload })
      }
      router.push('/users')
    } catch {
      setError('Could not save the user. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5" style={{ color: teal }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
          {mode === 'create' ? 'New User' : `Edit ${user?.email}`}
        </h1>
      </div>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
        </div>
        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
        </div>
        <div>
          <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
            Password {mode === 'edit' && <span style={{ color: '#6B7C93', fontWeight: 400 }}>(leave blank to keep current)</span>}
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none" style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }} />
        </div>

        <div>
          <label className="block text-[0.82rem] font-semibold mb-2" style={{ color: navy }}>Roles</label>
          {rolesLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(roles ?? []).map((r) => (
                <label key={r.id} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm" style={{ border: '1px solid rgba(11,22,40,0.08)', color: navy }}>
                  <input type="checkbox" checked={selectedRoles.has(r.name)} onChange={() => toggleRole(r.name)} />
                  {r.name}
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
          <Link href="/users" className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-gray-50" style={{ color: navy, border: '1.5px solid rgba(11,22,40,0.12)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
