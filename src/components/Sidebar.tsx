// ── src/components/Sidebar.tsx ────────────────────────────────────────────
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
  LogOut,
  BarChart3,
  Bell,
  HardHat,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import type { MenuItem } from '@/types/auth'

const teal = '#03ADB4'
const navy = '#0B1628'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  dashboard: LayoutDashboard,
  users: Users,
  posts: FileText,
  settings: Settings,
  analytics: BarChart3,
  notifications: Bell,
}

const FALLBACK_NAV: MenuItem[] = [
  { id: 1, label: 'Dashboard', path: '/dashboard', order: 1, icon: 'dashboard' },
  { id: 2, label: 'Users', path: '/users', order: 2, icon: 'users' },
  { id: 3, label: 'Posts', path: '/posts', order: 3, icon: 'posts' },
  { id: 4, label: 'Settings', path: '/settings', order: 4, icon: 'settings' },
]

interface NavItemProps {
  item: MenuItem
  depth?: number
}

function NavItem({ item, depth = 0 }: NavItemProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const hasChildren = (item.children?.length ?? 0) > 0
  const isActive = item.path
    ? pathname === item.path || pathname.startsWith(item.path + '/')
    : false

  const Icon = item.icon ? (ICON_MAP[item.icon] ?? HardHat) : HardHat
  const indent = depth > 0 ? 12 + depth * 12 : 16

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={{
            paddingLeft: `${indent}px`,
            paddingRight: '12px',
            color: isActive ? teal : 'rgba(255,255,255,0.7)',
            background: isActive ? 'rgba(3,173,180,0.15)' : 'transparent',
          }}
        >
          {depth === 0 && <Icon className="w-4 h-4 flex-shrink-0" />}
          <span className="flex-1 text-left">{item.label}</span>
          {open ? (
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          )}
        </button>
        {open && (
          <div className="ml-3 border-l" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.path ?? '#'}
      className="flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors group"
      style={{
        paddingLeft: `${indent}px`,
        paddingRight: '12px',
        color: isActive ? teal : 'rgba(255,255,255,0.7)',
        background: isActive ? 'rgba(3,173,180,0.15)' : 'transparent',
      }}
    >
      {depth === 0 && <Icon className="w-4 h-4 flex-shrink-0" />}
      {depth > 0 && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: isActive ? teal : 'rgba(255,255,255,0.3)' }}
        />
      )}
      <span>{item.label}</span>
      {isActive && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ background: teal }}
        />
      )}
    </Link>
  )
}

export function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const menu = useAuthStore((s) => s.menu)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const navItems =
    menu.length > 0 ? [...menu].sort((a, b) => a.order - b.order) : FALLBACK_NAV

  const initials = user
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    : 'U'

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 w-64 flex flex-col z-50"
      style={{ background: navy, borderRight: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-5 py-[18px] flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-extrabold text-white text-[0.95rem] leading-tight">MANOSH</div>
          <div
            className="text-[0.58rem] font-medium tracking-wider"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ADMIN PORTAL
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </nav>

      {/* ── User info + logout ── */}
      <div
        className="px-3 pb-4 pt-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[0.82rem] font-semibold truncate">
              {user ? `${user.first_name} ${user.last_name}` : 'User'}
            </div>
            <div className="text-[0.7rem] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {user?.email ?? ''}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg transition-colors flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            title="Sign out"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
