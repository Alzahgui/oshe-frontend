// ── src/hooks/useAdminData.ts ──────────────────────────────────────────────
// Read-only React Query hooks over yosh-backend's authenticated RBAC endpoints
// (users, roles, permissions, menus) — unlike useContent.ts, these all require
// the caller to hold the matching "manage-*" permission.

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type { MenuItem, Permission, Role, User } from '@/types/auth'

function fetchList<T>(url: string) {
  return api.get<{ data: T[] }>(url).then((r) => r.data.data)
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchList<User>('/api/users'),
  })
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => fetchList<Role>('/api/roles'),
  })
}

export function usePermissions() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => fetchList<Permission>('/api/permissions'),
  })
}

export function useMenus() {
  return useQuery({
    queryKey: ['menus'],
    queryFn: () => fetchList<MenuItem>('/api/menus'),
  })
}
