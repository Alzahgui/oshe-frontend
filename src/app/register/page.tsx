// ── src/app/register/page.tsx ──────────────────────────────────────────────
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Shield, Building2, Users, Award,
  Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight,
} from 'lucide-react'
import { api } from '@/lib/axios'

const teal = '#03ADB4'
const navy = '#0B1628'

// ── Zod schema ─────────────────────────────────────────────────────────────
const registerSchema = z
  .object({
    first_name: z.string().min(1, 'Овог оруулна уу'),
    last_name: z.string().min(1, 'Нэр оруулна уу'),
    email: z.string().email('Зөв и-мэйл хаяг оруулна уу'),
    phone: z.string().optional(),
    organization: z.string().optional(),
    membership_type: z.enum(['individual', 'corporate']),
    password: z.string().min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байна'),
    confirm_password: z.string().min(1, 'Нууц үгийг давтана уу'),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: 'Нууц үг таарахгүй байна',
    path: ['confirm_password'],
  })

type RegisterValues = z.infer<typeof registerSchema>

// ── Reusable input wrapper ──────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[0.75rem]" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function inputStyle(hasError: boolean) {
  return {
    border: hasError ? '1.5px solid #ef4444' : '1.5px solid rgba(11,22,40,0.12)',
    color: navy,
  } as React.CSSProperties
}

function handleFocus(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  if (!hasError) e.currentTarget.style.borderColor = teal
}
function handleBlur(e: React.FocusEvent<HTMLInputElement>, hasError: boolean) {
  if (!hasError) e.currentTarget.style.borderColor = 'rgba(11,22,40,0.12)'
}

// ── Google SVG icon ─────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.34-8.16 2.34-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

