'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  FileDown,
  Send,
  ClipboardList,
  Lightbulb,
} from 'lucide-react'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Zod schema ────────────────────────────────────────────────────────────

const schema = z.object({
  incident_type: z.string().min(1, 'Ослын төрлийг сонгоно уу'),
  date: z.string().min(1, 'Огноог оруулна уу'),
  location: z.string().min(1, 'Газрыг оруулна уу'),
  description: z.string().min(20, 'Дэлгэрэнгүй тайлбар дор хаяж 20 тэмдэгт байна'),
  injured_count: z.number().min(0, 'Тоо 0-с их байна'),
  severity: z.string().min(1, 'Хүндийн зэргийг сонгоно уу'),
  measures_taken: z.string().optional(),
})

type IncidentFormData = z.infer<typeof schema>

// ── Mock AI result ────────────────────────────────────────────────────────

const MOCK_ANALYSIS = {
  risk_level: 'Өндөр эрсдэл',
  summary:
    'Оруулсан мэдээллийн дагуу уг аюулт тохиолдол нь ажлын байрны аюулгүй байдлын журмыг дагаагүйтэй шууд холбоотой болохыг харуулж байна. Хохирогчийн тоо болон гэмтлийн ноцтой байдлыг харгалзан үзэхэд ажлын байрны эрсдэлийн үнэлгээг яаралтай шинэчлэх шаардлагатай. AI дүн шинжилгээ нь ижил төстэй 347 тохиолдолтой харьцуулан дараах дүгнэлтэд хүрлээ.',
  recommendations: [
    {
      title: 'Яаралтай арга хэмжээ',
      text: 'Тухайн ажлын хэсгийг аюулгүй байдлын дахин үнэлгээ хийх хүртэл түр зогсоож, ажилчдад анхны тусламжийн сургалт явуулах.',
    },
    {
      title: 'Урьдчилан сэргийлэх арга хэмжээ',
      text: 'PPE (хувийн хамгаалах хэрэгсэл) хэрэглээний мониторинг тогтмолжуулах, аюулгүй байдлын дохиолол, самбарыг шинэчлэх.',
    },
    {
      title: 'Хууль, дүрэм журмын дагуу',
      text: 'Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн тухай хуулийн 29.1-р зүйлд заасны дагуу 24 цагийн дотор ХАБЭА-ийн байгууллагад мэдэгдэх үүрэгтэй.',
    },
  ],
}

// ── Helper components ─────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-[0.75rem] text-red-400">{message}</p>
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: '#1e293b' }}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border text-[0.9rem] outline-none transition-colors bg-white'
const inputStyle = { borderColor: '#e2e8f0', color: '#0f172a' }

// ── Page ──────────────────────────────────────────────────────────────────

