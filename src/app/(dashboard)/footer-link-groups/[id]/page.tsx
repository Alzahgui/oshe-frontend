'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { useFooterLinkGroups } from '@/hooks/useContent'
import { useCreateResource, useDeleteResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { FooterLink } from '@/types/content'

const navy = '#0B1628'
const teal = '#03ADB4'

const inputClass = 'w-full px-3 py-2 rounded-lg text-sm focus:outline-none'
const inputStyle = { border: '1.5px solid rgba(11,22,40,0.12)', color: navy }

type LinkFormValues = { label: string; href: string; order: number }
const blankLink: LinkFormValues = { label: '', href: '#', order: 0 }

function LinkForm({
  initial,
  onSubmit,
  onCancel,
  submitting,
}: {
  initial: LinkFormValues
  onSubmit: (values: LinkFormValues) => void
  onCancel?: () => void
  submitting: boolean
}) {
  const [values, setValues] = useState(initial)
  const set = (key: keyof LinkFormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: key === 'order' ? Number(e.target.value) : e.target.value }))

  return (
    <div className="grid sm:grid-cols-3 gap-2 p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
      <input placeholder="Текст" value={values.label} onChange={set('label')} className={inputClass} style={inputStyle} />
      <input placeholder="Href" value={values.href} onChange={set('href')} className={inputClass} style={inputStyle} />
      <input type="number" placeholder="Дараалал" value={values.order} onChange={set('order')} className={inputClass} style={inputStyle} />
      <div className="flex gap-2 sm:col-span-3">
        <button
          onClick={() => onSubmit(values)}
          disabled={submitting || !values.label}
          className="px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          Хадгалах
        </button>
        {onCancel && (
          <button onClick={onCancel} className="px-4 py-2 rounded-lg font-semibold text-sm" style={{ color: navy, border: '1.5px solid rgba(11,22,40,0.12)' }}>
            Цуцлах
          </button>
        )}
      </div>
    </div>
  )
}

function LinkRow({ link, onDelete, isDeleting }: { link: FooterLink; onDelete: () => void; isDeleting: boolean }) {
  const [editing, setEditing] = useState(false)
  const updateLink = useUpdateResource('footer-links', ['footer-link-groups'])

  if (editing) {
    return (
      <div className="p-3">
        <LinkForm
          initial={{ label: link.label, href: link.href, order: link.order }}
          submitting={updateLink.isPending}
          onCancel={() => setEditing(false)}
          onSubmit={async (values) => {
            await updateLink.mutateAsync({ id: link.id, payload: values })
            setEditing(false)
          }}
        />
      </div>
    )
  }

  return (
    <tr style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}>
      <td className="px-4 py-3 text-[0.85rem] font-medium" style={{ color: navy }}>{link.label}</td>
      <td className="px-4 py-3 text-[0.85rem]" style={{ color: '#6B7C93' }}>{link.href}</td>
      <td className="px-4 py-3 text-[0.85rem]" style={{ color: '#6B7C93' }}>{link.order}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#6B7C93' }}><Pencil className="w-4 h-4" /></button>
          <button onClick={onDelete} disabled={isDeleting} className="p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50" style={{ color: '#ef4444' }}><Trash2 className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  )
}

export default function FooterLinkGroupDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useFooterLinkGroups()
  const updateGroup = useUpdateResource('footer-link-groups', ['footer-link-groups'])
  const deleteLink = useDeleteResource('footer-links', ['footer-link-groups'])
  const createLink = useCreateResource('footer-links', ['footer-link-groups'])
  const [addingLink, setAddingLink] = useState(false)
  const [title, setTitle] = useState<string | null>(null)

  const group = data?.find((g) => g.id === Number(id))

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner /></div>
  if (!group) return <p style={{ color: '#ef4444' }}>Багц олдсонгүй.</p>

  const currentTitle = title ?? group.title

  return (
    <div className="max-w-3xl">
      <Link href="/footer-link-groups" className="flex items-center gap-1.5 text-sm mb-4 hover:text-[#03ADB4]" style={{ color: '#6B7C93' }}>
        <ArrowLeft className="w-3.5 h-3.5" /> Бүх багц
      </Link>

      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Баганын гарчиг</label>
        <div className="flex gap-2">
          <input value={currentTitle} onChange={(e) => setTitle(e.target.value)} className={inputClass} style={inputStyle} />
          <button
            onClick={() => updateGroup.mutate({ id: group.id, payload: { title: currentTitle, order: group.order } })}
            disabled={updateGroup.isPending}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-60 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            Хадгалах
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[1rem]" style={{ color: navy }}>Холбоосууд ({group.links.length})</h2>
        <button onClick={() => setAddingLink((v) => !v)} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: teal }}>
          <Plus className="w-4 h-4" /> Холбоос нэмэх
        </button>
      </div>

      {addingLink && (
        <div className="mb-4">
          <LinkForm
            initial={{ ...blankLink, order: group.links.length }}
            submitting={createLink.isPending}
            onCancel={() => setAddingLink(false)}
            onSubmit={async (values) => {
              await createLink.mutateAsync({ footer_link_group_id: group.id, ...values })
              setAddingLink(false)
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <table className="w-full">
          <tbody>
            {group.links.length === 0 ? (
              <tr><td className="text-center py-10 text-[0.875rem]" style={{ color: '#6B7C93' }}>Холбоос алга байна</td></tr>
            ) : (
              group.links
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                  <LinkRow key={link.id} link={link} isDeleting={deleteLink.isPending} onDelete={() => deleteLink.mutate(link.id)} />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
