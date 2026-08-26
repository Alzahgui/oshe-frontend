'use client'

import { useState } from 'react'
import {
  Shield,
  Calendar,
  Users,
  Globe,
  CheckCircle2,
  X,
  ChevronRight,
} from 'lucide-react'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Program data ──────────────────────────────────────────────────────────

type Status = 'active' | 'upcoming' | 'ended'

interface Program {
  id: number
  title: string
  subtitle: string
  description: string
  status: Status
  statusLabel: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  actionLabel: string
  date: string
  participants: string
}

const PROGRAMS: Program[] = [
  {
    id: 1,
    title: 'Zero Harm 2025',
    subtitle: 'Үндэсний аюулгүй ажиллагааны кампанит ажил',
    description:
      'Монгол улсын бүх аж ахуйн нэгжийг хамарсан "Тэг хохирол" зорилттой үндэсний хэмжээний аюулгүй байдлын кампанит ажил. Оролцогч байгууллагуудад мэргэжлийн зөвлөгөө, сертификат олгоно.',
    status: 'active',
    statusLabel: 'Явагдаж байна',
    icon: Shield,
    actionLabel: 'Оролцох',
    date: '2025.01–2025.12',
    participants: '1,240+ байгууллага',
  },
  {
    id: 2,
    title: 'ISO 45001 Нэвтрүүлэх хөтөлбөр',
    subtitle: 'Жижиг, дунд бизнест ISO стандарт',
    description:
      'Жижиг, дунд үйлдвэрийн газруудад ISO 45001:2018 стандартыг нэвтрүүлэхэд туслах тусгай хөтөлбөр. Хөтөлбөрт оролцогчид аудит, баримт бичгийн бүрдэл, дотоод шалгагчийн сургалтыг хүлээн авна.',
    status: 'active',
    statusLabel: 'Явагдаж байна',
    icon: CheckCircle2,
    actionLabel: 'Оролцох',
    date: '2025.03–2025.11',
    participants: '87 байгууллага',
  },
  {
    id: 3,
    title: 'ХАБЭА Мэргэжилтний сүлжээ',
    subtitle: 'Мэргэжлийн нэтвөркинг платформ',
    description:
      'Монгол улсын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн чиглэлийн мэргэжилтнүүдийг нэгтгэсэн мэдлэг хуваалцах, хамтран ажиллах нэтвөркинг платформ. Онлайн болон биечилсэн уулзалтууд зохион байгуулагдана.',
    status: 'upcoming',
    statusLabel: 'Удахгүй',
    icon: Users,
    actionLabel: 'Сонирхол илэрхийлэх',
    date: '2025.09–эрхгүй',
    participants: 'Нээлт хийгдэхгүй байна',
  },
  {
    id: 4,
    title: 'Уурхайн Аюулгүй Байдлын Форум 2025',
    subtitle: 'Жилийн уурхайн аюулгүй байдлын форум',
    description:
      'Уул уурхайн салбарын ХАБЭА-ийн мэргэжилтнүүд, удирдлагуудыг нэгтгэсэн жил бүрийн олон улсын форум. Дэлхийн тэргүүлэгч мэргэжилтнүүдийн илтгэл, кейс судалгаа, шинэлэг технологиудыг танилцуулна.',
    status: 'upcoming',
    statusLabel: 'Удахгүй',
    icon: Globe,
    actionLabel: 'Бүртгүүлэх',
    date: '2025.11.14–15',
    participants: '500+ оролцогч хүлээгдэж байна',
  },
]

// ── Status badge ──────────────────────────────────────────────────────────

const STATUS_STYLES: Record<Status, { bg: string; color: string; border: string }> = {
  active: {
    bg: 'rgba(16,185,129,0.1)',
    color: '#059669',
    border: 'rgba(16,185,129,0.25)',
  },
  upcoming: {
    bg: 'rgba(245,158,11,0.1)',
    color: '#d97706',
    border: 'rgba(245,158,11,0.25)',
  },
  ended: {
    bg: 'rgba(100,116,139,0.1)',
    color: '#64748b',
    border: 'rgba(100,116,139,0.25)',
  },
}

function StatusBadge({ status, label }: { status: Status; label: string }) {
  const s = STATUS_STYLES[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75rem] font-bold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {label}
    </span>
  )
}

// ── Participation form modal ───────────────────────────────────────────────

interface ModalProps {
  program: Program
  onClose: () => void
}

