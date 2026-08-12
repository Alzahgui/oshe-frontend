// ── src/components/MemberHeader.tsx ───────────────────────────────────────
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Shield, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navy = '#0B1628'
const teal = '#03ADB4'

const navLinks = [
  { href: '/portal', label: 'Нүүр' },
  { href: '/portal/training', label: 'Миний сургалтууд' },
  { href: '/portal/membership', label: 'Гишүүнчлэл' },
]

export default function MemberHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const initials =
    user
      ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()
      : '?'

  const displayName = user
    ? `${user.first_name} ${user.last_name}`.trim()
    : ''

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'white',
        borderBottom: '1px solid rgba(11,22,40,0.08)',
        boxShadow: '0 1px 8px rgba(11,22,40,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: navy }}
          >
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-[0.95rem] leading-tight" style={{ color: navy }}>
              MANOSH
            </div>
            <div className="text-[0.55rem] font-semibold tracking-wider" style={{ color: teal }}>
              ГИШҮҮНИЙ ПОРТАЛ
            </div>
          </div>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  color: active ? teal : '#6B7C93',
                  background: active ? 'rgba(3,173,180,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User section */}
        <div className="flex items-center gap-3">
          {/* Avatar + name */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
            >
              {initials}
            </div>
            <span
              className="hidden sm:block text-sm font-semibold truncate max-w-[140px]"
              style={{ color: navy }}
            >
              {displayName}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-red-50"
            style={{ color: '#6B7C93' }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Гарах</span>
          </button>
        </div>
      </div>
    </header>
  )
}
