// ── src/components/admin/AdminPageHeader.tsx ──────────────────────────────
import Link from 'next/link'
import { Plus, type LucideIcon } from 'lucide-react'

const navy = '#0B1628'
const teal = '#03ADB4'

export function AdminPageHeader({
  icon: Icon,
  title,
  subtitle,
  newHref,
  newLabel,
}: {
  icon: LucideIcon
  title: string
  subtitle?: string
  newHref?: string
  newLabel?: string
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-5 h-5" style={{ color: teal }} />
          <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>{title}</h1>
        </div>
        {subtitle && <p style={{ color: '#6B7C93', fontSize: '0.9rem' }}>{subtitle}</p>}
      </div>
      {newHref && (
        <Link
          href={newHref}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          <Plus className="w-4 h-4" /> {newLabel ?? 'Шинээр нэмэх'}
        </Link>
      )}
    </div>
  )
}
