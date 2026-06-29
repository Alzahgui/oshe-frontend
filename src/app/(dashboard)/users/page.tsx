// ── src/app/(dashboard)/users/page.tsx ───────────────────────────────────
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { PermissionGuard } from '@/components/PermissionGuard'
import { Users, Plus, Search, Shield, MoreHorizontal } from 'lucide-react'
import type { User } from '@/types/auth'

const navy = '#0B1628'
const teal = '#03ADB4'
const pink = '#FD2EBB'

function UserTable({ search }: { search: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/api/users/').then((r) => r.data),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke={teal} strokeWidth="4" />
          <path className="opacity-75" fill={teal} d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>
          Failed to load users. Make sure the backend is running.
        </p>
      </div>
    )
  }

  const users = (data ?? []).filter(
    (u) =>
      !search ||
      `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(11,22,40,0.06)' }}>
            {['Name', 'Email', 'Roles', 'Status', ''].map((h) => (
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
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-14 text-[0.875rem]" style={{ color: '#6B7C93' }}>
                {search ? 'No users match your search' : 'No users found'}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors"
                style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(3,173,180,0.03)')
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
                    >
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </div>
                    <span className="font-medium text-[0.875rem]" style={{ color: navy }}>
                      {user.first_name} {user.last_name}
                    </span>
                  </div>
                </td>
                <td
                  className="px-4 py-3.5 text-[0.875rem]"
                  style={{ color: '#6B7C93' }}
                >
                  {user.email}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {user.is_superuser && (
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-semibold"
                        style={{ background: 'rgba(253,46,187,0.1)', color: pink }}
                      >
                        Superuser
                      </span>
                    )}
                    {user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold"
                        style={{ background: 'rgba(3,173,180,0.1)', color: teal }}
                      >
                        {role.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={
                      user.is_active
                        ? { background: 'rgba(22,163,74,0.1)', color: '#16a34a' }
                        : { background: 'rgba(239,68,68,0.1)', color: '#ef4444' }
                    }
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button
                    className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                    style={{ color: '#6B7C93' }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function UsersPage() {
  const [search, setSearch] = useState('')

  return (
    <PermissionGuard
      role="Admin"
      fallback={
        <div className="flex flex-col items-center justify-center py-24">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(11,22,40,0.06)' }}
          >
            <Shield className="w-7 h-7" style={{ color: '#6B7C93' }} />
          </div>
          <h2 className="font-bold text-[1.1rem] mb-2" style={{ color: navy }}>
            Access Restricted
          </h2>
          <p className="text-[0.875rem]" style={{ color: '#6B7C93' }}>
            You need the <strong>Admin</strong> role to view user management.
          </p>
        </div>
      }
    >
      <div>
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5" style={{ color: teal }} />
              <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
                User Management
              </h1>
            </div>
            <p style={{ color: '#6B7C93', fontSize: '0.9rem' }}>
              Manage accounts, roles, and permissions
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>

        {/* ── Search ── */}
        <div className="mb-5 relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: '#6B7C93' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
            style={{
              border: '1.5px solid rgba(11,22,40,0.12)',
              background: 'white',
              color: navy,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,22,40,0.12)')}
          />
        </div>

        {/* ── Table ── */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(11,22,40,0.08)' }}
        >
          <UserTable search={search} />
        </div>
      </div>
    </PermissionGuard>
  )
}
