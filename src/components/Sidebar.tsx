// ── src/components/Sidebar.tsx ────────────────────────────────────────────
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Shield,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Menu,
  BarChart3,
  Zap,
  Newspaper,
  Scale,
  Activity,
  TrendingUp,
  TriangleAlert,
  Calendar,
  Bot,
  Star,
  Globe,
  Link2,
  Key,
  ListTree,
  Circle,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { usePermission } from '@/hooks/usePermission'
import type { MenuItem } from '@/types/auth'

const teal = '#03ADB4'
const navy = '#0B1628'

// ── Nav section definition ────────────────────────────────────────────────

interface NavLink {
  label: string
  path: string
  Icon: LucideIcon
}

interface NavSection {
  heading: string
  items: NavLink[]
}

// Maps the icon name stored on each backend Menu row (e.g. "LayoutDashboard")
// to its lucide-react component. Falls back to a plain dot for unknown names.
const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard, Users, Settings, Bell, Menu, BarChart3, Zap, Newspaper,
  Scale, Activity, TrendingUp, TriangleAlert, Calendar, Bot, Star, Globe,
  Link2, Key, ListTree, Shield,
}

/** True if the current user satisfies a menu item's required_role and required_permissions. */
function useMenuAccess() {
  const { hasRole, canAny } = usePermission()

  return (item: MenuItem): boolean => {
    if (item.required_role && !hasRole(item.required_role)) return false
    if (item.required_permissions?.length && !canAny(item.required_permissions)) return false
    return true
  }
}

/** Converts the backend's two-level Menu tree (section -> links) into sidebar sections. */
function useNavSections(): NavSection[] {
  const menu = useAuthStore((s) => s.menu)
  const canAccess = useMenuAccess()

  return menu
    .filter(canAccess)
    .map((section) => ({
      heading: section.label,
      items: (section.children ?? [])
        .filter(canAccess)
        .filter((item): item is MenuItem & { path: string } => Boolean(item.path))
        .map((item) => ({
          label: item.label,
          path: item.path,
          Icon: (item.icon && ICONS[item.icon]) || Circle,
        })),
    }))
    .filter((section) => section.items.length > 0)
}

// ── Single nav item ───────────────────────────────────────────────────────

function NavItem({ label, path, Icon }: NavLink) {
  const pathname = usePathname()
  const isActive = pathname === path || pathname.startsWith(path + '/')

  return (
    <Link
      href={path}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
      style={{
        color:      isActive ? teal : 'rgba(255,255,255,0.65)',
        background: isActive ? 'rgba(3,173,180,0.15)' : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: teal }} />
      )}
    </Link>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────

export function Sidebar() {
  const user   = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const navSections = useNavSections()

  const initials = user
    ? `${user.first_name.charAt(0)}${user.last_name ? user.last_name.charAt(0) : ''}`.toUpperCase()
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
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-extrabold text-white text-[0.95rem] leading-tight">YOSH</div>
          <div
            className="text-[0.58rem] font-medium tracking-wider uppercase"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ADMIN ПОРТАЛ
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navSections.map((section, si) => (
          <div key={section.heading} className={si > 0 ? 'mt-5' : ''}>
            {/* Section heading */}
            <div
              className="px-3 mb-1 text-[0.6rem] font-bold tracking-widest"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {section.heading}
            </div>
            {/* Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>
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
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
