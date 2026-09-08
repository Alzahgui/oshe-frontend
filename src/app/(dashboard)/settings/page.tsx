// ── src/app/(dashboard)/settings/page.tsx ────────────────────────────────
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Settings, User, Lock, Bell, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navy = '#0B1628'
const teal = '#03ADB4'

// ── Profile schema ────────────────────────────────────────────────────────────
const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
})
type ProfileForm = z.infer<typeof profileSchema>

// ── Password schema ───────────────────────────────────────────────────────────
const passwordSchema = z
  .object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })
type PasswordForm = z.infer<typeof passwordSchema>

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
] as const

type TabId = (typeof TABS)[number]['id']

function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
        {label}
      </label>
      <input
        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
        style={{
          border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(11,22,40,0.12)',
          color: navy,
          background: 'white',
        }}
        onFocus={(e) => !error && (e.currentTarget.style.borderColor = teal)}
        onBlur={(e) => !error && (e.currentTarget.style.borderColor = 'rgba(11,22,40,0.12)')}
        {...props}
      />
      {error && <p className="mt-1 text-[0.75rem]" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  )
}

function ProfileTab() {
  const user = useAuthStore((s) => s.user)
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ProfileForm>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
      },
    })

  const onSubmit = async (data: ProfileForm) => {
    // TODO: PATCH /api/users/{user.id}/ with data
    void data
    await new Promise((r) => setTimeout(r, 600))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <InputField
          label="Last Name"
          error={errors.last_name?.message}
          {...register('last_name')}
        />
      </div>
      <InputField
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="pt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#16a34a' }}>
            <CheckCircle2 className="w-4 h-4" /> Saved
          </span>
        )}
      </div>
    </form>
  )
}

function SecurityTab() {
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) })

  const onSubmit = async (data: PasswordForm) => {
    // TODO: POST /api/users/change-password/ with data
    void data
    await new Promise((r) => setTimeout(r, 600))
    setSaved(true)
    reset()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label="Current Password"
        type="password"
        error={errors.current_password?.message}
        autoComplete="current-password"
        {...register('current_password')}
      />
      <InputField
        label="New Password"
        type="password"
        error={errors.new_password?.message}
        autoComplete="new-password"
        {...register('new_password')}
      />
      <InputField
        label="Confirm New Password"
        type="password"
        error={errors.confirm_password?.message}
        autoComplete="new-password"
        {...register('confirm_password')}
      />

      <div className="pt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          {isSubmitting ? 'Updating…' : 'Update Password'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#16a34a' }}>
            <CheckCircle2 className="w-4 h-4" /> Password updated
          </span>
        )}
      </div>
    </form>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    incidents: true,
    compliance: true,
    news: false,
    training: true,
  })

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }))

  const items = [
    { key: 'incidents' as const, label: 'Incident Alerts', desc: 'New workplace incidents reported in your region' },
    { key: 'compliance' as const, label: 'Compliance Reminders', desc: 'Upcoming audit deadlines and certification renewals' },
    { key: 'news' as const, label: 'YOSH Newsletter', desc: 'Monthly digest of news, events, and regulation changes' },
    { key: 'training' as const, label: 'Training Updates', desc: 'New courses and certification programs available' },
  ]

  return (
    <div className="space-y-4">
      {items.map(({ key, label, desc }) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ border: '1px solid rgba(11,22,40,0.07)', background: prefs[key] ? 'rgba(3,173,180,0.04)' : 'transparent' }}
        >
          <div>
            <div className="font-semibold text-[0.875rem]" style={{ color: navy }}>{label}</div>
            <div className="text-[0.78rem] mt-0.5" style={{ color: '#6B7C93' }}>{desc}</div>
          </div>
          <button
            type="button"
            onClick={() => toggle(key)}
            className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
            style={{ background: prefs[key] ? teal : 'rgba(11,22,40,0.15)' }}
          >
            <span
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
              style={{ transform: prefs[key] ? 'translateX(21px)' : 'translateX(2px)' }}
            />
          </button>
        </div>
      ))}
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  const CONTENT: Record<TabId, React.ReactNode> = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
  }

  const HEADINGS: Record<TabId, { title: string; desc: string }> = {
    profile: { title: 'Profile Information', desc: 'Update your personal details' },
    security: { title: 'Security Settings', desc: 'Change your password and manage account security' },
    notifications: { title: 'Notification Preferences', desc: 'Choose what you want to be notified about' },
  }

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center gap-2 mb-8">
        <Settings className="w-5 h-5" style={{ color: teal }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
          Settings
        </h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* ── Tab nav ── */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-2xl p-3"
            style={{ border: '1px solid rgba(11,22,40,0.08)' }}
          >
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: isActive ? teal : '#6B7C93',
                    background: isActive ? 'rgba(3,173,180,0.1)' : 'transparent',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="lg:col-span-3">
          <div
            className="bg-white rounded-2xl p-6"
            style={{ border: '1px solid rgba(11,22,40,0.08)' }}
          >
            <h2 className="font-bold text-[1rem] mb-1" style={{ color: navy }}>
              {HEADINGS[activeTab].title}
            </h2>
            <p className="text-[0.85rem] mb-6" style={{ color: '#6B7C93' }}>
              {HEADINGS[activeTab].desc}
            </p>
            {CONTENT[activeTab]}
          </div>
        </div>
      </div>
    </div>
  )
}
