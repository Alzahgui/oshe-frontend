// ── src/app/(portal)/portal/training/page.tsx ────────────────────────────
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen, CheckCircle, Clock, AlertCircle,
  Download, X, Award,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Mock training data ──────────────────────────────────────────────────────
type TrainingStatus = 'done' | 'ongoing' | 'waiting'

interface Training {
  id: number
  name: string
  status: TrainingStatus
  statusLabel: string
  dateRange: string
  hasCert: boolean
}

const ALL_TRAININGS: Training[] = [
  {
    id: 1,
    name: 'ISO 45001 Lead Auditor Сургалт',
    status: 'done',
    statusLabel: 'Дуусгасан',
    dateRange: '2024.12.15 – 12.19',
    hasCert: true,
  },
  {
    id: 2,
    name: 'Гал аюулаас хамгаалах гэрчилгээ',
    status: 'ongoing',
    statusLabel: 'Явагдаж байна',
    dateRange: '2024.12.22',
    hasCert: false,
  },
  {
    id: 3,
    name: 'Ажлын байрны эрсдэлийн үнэлгээ',
    status: 'waiting',
    statusLabel: 'Хүлээж байна',
    dateRange: '2025.01.22',
    hasCert: false,
  },
  {
    id: 4,
    name: 'Уурхайн аюулгүй ажиллагааны сургалт',
    status: 'waiting',
    statusLabel: 'Хүлээж байна',
    dateRange: '2025.02.05',
    hasCert: false,
  },
]

// ── Tab config ──────────────────────────────────────────────────────────────
const TABS: { key: 'all' | TrainingStatus; label: string }[] = [
  { key: 'all',     label: 'Бүгд' },
  { key: 'ongoing', label: 'Явагдаж байна' },
  { key: 'done',    label: 'Дуусгасан' },
  { key: 'waiting', label: 'Хүлээж байна' },
]

// ── Status badge + icon helpers ─────────────────────────────────────────────
const statusStyle: Record<TrainingStatus, { bg: string; color: string }> = {
  done:    { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  ongoing: { bg: 'rgba(3,173,180,0.1)',  color: teal },
  waiting: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
}

function StatusBadge({ status, label }: { status: TrainingStatus; label: string }) {
  const s = statusStyle[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {status === 'done'    && <CheckCircle className="w-3 h-3" />}
      {status === 'ongoing' && <Clock       className="w-3 h-3" />}
      {status === 'waiting' && <AlertCircle className="w-3 h-3" />}
      {label}
    </span>
  )
}

function StatusIcon({ status }: { status: TrainingStatus }) {
  const s = statusStyle[status]
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: s.bg, color: s.color }}
    >
      {status === 'done'    && <CheckCircle className="w-5 h-5" />}
      {status === 'ongoing' && <Clock       className="w-5 h-5" />}
      {status === 'waiting' && <AlertCircle className="w-5 h-5" />}
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function TrainingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'all' | TrainingStatus>('all')
  const [trainings, setTrainings] = useState<Training[]>(ALL_TRAININGS)

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  const filtered =
    activeTab === 'all'
      ? trainings
      : trainings.filter((t) => t.status === activeTab)

  const handleCancel = (id: number) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id))
  }

  const stats = {
    total:   ALL_TRAININGS.length,
    done:    ALL_TRAININGS.filter((t) => t.status === 'done').length,
    ongoing: ALL_TRAININGS.filter((t) => t.status === 'ongoing').length,
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Page title */}
      <div>
        <h1 className="font-extrabold text-2xl" style={{ color: navy }}>Миний сургалтууд</h1>
        <p className="text-sm mt-1" style={{ color: '#6B7C93' }}>
          Таны бүртгүүлсэн болон дууссан сургалтуудын жагсаалт
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Нийт бүртгүүлсэн', value: stats.total,   icon: <BookOpen className="w-5 h-5" />, color: teal },
          { label: 'Дуусгасан',         value: stats.done,    icon: <Award    className="w-5 h-5" />, color: '#059669' },
          { label: 'Явагдаж байна',     value: stats.ongoing, icon: <Clock    className="w-5 h-5" />, color: '#d97706' },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5"
            style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}18`, color: s.color }}
            >
              {s.icon}
            </div>
            <div className="font-extrabold text-2xl leading-none" style={{ color: navy }}>{s.value}</div>
            <div className="text-[0.78rem] mt-1.5 font-medium" style={{ color: '#6B7C93' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto" style={{ borderBottom: '1px solid rgba(11,22,40,0.08)' }}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all relative flex-shrink-0"
              style={{ color: active ? teal : '#6B7C93' }}
            >
              {tab.label}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                  style={{ background: teal }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Training list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div
            className="bg-white rounded-2xl p-10 text-center"
            style={{ border: '1px solid rgba(11,22,40,0.07)' }}
          >
            <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color: '#d1d5db' }} />
            <p className="font-semibold" style={{ color: '#6B7C93' }}>Сургалт олдсонгүй</p>
          </div>
        )}

        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
          >
            <StatusIcon status={t.status} />

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: navy }}>{t.name}</p>
              <p className="text-[0.75rem] mt-0.5" style={{ color: '#6B7C93' }}>{t.dateRange}</p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <StatusBadge status={t.status} label={t.statusLabel} />

              {t.hasCert && (
                <button
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:shadow-lg hover:scale-[1.03]"
                  style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Гэрчилгээ татах
                </button>
              )}

              {t.status === 'waiting' && (
                <button
                  onClick={() => handleCancel(t.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-red-50"
                  style={{ border: '1.5px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
                >
                  <X className="w-3.5 h-3.5" />
                  Цуцлах
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
