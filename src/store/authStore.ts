// ── src/store/authStore.ts ─────────────────────────────────────────────────

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { api, setAxiosToken } from '@/lib/axios'
import type { AuthState, AuthResponse, MeResponse } from '@/types/auth'

function setCookie(token: string) {
  if (typeof document === 'undefined') return
  document.cookie = `access_token=${token}; path=/; max-age=604800; SameSite=Lax`
}

function clearCookie() {
  if (typeof document === 'undefined') return
  document.cookie = 'access_token=; path=/; max-age=0'
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      permissions: [],
      menu: [],
      isAuthenticated: false,

      login: async (email, password) => {
        // 1. Obtain tokens
        const { data: tokens } = await api.post<AuthResponse>('/auth/login/', {
          email,
          password,
        })

        // 2. Persist refresh token and wire up axios
        if (typeof window !== 'undefined') {
          localStorage.setItem('refresh_token', tokens.refresh)
        }
        setAxiosToken(tokens.access)
        setCookie(tokens.access)

        // 3. Fetch authenticated user details
        const { data: me } = await api.get<MeResponse>('/auth/me/')

        set({
          user: me.user,
          accessToken: tokens.access,
          permissions: me.permissions,
          menu: me.menu,
          isAuthenticated: true,
        })
      },

      logout: async () => {
        try {
          const refresh =
            typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
          if (refresh) {
            await api.post('/auth/logout/', { refresh })
          }
        } catch {
          // swallow — we still clear local state
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('refresh_token')
          }
          setAxiosToken(null)
          clearCookie()
          set({
            user: null,
            accessToken: null,
            permissions: [],
            menu: [],
            isAuthenticated: false,
          })
        }
      },

      setAccessToken: (token) => {
        set({ accessToken: token })
        setAxiosToken(token)
        setCookie(token)
      },

      initialize: () => {
        const { accessToken } = get()
        if (accessToken) {
          setAxiosToken(accessToken)
          setCookie(accessToken)
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
        accessToken: state.accessToken,
        permissions: state.permissions,
        menu: state.menu,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setAxiosToken(state.accessToken)
          setCookie(state.accessToken)
        }
      },
    }
  )
)
