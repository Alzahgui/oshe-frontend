'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { useNavMenus } from '@/hooks/useContent'
import { useCreateResource, useDeleteResource, useUpdateResource } from '@/hooks/useAdminMutations'
import { resolveIcon } from '@/lib/icons'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { NavMenuItem } from '@/types/content'

const navy = '#0B1628'
const teal = '#03ADB4'

const inputClass = 'w-full px-3 py-2 rounded-lg text-sm focus:outline-none'
const inputStyle = { border: '1.5px solid rgba(11,22,40,0.12)', color: navy }

type ItemFormValues = {
  icon: string
  iconColor: string
  iconBg: string
  title: string
  desc: string
  href: string
  order: number
}

const blankItem: ItemFormValues = { icon: '', iconColor: '', iconBg: '', title: '', desc: '', href: '#', order: 0 }

function ItemForm({
  initial,
  onSubmit,
  onCancel,
  submitting,
}: {
  initial: ItemFormValues
  onSubmit: (values: ItemFormValues) => void
  onCancel?: () => void
  submitting: boolean
}) {
  const [values, setValues] = useState(initial)
  const set = (key: keyof ItemFormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: key === 'order' ? Number(e.target.value) : e.target.value }))

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
      <input placeholder="Icon нэр" value={values.icon} onChange={set('icon')} className={inputClass} style={inputStyle} />
      <input placeholder="Icon өнгө" value={values.iconColor} onChange={set('iconColor')} className={inputClass} style={inputStyle} />
      <input placeholder="Icon дэвсгэр" value={values.iconBg} onChange={set('iconBg')} className={inputClass} style={inputStyle} />
      <input placeholder="Гарчиг" value={values.title} onChange={set('title')} className={inputClass} style={inputStyle} />
      <input placeholder="Тайлбар" value={values.desc} onChange={set('desc')} className={`${inputClass} sm:col-span-2`} style={inputStyle} />
      <input placeholder="Href" value={values.href} onChange={set('href')} className={inputClass} style={inputStyle} />
      <input type="number" placeholder="Дараалал" value={values.order} onChange={set('order')} className={inputClass} style={inputStyle} />
      <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
        <button
          onClick={() => onSubmit(values)}
          disabled={submitting || !values.title || !values.href}
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

function ItemRow({ item, onDelete, isDeleting }: { item: NavMenuItem; onDelete: () => void; isDeleting: boolean }) {
  const [editing, setEditing] = useState(false)
  const updateItem = useUpdateResource('nav-menu-items', ['nav-menus'])
  const Icon = resolveIcon(item.icon)

  if (editing) {
    return (
      <div className="p-3">
        <ItemForm
          initial={{ icon: item.icon, iconColor: item.iconColor, iconBg: item.iconBg, title: item.title, desc: item.desc, href: item.href, order: item.order }}
          submitting={updateItem.isPending}
          onCancel={() => setEditing(false)}
          onSubmit={async (values) => {
            await updateItem.mutateAsync({
              id: item.id,
              payload: { icon: values.icon, icon_color: values.iconColor, icon_bg: values.iconBg, title: values.title, desc: values.desc, href: values.href, order: values.order },
            })
            setEditing(false)
          }}
        />
      </div>
    )
  }

  return (
    <tr style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}>
      <td className="px-4 py-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.iconBg || 'rgba(11,22,40,0.06)' }}>
          <Icon className="w-4 h-4" style={{ color: item.iconColor || navy }} />
        </div>
      </td>
      <td className="px-4 py-3 text-[0.85rem] font-medium" style={{ color: navy }}>{item.title}</td>
      <td className="px-4 py-3 text-[0.85rem]" style={{ color: '#6B7C93' }}>{item.href}</td>
      <td className="px-4 py-3 text-[0.85rem]" style={{ color: '#6B7C93' }}>{item.order}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: '#6B7C93' }}><Pencil className="w-4 h-4" /></button>
          <button onClick={onDelete} disabled={isDeleting} className="p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50" style={{ color: '#ef4444' }}><Trash2 className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  )
}

export default function NavMenuDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useNavMenus()
  const updateMenu = useUpdateResource('nav-menus', ['nav-menus'])
  const deleteItem = useDeleteResource('nav-menu-items', ['nav-menus'])
  const createItem = useCreateResource('nav-menu-items', ['nav-menus'])
  const [addingItem, setAddingItem] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  const menu = data?.find((m) => m.id === Number(id))

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner /></div>
  if (!menu) return <p style={{ color: '#ef4444' }}>Цэс олдсонгүй.</p>

  const currentLabel = label ?? menu.label

  return (
    <div className="max-w-3xl">
      <Link href="/nav-menus" className="flex items-center gap-1.5 text-sm mb-4 hover:text-[#03ADB4]" style={{ color: '#6B7C93' }}>
        <ArrowLeft className="w-3.5 h-3.5" /> Бүх цэс
      </Link>

      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <label className="block text-[0.82rem] font-semibold mb-1.5" style={{ color: navy }}>Цэсний нэр</label>
        <div className="flex gap-2">
          <input value={currentLabel} onChange={(e) => setLabel(e.target.value)} className={inputClass} style={inputStyle} />
          <button
            onClick={() => updateMenu.mutate({ id: menu.id, payload: { label: currentLabel, order: menu.order } })}
            disabled={updateMenu.isPending}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-60 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            Хадгалах
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-[1rem]" style={{ color: navy }}>Зүйлс ({menu.items.length})</h2>
        <button
          onClick={() => setAddingItem((v) => !v)}
          className="flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: teal }}
        >
          <Plus className="w-4 h-4" /> Зүйл нэмэх
        </button>
      </div>

      {addingItem && (
        <div className="mb-4">
          <ItemForm
            initial={{ ...blankItem, order: menu.items.length }}
            submitting={createItem.isPending}
            onCancel={() => setAddingItem(false)}
            onSubmit={async (values) => {
              await createItem.mutateAsync({
                nav_menu_id: menu.id, icon: values.icon, icon_color: values.iconColor, icon_bg: values.iconBg,
                title: values.title, desc: values.desc, href: values.href, order: values.order,
              })
              setAddingItem(false)
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
        <table className="w-full">
          <tbody>
            {menu.items.length === 0 ? (
              <tr><td className="text-center py-10 text-[0.875rem]" style={{ color: '#6B7C93' }}>Зүйл алга байна</td></tr>
            ) : (
              menu.items
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <ItemRow key={item.id} item={item} isDeleting={deleteItem.isPending} onDelete={() => deleteItem.mutate(item.id)} />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
