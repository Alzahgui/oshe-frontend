// ── src/app/(auth)/login/page.tsx ─────────────────────────────────────────
'use client'

import Image from 'next/image'
import {
  Shield,
  Building2, Users, Award, HardHat, ChevronRight,
} from 'lucide-react'
import { LoginForm } from '@/components/LoginForm'

const teal = '#03ADB4'
const pink = '#FD2EBB'
const navy = '#0B1628'

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: 'var(--font-sans-app), sans-serif' }}
    >
      {/* ── Left panel – branding ── */}
      <div
        className="hidden lg:flex lg:w-[52%] relative flex-col"
        style={{ background: navy }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(70% 60% at 10% 40%, rgba(3,173,180,0.18) 0%, transparent 55%), radial-gradient(50% 50% at 90% 20%, rgba(253,46,187,0.12) 0%, transparent 50%), radial-gradient(40% 40% at 70% 80%, rgba(3,173,180,0.08) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl object-cover shadow-md flex-shrink-0"
            />
            <div>
              <div className="font-extrabold text-[1.1rem] leading-tight text-white">YOSH</div>
              <div
                className="text-[0.6rem] font-medium tracking-wider"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
              </div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-auto mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                background: 'rgba(3,173,180,0.15)',
                border: '1px solid rgba(3,173,180,0.3)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: teal }}
              />
              <span
                className="text-[0.72rem] font-bold tracking-wider"
                style={{ color: teal }}
              >
                 ПОРТАЛ
              </span>
            </div>

            <h1
              className="font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem,3vw,2.75rem)' }}
            >
              Монгол даяар{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #03ADB4 0%, #FD2EBB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Аюулгүй ажлын байр
              </span>{' '}
              бүтээж байна
            </h1>
            <p
              className="leading-relaxed max-w-md"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}
            >
              ХАБЭА хяналтын самбар, нийцлийн тайлан, сургалтын гэрчилгээ, AI технологи
              ашигласан аюулгүй ажиллагааны хэрэгслүүддээ нэг найдвартай порталаас хандаарай.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                {
                  icon: <Building2 className="w-4 h-4" style={{ color: teal }} />,
                  bg: 'rgba(3,173,180,0.12)',
                  border: 'rgba(3,173,180,0.2)',
                  value: '2,847+',
                  label: 'Гишүүн байгууллага',
                },
                {
                  icon: <Users className="w-4 h-4" style={{ color: pink }} />,
                  bg: 'rgba(253,46,187,0.12)',
                  border: 'rgba(253,46,187,0.2)',
                  value: '47,000+',
                  label: 'Хамгаалагдсан ажилчин',
                },
                {
                  icon: <Award className="w-4 h-4" style={{ color: teal }} />,
                  bg: 'rgba(3,173,180,0.12)',
                  border: 'rgba(3,173,180,0.2)',
                  value: '98.2%',
                  label: 'Нийцлийн түвшин',
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  >
                    {s.icon}
                  </div>
                  <div className="font-extrabold text-white text-[1.2rem] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[0.72rem] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { icon: <HardHat className="w-3 h-3" />, label: 'ISO 45001 Нийцэл' },
              { icon: <Shield className="w-3 h-3" />, label: 'Аюулгүйн аудит' },
              { icon: <Award className="w-3 h-3" />, label: 'Гэрчилгээ' },
            ].map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {f.icon} {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        style={{ background: '#F8FAFC' }}
      >
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
          />
          <div>
            <div className="font-extrabold text-[1.1rem] leading-tight" style={{ color: navy }}>
              YOSH
            </div>
            <div
              className="text-[0.6rem] font-medium tracking-wider"
              style={{ color: '#6B7C93' }}
            >
              МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
            </div>
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h2
              className="font-extrabold text-[1.75rem] leading-tight mb-2"
              style={{ color: navy }}
            >
              Тавтай морилно уу
            </h2>
            <p className="text-[0.9rem]" style={{ color: '#6B7C93' }}>
              Нэвтрэх
            </p>
          </div>

          {/* ── LoginForm component ── */}
          <LoginForm />

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(11,22,40,0.1)' }} />
            <span className="text-[0.75rem] font-medium" style={{ color: '#6B7C93' }}>
              эсвэл
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(11,22,40,0.1)' }} />
          </div>


          {/* Register */}
          <p className="text-center text-[0.82rem] mt-6" style={{ color: '#6B7C93' }}>
            Гишүүн болоогүй байна уу?{' '}
            <a href="#" className="font-bold hover:underline" style={{ color: teal }}>
              Гишүүнчлэлд хамрагдах <ChevronRight className="w-3 h-3 inline-block -mt-0.5" />
            </a>
          </p>

          {/* Footer note */}
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(11,22,40,0.07)' }}>
            <p
              className="text-center text-[0.72rem] leading-relaxed"
              style={{ color: '#6B7C93' }}
            >
              ISO 45001 стандартын дагуу хамгаалагдсан.
              <br />
              Тусламж хэрэгтэй юу?{' '}
              <a href="#" className="font-semibold hover:underline" style={{ color: teal }}>
                Дэмжлэгтэй холбогдох
              </a>{' '}
              эсвэл залгах{' '}
              <span style={{ color: navy, fontWeight: 600 }}>+976 11-329-000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
