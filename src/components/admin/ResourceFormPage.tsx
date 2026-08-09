// ── src/components/admin/ResourceFormPage.tsx ─────────────────────────────
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseQueryResult } from '@tanstack/react-query'
import type { LucideIcon } from 'lucide-react'
import { useCreateResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { buildFormSchema, buildPayload } from '@/lib/admin/formSchema'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { FormField } from './FormField'
import type { ResourceConfig } from '@/lib/admin/resourceConfig'

const navy = '#0B1628'

function ResourceForm<T extends { id: number }>({
  config,
  icon: Icon,
  mode,
  id,
  initialValues,
}: {
  config: ResourceConfig<T>
  icon: LucideIcon
  mode: 'create' | 'edit'
  id?: string
  initialValues: Record<string, unknown>
}) {
  const router = useRouter()
  const createMutation = useCreateResource<T>(config.apiPath, config.queryKey)
  const updateMutation = useUpdateResource<T>(config.apiPath, config.queryKey)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const schema = buildFormSchema(config.formFields)
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)
    const payload = buildPayload(config.formFields, values)
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload)
      } else {
        await updateMutation.mutateAsync({ id: id!, payload })
      }
      router.push(`/${config.apiPath}`)
    } catch {
      setSubmitError('Хадгалж чадсангүй. Дахин оролдоно уу.')
    }
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5" style={{ color: '#03ADB4' }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
          {mode === 'create' ? `Шинэ ${config.label}` : `${config.label} засах`}
        </h1>
      </div>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        {config.formFields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            register={register}
            control={control}
            error={(errors as Record<string, { message?: string }>)[field.key]?.message}
          />
        ))}
        {submitError && <p className="text-[0.82rem]" style={{ color: '#ef4444' }}>{submitError}</p>}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            {isSubmitting ? 'Хадгалж байна…' : 'Хадгалах'}
          </button>
          <Link
            href={`/${config.apiPath}`}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-gray-50"
            style={{ color: navy, border: '1.5px solid rgba(11,22,40,0.12)' }}
          >
            Цуцлах
          </Link>
        </div>
      </form>
    </div>
  )
}

export function ResourceFormPage<T extends { id: number }>({
  config,
  useList,
  icon,
  mode,
  id,
}: {
  config: ResourceConfig<T>
  useList: () => UseQueryResult<T[]>
  icon: LucideIcon
  mode: 'create' | 'edit'
  id?: string
}) {
  const listQuery = useList()

  if (mode === 'create') {
    return <ResourceForm config={config} icon={icon} mode="create" initialValues={config.emptyValues()} />
  }

  if (listQuery.isLoading) {
    return <div className="flex justify-center py-16"><LoadingSpinner /></div>
  }

  const existing = listQuery.data?.find((r) => r.id === Number(id))
  if (!existing) {
    return <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Бичлэг олдсонгүй.</p>
  }

  return (
    <ResourceForm
      key={existing.id}
      config={config}
      icon={icon}
      mode="edit"
      id={id}
      initialValues={existing as Record<string, unknown>}
    />
  )
}
