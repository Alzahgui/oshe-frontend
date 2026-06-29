// ── src/lib/axios.ts ──────────────────────────────────────────────────────

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Module-level token ref — updated by authStore to avoid circular imports
let _token: string | null = null

export function setAxiosToken(token: string | null) {
  _token = token
}

// ─── Request interceptor ─────────────────────────────────────────────────────

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (_token) {
    config.headers.Authorization = `Bearer ${_token}`
  }
  return config
})

// ─── Response interceptor — 401 → queue → refresh → retry ────────────────────

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)))
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    // Queue subsequent 401s while a refresh is in-flight
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const refresh =
        typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
      if (!refresh) throw new Error('No refresh token')

      const { data } = await axios.post<{ access: string }>(`${BASE_URL}/auth/refresh/`, {
        refresh,
      })

      const { access } = data
      setAxiosToken(access)

      if (typeof document !== 'undefined') {
        document.cookie = `access_token=${access}; path=/; max-age=604800; SameSite=Lax`
      }

      // Lazy import to avoid circular dep with authStore
      const { useAuthStore } = await import('@/store/authStore')
      useAuthStore.getState().setAccessToken(access)

      processQueue(null, access)
      original.headers.Authorization = `Bearer ${access}`
      return api(original)
    } catch (refreshError) {
      processQueue(refreshError, null)

      const { useAuthStore } = await import('@/store/authStore')
      useAuthStore.getState().logout()

      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)
