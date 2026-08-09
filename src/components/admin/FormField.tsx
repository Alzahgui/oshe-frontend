// ── src/components/admin/FormField.tsx ────────────────────────────────────
'use client'

import { Control, FieldValues, UseFormRegister, useWatch } from 'react-hook-form'
import { resolveIcon } from '@/lib/icons'
import type { FieldDef } from '@/lib/admin/resourceConfig'

type FormValues = FieldValues

const navy = '#0B1628'
const teal = '#03ADB4'

const inputStyle = (error?: string) => ({
  border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(11,22,40,0.12)',
  color: navy,
  background: 'white',
})

function focusHandlers(error?: string) {
  return {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (!error) (e.currentTarget as HTMLElement).style.borderColor = teal
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!error) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(11,22,40,0.12)'
    },
  }
}

function FieldPreview({ field, control }: { field: FieldDef; control: Control<FormValues> }) {
  const value = useWatch({ control, name: field.key })
  if (!value || typeof value !== 'string') return null
  if (field.preview === 'color') {
    return <div className="w-9 h-9 rounded-lg border flex-shrink-0" style={{ background: value, borderColor: 'rgba(11,22,40,0.12)' }} />
  }
  if (field.preview === 'icon') {
    const Icon = resolveIcon(value)
    return (
      <div className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0" style={{ borderColor: 'rgba(11,22,40,0.12)' }}>
        <Icon className="w-4 h-4" style={{ color: navy }} />
      </div>
    )
  }
  return null
}

export function FormField({
  field,
  register,
  control,
  error,
}: {
  field: FieldDef
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  error?: string
}) {
  if (field.type === 'boolean') {
    return (
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input type="checkbox" className="w-4 h-4 rounded" {...register(field.key)} />
        <span className="text-[0.82rem] font-semibold" style={{ color: navy }}>{field.label}</span>
      </label>
    )
  }

  return (
    <div>
      <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>
        {field.label}
      </label>
      <div className="flex items-center gap-2.5">
        <div className="flex-1">
          {field.type === 'textarea' ? (
            <textarea
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
              style={inputStyle(error)}
              {...focusHandlers(error)}
              {...register(field.key)}
            />
          ) : field.type === 'select' ? (
            <select
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
              style={inputStyle(error)}
              {...focusHandlers(error)}
              {...register(field.key)}
            >
              {field.options?.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              step={field.type === 'number' ? 'any' : undefined}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
              style={inputStyle(error)}
              {...focusHandlers(error)}
              {...register(field.key, field.type === 'number' ? { valueAsNumber: true } : {})}
            />
          )}
        </div>
        {field.preview && <FieldPreview field={field} control={control} />}
      </div>
      {error && <p className="mt-1 text-[0.75rem]" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  )
}
