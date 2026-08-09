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

// ─── Response interceptor — session expired → clear local state, redirect ────

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

    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
