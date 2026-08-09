// ── src/components/admin/ResourceTable.tsx ────────────────────────────────
'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import type { ColumnDef } from '@/lib/admin/resourceConfig'

const navy = '#0B1628'

function renderCell(value: unknown) {
  if (typeof value === 'boolean') {
    return (
      <span
        className="px-2 py-0.5 rounded-md text-xs font-semibold"
        style={value ? { background: 'rgba(22,163,74,0.1)', color: '#16a34a' } : { background: 'rgba(11,22,40,0.06)', color: '#6B7C93' }}
      >
        {value ? 'Тийм' : 'Үгүй'}
      </span>
    )
  }
  if (value == null || value === '') return <span style={{ color: '#94A3B8' }}>—</span>
  const text = String(value)
  return text.length > 70 ? `${text.slice(0, 70)}…` : text
}

export function ResourceTable<T extends { id: number }>({
  rows,
  columns,
  isLoading,
  isError,
  editBasePath,
  onDelete,
  isDeleting,
}: {
  rows: T[]
  columns: ColumnDef[]
  isLoading: boolean
  isError: boolean
  editBasePath: string
  onDelete: (id: number) => void
  isDeleting: boolean
}) {
  if (isLoading) {
    return <div className="flex items-center justify-center py-16"><LoadingSpinner /></div>
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-[0.875rem]" style={{ color: '#ef4444' }}>Ачаалж чадсангүй. Backend ажиллаж байгаа эсэхийг шалгана уу.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(11,22,40,0.08)' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(11,22,40,0.06)' }}>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: '#6B7C93' }}>
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-14 text-[0.875rem]" style={{ color: '#6B7C93' }}>
                  Одоогоор бичлэг алга байна
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid rgba(11,22,40,0.05)' }}
                  className="transition-colors hover:bg-[rgba(3,173,180,0.03)]"
                >
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3.5 text-[0.85rem]" style={{ color: navy }}>
                      {renderCell((row as Record<string, unknown>)[c.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`${editBasePath}/${row.id}/edit`} className="p-1.5 rounded-lg transition-colors hover:bg-gray-100" style={{ color: '#6B7C93' }} title="Засах">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Устгахдаа итгэлтэй байна уу?')) onDelete(row.id)
                        }}
                        disabled={isDeleting}
                        className="p-1.5 rounded-lg transition-colors hover:bg-red-50 disabled:opacity-50"
                        style={{ color: '#ef4444' }}
                        title="Устгах"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
