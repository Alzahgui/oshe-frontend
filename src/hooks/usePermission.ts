// ── src/hooks/usePermission.ts ─────────────────────────────────────────────

import { useAuthStore } from '@/store/authStore'

export function usePermission() {
  const permissions = useAuthStore((s) => s.permissions)
  const user = useAuthStore((s) => s.user)

  /** True if the current user has the given permission codename */
  function can(permission: string): boolean {
    if (user?.is_superuser) return true
    return permissions.includes(permission)
  }

  /** True if the current user has the given role name */
  function hasRole(role: string): boolean {
    if (user?.is_superuser) return true
    return user?.roles.some((r) => r.name === role) ?? false
  }

  /** True if the current user has ANY of the given permission codenames */
  function canAny(perms: string[]): boolean {
    if (user?.is_superuser) return true
    return perms.some((p) => permissions.includes(p))
  }

  return { can, hasRole, canAny }
}
