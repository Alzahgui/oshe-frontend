'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu as MenuIcon, Trash2, Plus } from 'lucide-react'
import { useNavMenus } from '@/hooks/useContent'
import { useCreateResource, useDeleteResource } from '@/hooks/useAdminMutations'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const navy = '#0B1628'
const teal = '#03ADB4'

export default function NavMenusPage() {
  const { data, isLoading, isError } = useNavMenus()
  const createMenu = useCreateResource('nav-menus', ['nav-menus'])
  const deleteMenu = useDeleteResource('nav-menus', ['nav-menus'])
  const [label, setLabel] = useState('')

  const handleCreate = async () => {
    if (!label.trim()) return
    await createMenu.mutateAsync({ label, order: data?.length ?? 0 })
    setLabel('')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <MenuIcon className="w-5 h-5" style={{ color: teal }} />
        <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>Навигацийн цэснүүд</h1>
      </div>
      <p className="mb-6" style={{ color: '#6B7C93', fontSize: '0.9rem' }}>
        Header-ийн dropdown цэснүүд болон тэдгээрийн зүйлсийг удирдах
      </p>

      <div className="flex gap-2 mb-6">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Шинэ цэсний нэр…"
          className="flex-1 max-w-sm px-4 py-2.5 rounded-xl text-sm focus:outline-none"
          style={{ border: '1.5px solid rgba(11,22,40,0.12)', color: navy }}
        />
        <button
          onClick={handleCreate}
          disabled={createMenu.isPending}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
        >
          <Plus className="w-4 h-4" /> Нэмэх
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : isError ? (
        <p style={{ color: '#ef4444' }}>Ачаалж чадсангүй.</p>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(11,22,40,0.06)' }}>
                {['Нэр', 'Зүйлсийн тоо', 'Дараалал', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-wider" style={{ color: '#6B7C93' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data ?? []).length === 0 ? (
                <tr><td colSpan={4} className="text-center py-14 text-[0.875rem]" style={{ color: '#6B7C93' }}>Цэс алга байна</td></tr>
              ) : (
                (data ?? []).map((menu) => (
                  <tr key={menu.id} style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}>
                    <td className="px-4 py-3.5">
                      <Link href={`/nav-menus/${menu.id}`} className="font-medium hover:text-[#03ADB4]" style={{ color: navy }}>{menu.label}</Link>
                    </td>
                    <td className="px-4 py-3.5 text-[0.85rem]" style={{ color: '#6B7C93' }}>{menu.items.length}</td>
                    <td className="px-4 py-3.5 text-[0.85rem]" style={{ color: '#6B7C93' }}>{menu.order}</td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => window.confirm('Энэ цэсийг устгах уу? Доторх бүх зүйлс устана.') && deleteMenu.mutate(menu.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