function ParticipationModal({ program, onClose }: ModalProps) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(11,22,40,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: navy, borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div>
            <h3 className="font-extrabold text-white text-[1rem]">{program.title}</h3>
            <p className="text-[0.75rem]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {program.actionLabel} — маягт бөглөх
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-6">
          {sent ? (
            /* Success state */
            <div className="text-center py-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(3,173,180,0.1)' }}
              >
                <CheckCircle2 className="w-7 h-7" style={{ color: teal }} />
              </div>
              <h4 className="font-extrabold text-[1.05rem] mb-2" style={{ color: navy }}>
                Амжилттай илгээгдлээ!
              </h4>
              <p className="text-[0.88rem] leading-relaxed" style={{ color: '#64748b' }}>
                Таны хүсэлт амжилттай илгээгдлээ. Бид тантай холбоо барина.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl font-bold text-[0.88rem] text-white"
                style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
              >
                Хаах
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
                    Нэр <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Таны бүтэн нэр"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-[0.88rem] outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0f172a' }}
                  />
                </div>
                <div>
                  <label className="block text-[0.8rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
                    И-мэйл <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.mn"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-[0.88rem] outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0f172a' }}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
                    Утас
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+976 9900 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-[0.88rem] outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0f172a' }}
                  />
                </div>
                <div>
                  <label className="block text-[0.8rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
                    Байгууллага
                  </label>
                  <input
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Байгууллагын нэр"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-[0.88rem] outline-none"
                    style={{ borderColor: '#e2e8f0', color: '#0f172a' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.8rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
                  Нэмэлт мэдэгдэл
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Асуулт, саналаа бичнэ үү…"
                  className="w-full px-3.5 py-2.5 rounded-xl border text-[0.88rem] outline-none"
                  style={{ borderColor: '#e2e8f0', color: '#0f172a', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white text-[0.9rem] transition-opacity disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
              >
                {loading ? 'Илгээж байна…' : 'Илгээх'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Program card ──────────────────────────────────────────────────────────

function ProgramCard({ program, onJoin }: { program: Program; onJoin: () => void }) {
  const Icon = program.icon

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col group transition-shadow hover:shadow-lg"
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      }}
    >
      {/* Card top strip */}
      <div
        className="h-1.5 w-full"
        style={{
          background:
            program.status === 'active'
              ? `linear-gradient(90deg, ${teal}, #028E95)`
              : program.status === 'upcoming'
              ? 'linear-gradient(90deg, #f59e0b, #d97706)'
              : 'linear-gradient(90deg, #94a3b8, #64748b)',
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(3,173,180,0.1)' }}
          >
            <Icon className="w-5 h-5" style={{ color: teal }} />
          </div>
          <StatusBadge status={program.status} label={program.statusLabel} />
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-[1.05rem] mb-1" style={{ color: navy }}>
          {program.title}
        </h3>
        <p className="text-[0.78rem] font-semibold mb-3" style={{ color: teal }}>
          {program.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-[0.84rem] leading-relaxed flex-1 mb-5"
          style={{ color: '#64748b' }}
        >
          {program.description}
        </p>

        {/* Meta info */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5 text-[0.75rem]"
          style={{ color: '#94a3b8' }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {program.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {program.participants}
          </span>
        </div>

        {/* Action button */}
        <button
          onClick={onJoin}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[0.88rem] transition-opacity hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, ${teal}, #028E95)`,
            color: '#fff',
          }}
        >
          {program.actionLabel}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Filter tabs ───────────────────────────────────────────────────────────

const FILTERS: { label: string; value: Status | 'all' }[] = [
  { label: 'Бүгд',          value: 'all' },
  { label: 'Явагдаж байна', value: 'active' },
  { label: 'Удахгүй',       value: 'upcoming' },
  { label: 'Дууссан',       value: 'ended' },
]

// ── Page ──────────────────────────────────────────────────────────────────

export default function ParticipationPage() {
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all')
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  const visible =
    activeFilter === 'all'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.status === activeFilter)

  return (
    <div style={{ fontFamily: 'var(--font-sans-app), sans-serif' }}>
      <title>Миний Оролцоо — MANOSH</title>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: navy }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 60% at 15% 50%, rgba(3,173,180,0.15) 0%, transparent 60%), radial-gradient(40% 40% at 85% 20%, rgba(253,46,187,0.1) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(3,173,180,0.15)', border: '1px solid rgba(3,173,180,0.3)' }}
          >
            <Users className="w-4 h-4" style={{ color: teal }} />
            <span
              className="text-[0.78rem] font-bold tracking-widest"
              style={{ color: teal }}
            >
              ОРОЛЦОО
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Миний{' '}
            <span style={{ color: teal }}>Оролцоо</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-[1rem] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Холбооноос зохион байгуулагдаж буй төсөл, хөтөлбрийн мэдээлэл байрших бөгөөд
            оролцохийг хүссэн маягт бөглөх боломжтой.
          </p>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-9">
          {FILTERS.map((f) => {
            const active = activeFilter === f.value
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="px-5 py-2.5 rounded-xl text-[0.85rem] font-bold transition-all"
                style={{
                  background: active ? teal : 'rgba(3,173,180,0.08)',
                  color:      active ? '#fff' : teal,
                  border:     active ? 'none' : '1px solid rgba(3,173,180,0.2)',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
          >
            <p className="text-[0.9rem]" style={{ color: '#94a3b8' }}>
              Энэ ангилалд хөтөлбөр байхгүй байна.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {visible.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onJoin={() => setSelectedProgram(program)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Modal ── */}
      {selectedProgram && (
        <ParticipationModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  )
}
