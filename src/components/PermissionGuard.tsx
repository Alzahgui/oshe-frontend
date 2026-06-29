// ── src/components/PermissionGuard.tsx ────────────────────────────────────
'use client'

import { usePermission } from '@/hooks/usePermission'

interface PermissionGuardProps {
  /** Require this exact permission codename */
  permission?: string
  /** Require the user to have this role name */
  role?: string
  /** Rendered when access is denied; defaults to null */
  fallback?: React.ReactNode
  children: React.ReactNode
}

/**
 * Renders children only when the authenticated user satisfies every
 * constraint specified via `permission` and/or `role`.
 * Superusers always pass.
 */
export function PermissionGuard({
  permission,
  role,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { can, hasRole } = usePermission()

  const allowed =
    (!permission || can(permission)) &&
    (!role || hasRole(role))

  return <>{allowed ? children : fallback}</>
}
