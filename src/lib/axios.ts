// ── src/lib/axios.ts ──────────────────────────────────────────────────────

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  withXSRFToken: true,
})

/** Primes the XSRF-TOKEN cookie — call before login/register. */
export function ensureCsrfCookie() {
  return api.get('/sanctum/csrf-cookie')
}

// ─── Response interceptor — session expired → clear local state ─────────────

const PROTECTED_PREFIXES = ['/dashboard', '/portal']

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }
    original._retry = true

    const { useAuthStore } = await import('@/store/authStore')
    useAuthStore.getState().clearSession()

    // Only force a redirect when the user was on a protected page — a 401 on a
    // public page (e.g. the initial auth check) just means "not logged in".
    const isProtected =
      typeof window !== 'undefined' &&
      PROTECTED_PREFIXES.some((p) => window.location.pathname.startsWith(p))

    if (isProtected && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