export default function IncidentAnalysisPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormData>({ resolver: zodResolver(schema) as never })

  const onSubmit = async (data: IncidentFormData) => {
    void data // TODO: POST to /api/incident-reports/
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
  }

  return (
    <div style={{ fontFamily: 'var(--font-sans-app), sans-serif' }}>
      <title>Аюулт Тохиолдолын Судалгаа — MANOSH</title>

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
            <Shield className="w-4 h-4" style={{ color: teal }} />
            <span
              className="text-[0.78rem] font-bold tracking-widest"
              style={{ color: teal }}
            >
              AI ШИНЖИЛГЭЭ
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Аюулт Тохиолдолын
            <br />
            <span style={{ color: teal }}>Судалгаа</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-[1rem] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Ажлын байрны аюулт тохиолдлын дэлгэрэнгүй мэдээллийг оруулснаар AI технологи ашиглан
            дүн шинжилгээ хийж, тайлан гаргана.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(3,173,180,0.1)' }}
                >
                  <ClipboardList className="w-5 h-5" style={{ color: teal }} />
                </div>
                <div>
                  <h2 className="text-[1.15rem] font-bold" style={{ color: navy }}>
                    Тохиолдлын мэдэгдэл
                  </h2>
                  <p className="text-[0.8rem]" style={{ color: '#64748b' }}>
                    Бүх талбарыг үнэн зөв бөглөнө үү
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Incident type */}
                <div>
                  <Label required>Ослын төрөл</Label>
                  <select
                    {...register('incident_type')}
                    className={inputCls}
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    <option value="">Ослын төрлийг сонгоно уу</option>
                    <option>Унаж бэртсэн</option>
                    <option>Хөдөлгөөнт хэрэгсэлтэй холбоотой</option>
                    <option>Химийн бодисын нөлөөлөл</option>
                    <option>Дулааны гэмтэл</option>
                    <option>Цахилгааны осол</option>
                    <option>Бусад</option>
                  </select>
                  <FieldError message={errors.incident_type?.message} />
                </div>

                {/* Date + Location (row) */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label required>Тохиолдсон огноо</Label>
                    <input
                      type="date"
                      {...register('date')}
                      className={inputCls}
                      style={inputStyle}
                    />
                    <FieldError message={errors.date?.message} />
                  </div>
                  <div>
                    <Label required>Тохиолдсон газар</Label>
                    <input
                      type="text"
                      placeholder="Барилга, тасаг, газар зүйн байршил…"
                      {...register('location')}
                      className={inputCls}
                      style={inputStyle}
                    />
                    <FieldError message={errors.location?.message} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label required>Дэлгэрэнгүй тайлбар</Label>
                  <textarea
                    rows={5}
                    placeholder="Юу болсныг дэлгэрэнгүй тайлбарлана уу…"
                    {...register('description')}
                    className={inputCls}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                  <FieldError message={errors.description?.message} />
                </div>

                {/* Injured count + Severity (row) */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Хохирогчийн тоо</Label>
                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...register('injured_count', { valueAsNumber: true })}
                      className={inputCls}
                      style={inputStyle}
                    />
                    <FieldError message={errors.injured_count?.message} />
                  </div>
                  <div>
                    <Label required>Хүндийн зэрэг</Label>
                    <select
                      {...register('severity')}
                      className={inputCls}
                      style={{ ...inputStyle, appearance: 'auto' }}
                    >
                      <option value="">Сонгоно уу</option>
                      <option>Хөнгөн</option>
                      <option>Дунд зэрэг</option>
                      <option>Хүнд</option>
                      <option>Амь насанд аюул учирсан</option>
                    </select>
                    <FieldError message={errors.severity?.message} />
                  </div>
                </div>

                {/* Measures taken */}
                <div>
                  <Label>Авсан арга хэмжээ</Label>
                  <textarea
                    rows={3}
                    placeholder="Тохиолдлын дараа хийсэн арга хэмжээ…"
                    {...register('measures_taken')}
                    className={inputCls}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-[0.95rem] transition-opacity disabled:opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${teal}, #028E95)`,
                  }}
                >
                  {isSubmitting ? 'Шинжилж байна…' : 'AI шинжилгээ хийх'}
                </button>
              </form>
            </div>
          </div>

          {/* ── Right: Info cards ── */}
          <div className="space-y-5">
            {/* Why report */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                <h3 className="font-bold text-[0.95rem]" style={{ color: navy }}>
                  Яагаад мэдэгдэх вэ?
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Ирээдүйн ослоос урьдчилан сэргийлэх боломж олгоно',
                  'Ажлын байрны аюулгүй байдлын соёлыг сайжруулна',
                  'Хөдөлмөрийн хуулиар заавал мэдэгдэх үүрэгтэй',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: teal }}
                    />
                    <span className="text-[0.83rem] leading-relaxed" style={{ color: '#475569' }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: `linear-gradient(135deg, ${navy} 0%, #0d2040 100%)`,
                border: '1px solid rgba(3,173,180,0.2)',
              }}
            >
              <h3 className="font-bold text-white text-[0.95rem] mb-4">Тусламж хэрэгтэй юу?</h3>
              <p className="text-[0.82rem] mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Яаралтай тохиолдол буюу тусламж хэрэгтэй бол манай мэргэжилтнүүдтэй шууд холбогдоно уу.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(3,173,180,0.2)' }}
                  >
                    <Phone className="w-4 h-4" style={{ color: teal }} />
                  </div>
                  <div>
                    <div className="text-[0.7rem] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Утасны дугаар
                    </div>
                    <div className="text-white font-bold text-[0.88rem]">+976 11-329-000</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(3,173,180,0.2)' }}
                  >
                    <Mail className="w-4 h-4" style={{ color: teal }} />
                  </div>
                  <div>
                    <div className="text-[0.7rem] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      И-мэйл
                    </div>
                    <div className="text-white font-bold text-[0.88rem]">safety@manosh.mn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── AI Results ── */}
        {submitted && (
          <div className="mt-12">
            {/* Section title */}
            <div className="flex items-center gap-3 mb-7">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(3,173,180,0.12)' }}
              >
                <Lightbulb className="w-5 h-5" style={{ color: teal }} />
              </div>
              <div>
                <h2 className="text-[1.25rem] font-extrabold" style={{ color: navy }}>
                  Дүн шинжилгээний тайлан
                </h2>
                <p className="text-[0.8rem]" style={{ color: '#64748b' }}>
                  AI технологид суурилсан шинжилгээний үр дүн
                </p>
              </div>
            </div>

            {/* Risk badge + summary */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-6"
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-start gap-4 flex-wrap">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.82rem] font-bold flex-shrink-0"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    color: '#dc2626',
                    border: '1px solid rgba(239,68,68,0.25)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {MOCK_ANALYSIS.risk_level}
                </span>
                <p className="text-[0.9rem] leading-relaxed flex-1" style={{ color: '#334155' }}>
                  {MOCK_ANALYSIS.summary}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid sm:grid-cols-3 gap-5 mb-7">
              {MOCK_ANALYSIS.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'rgba(3,173,180,0.1)' }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: teal }} />
                  </div>
                  <h4 className="font-bold text-[0.88rem] mb-2" style={{ color: navy }}>
                    {rec.title}
                  </h4>
                  <p className="text-[0.82rem] leading-relaxed" style={{ color: '#64748b' }}>
                    {rec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[0.88rem] text-white transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${teal}, #028E95)` }}
              >
                <FileDown className="w-4 h-4" />
                PDF татах
              </button>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[0.88rem] transition-opacity hover:opacity-90"
                style={{
                  background: 'rgba(3,173,180,0.08)',
                  color: teal,
                  border: `1px solid rgba(3,173,180,0.3)`,
                }}
              >
                <Send className="w-4 h-4" />
                И-мэйлээр илгээх
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
