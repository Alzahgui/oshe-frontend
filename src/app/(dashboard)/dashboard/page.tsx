// ── src/app/(dashboard)/dashboard/page.tsx ───────────────────────────────
'use client'

import { useAuthStore } from '@/store/authStore'
import { PermissionGuard } from '@/components/PermissionGuard'
import {
  LayoutDashboard, Users, FileText, Shield,
  TrendingUp, Activity, ArrowUpRight,
} from 'lucide-react'

const teal = '#03ADB4'
const pink = '#FD2EBB'
const navy = '#0B1628'

const STATS = [
  {
    label: 'Total Users',
    value: '142',
    change: '+12 this month',
    icon: Users,
    color: teal,
    bg: 'rgba(3,173,180,0.08)',
    border: 'rgba(3,173,180,0.18)',
  },
  {
    label: 'Active Posts',
    value: '38',
    change: '+5 this week',
    icon: FileText,
    color: pink,
    bg: 'rgba(253,46,187,0.08)',
    border: 'rgba(253,46,187,0.18)',
  },
  {
    label: 'Compliance Rate',
    value: '98.2%',
    change: '↑ 1.2% vs last quarter',
    icon: Shield,
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    border: 'rgba(22,163,74,0.18)',
  },
  {
    label: 'Active Sessions',
    value: '24',
    change: 'Right now',
    icon: Activity,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
  },
]

const RECENT_ACTIVITY = [
  { text: 'New user registered: D. Enkhjargal', time: '2 min ago', dot: teal },
  { text: 'Post "Mining Safety Update 2024" published', time: '1 hr ago', dot: pink },
  { text: 'Role permissions updated for "Moderator"', time: '3 hr ago', dot: '#f59e0b' },
  { text: 'System backup completed successfully', time: '6 hr ago', dot: '#16a34a' },
]

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      {/* ── Page heading ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard className="w-5 h-5" style={{ color: teal }} />
          <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
            Dashboard
          </h1>
        </div>
        <p style={{ color: '#6B7C93', fontSize: '0.9rem' }}>
          Welcome back{user?.first_name ? `, ${user.first_name}` : ''}! Here&apos;s your portal overview.
        </p>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, change, icon: Icon, color, bg, border }) => (
          <div
            key={label}
            className="rounded-2xl p-5 bg-white"
            style={{ border: `1px solid ${border}`, background: bg }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white"
                style={{ boxShadow: `0 4px 12px ${border}` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <TrendingUp className="w-4 h-4" style={{ color }} />
            </div>
            <div
              className="font-extrabold text-[1.8rem] leading-none mb-1"
              style={{ color: navy }}
            >
              {value}
            </div>
            <div className="font-semibold text-[0.85rem] mb-0.5" style={{ color: navy }}>
              {label}
            </div>
            <div className="text-[0.75rem]" style={{ color: '#6B7C93' }}>
              {change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Recent activity ── */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 bg-white"
          style={{ border: '1px solid rgba(11,22,40,0.08)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[1rem]" style={{ color: navy }}>
              Recent Activity
            </h2>
            <button
              className="flex items-center gap-1 text-[0.78rem] font-semibold"
              style={{ color: teal }}
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-0">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3"
                style={{
                  borderBottom:
                    i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(11,22,40,0.05)' : 'none',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.dot }}
                />
                <span className="flex-1 text-[0.85rem]" style={{ color: navy }}>
                  {item.text}
                </span>
                <span className="text-[0.75rem] flex-shrink-0" style={{ color: '#6B7C93' }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick actions ── */}
        <div className="space-y-4">
          <PermissionGuard role="Admin">
            <div
              className="rounded-2xl p-5 bg-white"
              style={{ border: '1px solid rgba(3,173,180,0.2)', background: 'rgba(3,173,180,0.04)' }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Shield className="w-4 h-4" style={{ color: teal }} />
                <span className="font-bold text-[0.875rem]" style={{ color: navy }}>
                  Admin Controls
                </span>
              </div>
              <p className="text-[0.78rem] mb-4" style={{ color: '#6B7C93' }}>
                Manage users, roles, and system-wide settings.
              </p>
              <a
                href="/users"
                className="block w-full text-center py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
              >
                Go to User Management
              </a>
            </div>
          </PermissionGuard>

          <div
            className="rounded-2xl p-5 bg-white"
            style={{ border: '1px solid rgba(11,22,40,0.08)' }}
          >
            <div className="font-bold text-[0.875rem] mb-2" style={{ color: navy }}>
              Your Roles
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user?.is_superuser && (
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(253,46,187,0.1)', color: pink }}
                >
                  Superuser
                </span>
              )}
              {user?.roles.map((r) => (
                <span
                  key={r.id}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(3,173,180,0.1)', color: teal }}
                >
                  {r.name}
                </span>
              ))}
              {!user?.is_superuser && (user?.roles.length ?? 0) === 0 && (
                <span className="text-[0.78rem]" style={{ color: '#6B7C93' }}>
                  No roles assigned
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
