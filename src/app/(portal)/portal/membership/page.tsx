// ── src/app/(portal)/portal/membership/page.tsx ──────────────────────────
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, CreditCard, User, Building2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Mock payment history ────────────────────────────────────────────────────
const PAYMENTS = [
  { date: '2025.01.05', description: 'Байгууллагын гишүүнчлэл 2025', amount: '500,000₮', status: 'success' },
  { date: '2024.01.10', description: 'Байгууллагын гишүүнчлэл 2024', amount: '500,000₮', status: 'success' },
  { date: '2023.12.28', description: 'Байгууллагын гишүүнчлэл 2023', amount: '450,000₮', status: 'waiting' },
]

// ── Plan config ─────────────────────────────────────────────────────────────
const PLANS = [
  {
    key: 'individual',
    label: 'Хувь хүний гишүүнчлэл',
    price: '150,000₮',
    period: 'жил',
    icon: <User className="w-5 h-5" />,
    features: ['ХАБЭА материалд хандах', 'Сургалтын хөнгөлөлт', 'Мэдэгдэл авах'],
  },
  {
    key: 'corporate',
    label: 'Байгууллагын гишүүнчлэл',
    price: '500,000₮',
    period: 'жил',
    icon: <Building2 className="w-5 h-5" />,
    features: ['Ажилтнуудын бүртгэл', 'Онцгой материалууд', 'Зөвлөгөө авах', 'ISO аудит хөнгөлөлт'],
    highlighted: true,
  },
]

