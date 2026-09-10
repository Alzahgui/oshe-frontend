// ── src/components/LoginForm.tsx ──────────────────────────────────────────
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const teal = '#03ADB4'
const navy = '#0B1628'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    setServerError('')
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      const data = (err as { response?: { data?: {
        message?: string
        errors?: Record<string, string[]>
      } } })?.response?.data
      const firstFieldError = data?.errors && Object.values(data.errors)[0]?.[0]
      setServerError(data?.message ?? firstFieldError ?? 'Invalid credentials. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Email */}
      <div>
        <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
          Имэйл хаяг
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: '#6B7C93' }}
          />
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder="you@company.mn"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
            style={{
              border: errors.email
                ? '1.5px solid #ef4444'
                : '1.5px solid rgba(11,22,40,0.12)',
              color: navy,
            }}
            onFocus={(e) => !errors.email && (e.currentTarget.style.borderColor = teal)}
            onBlur={(e) =>
              !errors.email && (e.currentTarget.style.borderColor = 'rgba(11,22,40,0.12)')
            }
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[0.75rem]" style={{ color: '#ef4444' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[0.82rem] font-semibold" style={{ color: navy }}>
            Нууц үг
          </label>
          <a href="#" className="text-[0.78rem] font-semibold hover:underline" style={{ color: teal }}>
            Нууц үг ээ мартсан уу?
          </a>
        </div>
        <div className="relative">
          <Lock
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: '#6B7C93' }}
          />
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white focus:outline-none transition-all"
            style={{
              border: errors.password
                ? '1.5px solid #ef4444'
                : '1.5px solid rgba(11,22,40,0.12)',
              color: navy,
            }}
            onFocus={(e) => !errors.password && (e.currentTarget.style.borderColor = teal)}
            onBlur={(e) =>
              !errors.password && (e.currentTarget.style.borderColor = 'rgba(11,22,40,0.12)')
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors hover:bg-gray-100"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" style={{ color: '#6B7C93' }} />
            ) : (
              <Eye className="w-4 h-4" style={{ color: '#6B7C93' }} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-[0.75rem]" style={{ color: '#ef4444' }}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div
          className="rounded-xl px-4 py-3 text-[0.82rem] font-medium"
          style={{
            background: 'rgba(253,46,187,0.08)',
            border: '1px solid rgba(253,46,187,0.25)',
            color: '#c0185a',
          }}
        >
          {serverError}
        </div>
      )}

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
            Нэвтрэх <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
