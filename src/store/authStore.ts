// ── src/store/authStore.ts ─────────────────────────────────────────────────

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { api, ensureCsrfCookie } from '@/lib/axios'
import type { AuthState, LaravelUser, User } from '@/types/auth'

const AUTH_COOKIE_MAX_AGE = 60 * 60 * 2 // matches Laravel's default 120-minute session lifetime

function normalizeUser(raw: LaravelUser): User {
  const [first_name, ...rest] = raw.name.trim().split(/\s+/)
  return {
    id: raw.id,
    email: raw.email,
    first_name: first_name ?? raw.name,
    last_name: rest.join(' '),
    is_active: true,
    is_superuser: false,
    roles: [],
  }
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

        const { data } = await api.get<LaravelUser>('/api/user')

        set({
          user: normalizeUser(data),
          permissions: [],
          menu: [],
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
          const { data } = await api.get<LaravelUser>('/api/user')
          set({
            user: normalizeUser(data),
            permissions: [],
            menu: [],
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
