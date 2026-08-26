// ── src/store/authStore.ts ─────────────────────────────────────────────────

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { api, ensureCsrfCookie } from '@/lib/axios'
import type { AuthState, MenuItem, User } from '@/types/auth'

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 2 // matches Laravel's default 120-minute session lifetime

function fetchMe() {
  return api.get<{ data: User }>('/api/user').then((r) => r.data.data)
}

function fetchMenu() {
  return api.get<{ data: MenuItem[] }>('/api/menus').then((r) => r.data.data)
}

function permissionsOf(user: User): string[] {
  return user.roles.flatMap((role) => role.permissions.map((p) => p.codename))
}

function setAuthenticatedCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `authenticated=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`
}

function clearAuthenticatedCookie() {
  if (typeof document === 'undefined') return
  document.cookie = 'authenticated=; path=/; max-age=0'
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      permissions: [],
      menu: [],
      isAuthenticated: false,

      login: async (email, password) => {
        await ensureCsrfCookie()
        await api.post('/api/login', { email, password })

        const [user, menu] = await Promise.all([fetchMe(), fetchMenu()])

        set({
          user,
          permissions: permissionsOf(user),
          menu,
          isAuthenticated: true,
        })
        setAuthenticatedCookie()
      },

      logout: async () => {
        try {
          await api.post('/api/logout')
        } catch {
          // swallow — we still clear local state
        } finally {
          clearAuthenticatedCookie()
          set({ user: null, permissions: [], menu: [], isAuthenticated: false })
        }
      },

      clearSession: () => {
        clearAuthenticatedCookie()
        set({ user: null, permissions: [], menu: [], isAuthenticated: false })
      },

      initialize: async () => {
        try {
          const [user, menu] = await Promise.all([fetchMe(), fetchMenu()])
          set({
            user,
            permissions: permissionsOf(user),
            menu,
            isAuthenticated: true,
          })
          setAuthenticatedCookie()
        } catch {
          clearAuthenticatedCookie()
          set({ user: null, permissions: [], menu: [], isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        // Guard against SSR — localStorage is client-only
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),
      partialize: (state) => ({
        user: state.user,
        permissions: state.permissions,
        menu: state.menu,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
