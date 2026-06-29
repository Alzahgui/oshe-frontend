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

export interface AuthResponse {
  access: string
  refresh: string
}

export interface MeResponse {
  user: User
  permissions: string[]
  menu: MenuItem[]
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  permissions: string[]
  menu: MenuItem[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setAccessToken: (token: string) => void
  initialize: () => void
}
