// ── src/components/RequirePermission.tsx ──────────────────────────────────
'use client'

import { Shield } from 'lucide-react'
import { PermissionGuard } from './PermissionGuard'

const navy = '#0B1628'

export function RequirePermission({
  permission,
  role,
  children,
}: {
  permission?: string
  role?: string
  children: React.ReactNode
}) {
  return (
    <PermissionGuard
      permission={permission}
      role={role}
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
            You don&apos;t have the required {permission ? 'permission' : 'role'} to view this page.
          </p>
        </div>
      }
    >
      {children}
    </PermissionGuard>
  )
}