// ── QR Placeholder ──────────────────────────────────────────────────────────
function QRPlaceholder() {
  return (
    <div
      className="w-28 h-28 flex items-center justify-center rounded-xl mx-auto"
      style={{ background: '#e5e7eb', border: '1px dashed #9ca3af' }}
    >
      <div className="text-center">
        <div className="text-[0.6rem] font-semibold" style={{ color: '#6b7280' }}>QR Code</div>
        <div className="mt-1 grid grid-cols-4 gap-0.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-sm"
              style={{ background: Math.random() > 0.5 ? '#374151' : '#e5e7eb' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function MembershipPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [activePayment, setActivePayment] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="animate-spin w-8 h-8 border-4 rounded-full"
          style={{ borderColor: teal, borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page title */}
      <div>
        <h1 className="font-extrabold text-2xl" style={{ color: navy }}>Гишүүнчлэл</h1>
        <p className="text-sm mt-1" style={{ color: '#6B7C93' }}>
          Таны гишүүнчлэлийн мэдээлэл, төлбөрийн түүх
        </p>
      </div>

      {/* ── Current membership card ── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: navy }}
      >
        {/* Decorative */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 80% at 100% 0%, rgba(3,173,180,0.2) 0%, transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(253,46,187,0.1) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(3,173,180,0.2)', border: '1px solid rgba(3,173,180,0.35)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[0.72rem] font-bold tracking-wider" style={{ color: teal }}>
                  ИДЭВХТЭЙ
                </span>
              </div>
              <h2 className="font-extrabold text-white text-xl">Байгууллагын гишүүн</h2>
              <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                MANOSH гишүүнчлэл
              </p>
            </div>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(3,173,180,0.2)', border: '1px solid rgba(3,173,180,0.3)' }}
            >
              <CreditCard className="w-7 h-7" style={{ color: teal }} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Дуусах хугацаа', value: '2025.12.31' },
              { label: 'Гишүүн болсон', value: '2023.01.15' },
              { label: 'Дараагийн төлбөр', value: '500,000₮' },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[0.72rem] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {item.label}
                </p>
                <p className="font-bold text-white text-sm mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Payment history ── */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(11,22,40,0.07)', boxShadow: '0 1px 6px rgba(11,22,40,0.05)' }}
      >
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(11,22,40,0.07)' }}>
          <h2 className="font-bold text-base" style={{ color: navy }}>Төлбөрийн түүх</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Огноо', 'Тайлбар', 'Дүн', 'Статус'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-[0.75rem] font-semibold"
                    style={{ color: '#6B7C93' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-gray-50"
                  style={{ borderTop: '1px solid rgba(11,22,40,0.05)' }}
                >
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: navy }}>
                    {p.date}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#6B7C93' }}>
                    {p.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: navy }}>
                    {p.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold"
                      style={
                        p.status === 'success'
                          ? { background: 'rgba(16,185,129,0.1)', color: '#059669' }
                          : { background: 'rgba(245,158,11,0.1)', color: '#d97706' }
                      }
                    >
                      {p.status === 'success' && <CheckCircle className="w-3 h-3" />}
                      {p.status === 'success' ? 'Амжилттай' : 'Хүлээгдэж байна'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Renewal section ── */}
      <div>
        <h2 className="font-bold text-lg mb-1" style={{ color: navy }}>Гишүүнчлэл сунгах</h2>
        <p className="text-sm mb-5" style={{ color: '#6B7C93' }}>
          Та доорх сонголтуудаас нэгийг сонгон QR кодоор төлбөр хийнэ үү
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {PLANS.map((plan) => {
            const selected = selectedPlan === plan.key
            return (
              <div
                key={plan.key}
                className="bg-white rounded-2xl p-6 cursor-pointer transition-all"
                onClick={() => setSelectedPlan(selected ? null : plan.key)}
                style={{
                  border: selected
                    ? `2px solid ${teal}`
                    : plan.highlighted
                    ? '2px solid rgba(3,173,180,0.2)'
                    : '1.5px solid rgba(11,22,40,0.08)',
                  boxShadow: selected
                    ? '0 4px 20px rgba(3,173,180,0.15)'
                    : '0 1px 6px rgba(11,22,40,0.05)',
                }}
              >
                {/* Plan header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(3,173,180,0.1)', color: teal }}
                    >
                      {plan.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight" style={{ color: navy }}>
                        {plan.label}
                      </p>
                      <p className="font-extrabold text-lg leading-tight" style={{ color: teal }}>
                        {plan.price}
                        <span className="text-sm font-medium text-gray-400">/{plan.period}</span>
                      </p>
                    </div>
                  </div>
                  {plan.highlighted && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold"
                      style={{ background: 'rgba(253,46,187,0.1)', color: '#FD2EBB' }}
                    >
                      Алдартай
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#6B7C93' }}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#059669' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Payment methods — show only when selected */}
                {selected && (
                  <div
                    className="mt-4 pt-4 space-y-4"
                    style={{ borderTop: '1px solid rgba(11,22,40,0.07)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* QPay */}
                    <div>
                      <button
                        className="w-full py-2.5 rounded-xl text-sm font-bold text-white mb-3 transition-all hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
                        onClick={() => setActivePayment(activePayment === `${plan.key}-qpay` ? null : `${plan.key}-qpay`)}
                      >
                        QPay-аар төлөх
                      </button>
                      {activePayment === `${plan.key}-qpay` && (
                        <div className="text-center space-y-2">
                          <QRPlaceholder />
                          <p className="text-[0.72rem]" style={{ color: '#6B7C93' }}>
                            QPay QR кодыг уншуулан төлбөр хийнэ үү
                          </p>
                        </div>
                      )}
                    </div>

                    {/* SocialPay */}
                    <div>
                      <button
                        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-md"
                        style={{ border: `1.5px solid ${teal}`, color: teal, background: 'transparent' }}
                        onClick={() => setActivePayment(activePayment === `${plan.key}-socialpay` ? null : `${plan.key}-socialpay`)}
                      >
                        SocialPay-аар төлөх
                      </button>
                      {activePayment === `${plan.key}-socialpay` && (
                        <div className="text-center space-y-2 mt-3">
                          <QRPlaceholder />
                          <p className="text-[0.72rem]" style={{ color: '#6B7C93' }}>
                            SocialPay QR кодыг уншуулан төлбөр хийнэ үү
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA when not selected */}
                {!selected && (
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
                    style={{ border: `1.5px solid ${teal}`, color: teal, background: 'transparent' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.key) }}
                  >
                    Энэ сонголт сонгох
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Note */}
        <p
          className="text-center text-[0.78rem] mt-5 font-medium"
          style={{ color: '#6B7C93' }}
        >
          Төлбөр амжилттай болсны дараа таны эрх автоматаар сунгагдана
        </p>
      </div>
    </div>
  )
}