// ── Facebook SVG icon ───────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')
  const [socialAlert, setSocialAlert] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { membership_type: 'individual' },
  })

  const membershipType = watch('membership_type')

  const onSubmit = async (data: RegisterValues) => {
    setServerError('')
    try {
      await api.post('/auth/register/', data)
      router.push('/login?registered=1')
    } catch (err: unknown) {
      const resp = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } })
        ?.response?.data
      const firstFieldError = resp?.errors && Object.values(resp.errors)[0]?.[0]
      setServerError(resp?.message ?? firstFieldError ?? 'Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.')
    }
  }

  const handleSocialStub = (provider: string) => {
    setSocialAlert(`${provider}-р бүртгүүлэх тун удахгүй нэмэгдэнэ!`)
    setTimeout(() => setSocialAlert(''), 3000)
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-sans-app), sans-serif' }}>

      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[52%] relative flex-col"
        style={{ background: navy }}
      >
        {/* Decorative gradients */}
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
              <div className="font-extrabold text-[1.1rem] leading-tight text-white">MANOSH</div>
              <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
                МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
              </div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-auto mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(3,173,180,0.15)', border: '1px solid rgba(3,173,180,0.3)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: teal }} />
              <span className="text-[0.72rem] font-bold tracking-wider" style={{ color: teal }}>
                ГИШҮҮН БОЛОХ
              </span>
            </div>

            <h1
              className="font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem,2.8vw,2.5rem)' }}
            >
              Аюулгүй ажлын байрыг{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #03ADB4 0%, #FD2EBB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                хамтдаа бүтээцгээе
              </span>
            </h1>
            <p className="leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
              MANOSH гишүүнчлэлд нэгдэж ХАБЭА-ын дэлхийн шилдэг туршлагаас суралцаж, байгууллагынхаа аюулгүй орчныг бүтээ.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { icon: <Building2 className="w-4 h-4" style={{ color: teal }} />, bg: 'rgba(3,173,180,0.12)', border: 'rgba(3,173,180,0.2)', value: '2,847+', label: 'гишүүн байгуулага' },
                { icon: <Users className="w-4 h-4" style={{ color: '#FD2EBB' }} />, bg: 'rgba(253,46,187,0.12)', border: 'rgba(253,46,187,0.2)', value: '47,000+', label: 'хамгаалагдсан ажилчин' },
                { icon: <Award className="w-4 h-4" style={{ color: teal }} />, bg: 'rgba(3,173,180,0.12)', border: 'rgba(3,173,180,0.2)', value: '98.2%', label: 'нийцлийн түвшин' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  >
                    {s.icon}
                  </div>
                  <div className="font-extrabold text-white text-[1.2rem] leading-none">{s.value}</div>
                  <div className="text-[0.72rem] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { icon: <Shield className="w-3 h-3" />, label: 'ISO 45001 Нийцэл' },
              { icon: <Award className="w-3 h-3" />, label: 'Гэрчилгээ' },
              { icon: <Users className="w-3 h-3" />, label: 'Хамт олон' },
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

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10" style={{ background: '#F8FAFC' }}>
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-8">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
          />
          <div>
            <div className="font-extrabold text-[1.1rem] leading-tight" style={{ color: navy }}>MANOSH</div>
            <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: '#6B7C93' }}>
              МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
            </div>
          </div>
        </div>

        <div className="w-full max-w-[460px]">
          <div className="mb-7">
            <h2 className="font-extrabold text-[1.65rem] leading-tight mb-2" style={{ color: navy }}>
              Гишүүн болох
            </h2>
            <p className="text-[0.9rem]" style={{ color: '#6B7C93' }}>
              MANOSH гишүүний порталд бүртгүүлэх
            </p>
          </div>

          {/* Social alert */}
          {socialAlert && (
            <div
              className="rounded-xl px-4 py-3 text-[0.82rem] font-medium mb-4"
              style={{ background: 'rgba(3,173,180,0.08)', border: '1px solid rgba(3,173,180,0.25)', color: '#027a80' }}
            >
              {socialAlert}
            </div>
          )}

          {/* Server error */}
          {serverError && (
            <div
              className="rounded-xl px-4 py-3 text-[0.82rem] font-medium mb-4"
              style={{ background: 'rgba(253,46,187,0.08)', border: '1px solid rgba(253,46,187,0.25)', color: '#c0185a' }}
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Овог" error={errors.first_name?.message}>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                  <input
                    {...register('first_name')}
                    type="text"
                    autoComplete="given-name"
                    placeholder="Овог"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                    style={inputStyle(!!errors.first_name)}
                    onFocus={(e) => handleFocus(e, !!errors.first_name)}
                    onBlur={(e) => handleBlur(e, !!errors.first_name)}
                  />
                </div>
              </Field>

              <Field label="Нэр" error={errors.last_name?.message}>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                  <input
                    {...register('last_name')}
                    type="text"
                    autoComplete="family-name"
                    placeholder="Нэр"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                    style={inputStyle(!!errors.last_name)}
                    onFocus={(e) => handleFocus(e, !!errors.last_name)}
                    onBlur={(e) => handleBlur(e, !!errors.last_name)}
                  />
                </div>
              </Field>
            </div>

            {/* Email */}
            <Field label="И-мэйл хаяг" error={errors.email?.message}>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="та@байгууллага.mn"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                  style={inputStyle(!!errors.email)}
                  onFocus={(e) => handleFocus(e, !!errors.email)}
                  onBlur={(e) => handleBlur(e, !!errors.email)}
                />
              </div>
            </Field>

            {/* Phone + Org row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Утасны дугаар" error={errors.phone?.message}>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                  <input
                    {...register('phone')}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+976 XXXX-XXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                    style={inputStyle(!!errors.phone)}
                    onFocus={(e) => handleFocus(e, !!errors.phone)}
                    onBlur={(e) => handleBlur(e, !!errors.phone)}
                  />
                </div>
              </Field>

              <Field label="Байгууллагын нэр" error={errors.organization?.message}>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                  <input
                    {...register('organization')}
                    type="text"
                    placeholder="Байгууллага"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                    style={inputStyle(!!errors.organization)}
                    onFocus={(e) => handleFocus(e, !!errors.organization)}
                    onBlur={(e) => handleBlur(e, !!errors.organization)}
                  />
                </div>
              </Field>
            </div>

            {/* Membership type */}
            <div>
              <label className="block text-[0.82rem] font-semibold mb-2" style={{ color: navy }}>
                Гишүүнчлэлийн төрөл
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: 'individual', label: 'Хувь хүн', icon: <User className="w-4 h-4" /> },
                  { value: 'corporate', label: 'Байгууллага', icon: <Building2 className="w-4 h-4" /> },
                ] as const).map((opt) => {
                  const active = membershipType === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue('membership_type', opt.value, { shouldValidate: true })}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: active ? 'rgba(3,173,180,0.1)' : 'white',
                        border: active ? `2px solid ${teal}` : '1.5px solid rgba(11,22,40,0.12)',
                        color: active ? teal : '#6B7C93',
                      }}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" {...register('membership_type')} />
            </div>

            {/* Password */}
            <Field label="Нууц үг" error={errors.password?.message}>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Хамгийн багадаа 8 тэмдэгт"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                  style={inputStyle(!!errors.password)}
                  onFocus={(e) => handleFocus(e, !!errors.password)}
                  onBlur={(e) => handleBlur(e, !!errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 transition-colors"
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" style={{ color: '#6B7C93' }} />
                    : <Eye className="w-4 h-4" style={{ color: '#6B7C93' }} />}
                </button>
              </div>
            </Field>

            {/* Confirm password */}
            <Field label="Нууц үгийг давтах" error={errors.confirm_password?.message}>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6B7C93' }} />
                <input
                  {...register('confirm_password')}
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Нууц үгийг дахин оруулна уу"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
                  style={inputStyle(!!errors.confirm_password)}
                  onFocus={(e) => handleFocus(e, !!errors.confirm_password)}
                  onBlur={(e) => handleBlur(e, !!errors.confirm_password)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 transition-colors"
                >
                  {showConfirm
                    ? <EyeOff className="w-4 h-4" style={{ color: '#6B7C93' }} />
                    : <Eye className="w-4 h-4" style={{ color: '#6B7C93' }} />}
                </button>
              </div>
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed mt-2"
              style={{
                background: 'linear-gradient(135deg, #03ADB4, #028E95)',
                boxShadow: '0 8px 25px rgba(3,173,180,0.35)',
              }}
            >
              {isSubmitting ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <>
                  Бүртгүүлэх <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(11,22,40,0.1)' }} />
            <span className="text-[0.75rem] font-medium" style={{ color: '#6B7C93' }}>эсвэл</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(11,22,40,0.1)' }} />
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialStub('Google')}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
              style={{
                background: 'white',
                border: '1.5px solid rgba(11,22,40,0.12)',
                color: '#3c4043',
              }}
            >
              <GoogleIcon />
              Google-ээр бүртгүүлэх
            </button>
            <button
              type="button"
              onClick={() => handleSocialStub('Facebook')}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
              style={{
                background: 'white',
                border: '1.5px solid rgba(11,22,40,0.12)',
                color: '#1877F2',
              }}
            >
              <FacebookIcon />
              Facebook-ээр бүртгүүлэх
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-[0.82rem] mt-6" style={{ color: '#6B7C93' }}>
            Аль хэдийн гишүүн үү?{' '}
            <Link href="/login" className="font-bold hover:underline" style={{ color: teal }}>
              Нэвтрэх
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
