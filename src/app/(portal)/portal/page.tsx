// ── src/app/(portal)/portal/page.tsx ─────────────────────────────────────
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, Award, Calendar, LogIn,
  CheckCircle, Clock, Download, Lock,
  FileText, RefreshCw,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Mock data ───────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Бүртгүүлсэн сургалт', value: 3, icon: <BookOpen className="w-5 h-5" />, color: teal },
  { label: 'Гэрчилгээ', value: 2, icon: <Award className="w-5 h-5" />, color: '#FD2EBB' },
  { label: 'Гишүүнчлэл хугацаа', value: '2025.12.31 хүртэл', icon: <Calendar className="w-5 h-5" />, color: '#6366f1' },
  { label: 'Нэвтэрсэн тоо', value: 12, icon: <LogIn className="w-5 h-5" />, color: '#f59e0b' },
]

const TRAININGS = [
  {
    name: 'ISO 45001 Lead Auditor Сургалт',
    status: 'done',
    statusLabel: 'Дуусгасан',
    date: '2024.12.15 – 12.19',
    hasCert: true,
  },
  {
    name: 'Гал аюулаас хамгаалах гэрчилгээ',
    status: 'ongoing',
    statusLabel: 'Явагдаж байна',
    date: '2024.12.22',
    hasCert: false,
  },
]

const RESOURCES = [
  { title: 'ISO 45001 хэрэгжүүлэх гарын авлага', ext: 'PDF' },
  { title: 'ХАБЭА аудитын хяналтын жагсаалт', ext: 'DOCX' },
  { title: 'Эрсдэлийн үнэлгээний загвар', ext: 'XLSX' },
]

// ── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    done:    { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
    ongoing: { bg: 'rgba(3,173,180,0.1)',  color: teal },
    waiting: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
    active:  { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
  }
  const s = styles[status] ?? { bg: 'rgba(11,22,40,0.08)', color: '#6B7C93' }
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {label}
    </span>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function PortalHomePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full" style={{ borderColor: teal, borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Welcome ── */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5"
        style={{ background: navy, position: 'relative', overflow: 'hidden' }}
      >
        {/* Decorative */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 80% at 100% 0%, rgba(3,173,180,0.2) 0%, transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(253,46,187,0.1) 0%, transparent 60%)',
          }}
        />
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-white text-xl flex-shrink-0 z-10"
          style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
        >
          {initials}
        </div>
        <div className="z-10">
          <h1 className="font-extrabold text-white text-2xl leading-tight">
            Сайн байна уу, {user.first_name}!
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            MANOSH гишүүний порталд тавтай морилно уу
          </p>
          <div className="mt-3">
            <StatusBadge status="active" label="Байгууллагын гишүүн" />
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
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
            <div className="font-extrabold text-xl leading-none" style={{ color: navy }}>
              {s.value}
            </div>
            <div className="text-[0.78rem] mt-1.5 font-medium" style={{ color: '#6B7C93' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Trainings — takes 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg" style={{ color: navy }}>Миний сургалтууд</h2>
            <Link
              href="/portal/training"
              className="text-sm font-semibold hover:underline"
              style={{ color: teal }}
            >
              Бүгдийг харах
            </Link>
          </div>
          <div className="space-y-3">
            {TRAININGS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: t.status === 'done' ? 'rgba(16,185,129,0.1)' : 'rgba(3,173,180,0.1)',
                    color: t.status === 'done' ? '#059669' : teal,
                  }}
                >
                  {t.status === 'done'
                    ? <CheckCircle className="w-5 h-5" />
                    : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: navy }}>{t.name}</p>
                  <p className="text-[0.75rem] mt-0.5" style={{ color: '#6B7C93' }}>{t.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={t.status} label={t.statusLabel} />
                  {t.hasCert && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-md"
                      style={{ background: teal, color: 'white' }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Гэрчилгээ
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Membership card */}
          <div
            className="bg-white rounded-2xl p-5 space-y-3"
            style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
          >
            <h2 className="font-bold text-base" style={{ color: navy }}>Гишүүнчлэл мэдээлэл</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#6B7C93' }}>Төрөл</span>
                <span className="font-semibold" style={{ color: navy }}>Байгууллагын гишүүн</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B7C93' }}>Дуусах хугацаа</span>
                <span className="font-semibold" style={{ color: navy }}>2025.12.31</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#6B7C93' }}>Статус</span>
                <StatusBadge status="active" label="Идэвхтэй" />
              </div>
            </div>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md mt-1"
              style={{ border: `1.5px solid ${teal}`, color: teal, background: 'transparent' }}
            >
              <RefreshCw className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
              Сунгах
            </button>
          </div>

          {/* Resources */}
          <div
            className="bg-white rounded-2xl p-5 space-y-3"
            style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
          >
            <h2 className="font-bold text-base" style={{ color: navy }}>Онцгой материалууд</h2>
            <div className="space-y-2">
              {RESOURCES.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#F8FAFC', border: '1px solid rgba(11,22,40,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(11,22,40,0.06)' }}
                  >
                    <Lock className="w-3.5 h-3.5" style={{ color: '#6B7C93' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: navy }}>{r.title}</p>
                    <p className="text-[0.65rem] mt-0.5" style={{ color: '#6B7C93' }}>{r.ext}</p>
                  </div>
                  <FileText className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
