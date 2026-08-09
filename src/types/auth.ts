// ── src/types/auth.ts ──────────────────────────────────────────────────────

export interface Permission {
  id: number
  name: string
  codename: string
}

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface MenuItem {
  id: number
  label: string
  icon?: string
  path?: string
  order: number
  required_role?: string
  required_permissions?: string[]
  children?: MenuItem[]
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_superuser: boolean
  roles: Role[]
}

/** Raw shape returned by Laravel's GET /api/user */
export interface LaravelUser {
  id: number
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  permissions: string[]
  menu: MenuItem[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  /** Clears local auth state without hitting the server — used when a 401 reveals the session already expired */
  clearSession: () => void
  initialize: () => Promise<void>
}
