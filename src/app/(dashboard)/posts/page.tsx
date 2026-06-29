// ── src/app/(dashboard)/posts/page.tsx ───────────────────────────────────
'use client'

import { PermissionGuard } from '@/components/PermissionGuard'
import { FileText, Plus, Clock, Tag } from 'lucide-react'

const navy = '#0B1628'
const teal = '#03ADB4'

const MOCK_POSTS = [
  {
    id: 1,
    title: 'ISO 45001:2018 Implementation Guide',
    status: 'Published',
    author: 'B. Gantulga',
    date: 'Nov 28, 2024',
    category: 'Standards',
    excerpt: 'A comprehensive guide to implementing the ISO 45001 management system standard in Mongolian organisations.',
  },
  {
    id: 2,
    title: 'Mining Safety Regulation 2024 — Key Changes',
    status: 'Published',
    author: 'E. Bold',
    date: 'Nov 15, 2024',
    category: 'Regulations',
    excerpt: 'Breakdown of the most impactful changes in the new Mining Safety Regulation effective January 2025.',
  },
  {
    id: 3,
    title: 'Annual Safety Summit 2025 Agenda',
    status: 'Draft',
    author: 'T. Lkhagva',
    date: 'Dec 1, 2024',
    category: 'Events',
    excerpt: 'Draft agenda for the 2025 Annual Occupational Safety Summit to be held in Ulaanbaatar.',
  },
  {
    id: 4,
    title: 'PPE Requirements for Construction Sites',
    status: 'Published',
    author: 'B. Gantulga',
    date: 'Oct 30, 2024',
    category: 'Guidelines',
    excerpt: 'Updated guidelines covering mandatory personal protective equipment for all construction site workers.',
  },
  {
    id: 5,
    title: 'Zero Harm 2025 Campaign Launch',
    status: 'Draft',
    author: 'E. Bold',
    date: 'Dec 3, 2024',
    category: 'Campaigns',
    excerpt: 'Overview of the nationwide Zero Harm initiative launching Q1 2025 across major industries.',
  },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Published: { bg: 'rgba(22,163,74,0.1)', color: '#16a34a' },
  Draft: { bg: 'rgba(245,158,11,0.1)', color: '#d97706' },
}

const CATEGORY_COLORS: Record<string, string> = {
  Standards: teal,
  Regulations: '#FD2EBB',
  Events: '#8b5cf6',
  Guidelines: '#f59e0b',
  Campaigns: '#ef4444',
}

export default function PostsPage() {
  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5" style={{ color: teal }} />
            <h1 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
              Content
            </h1>
          </div>
          <p style={{ color: '#6B7C93', fontSize: '0.9rem' }}>
            Manage publications, news articles, and guidelines
          </p>
        </div>

        <PermissionGuard permission="posts.add_post">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #03ADB4, #028E95)' }}
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </PermissionGuard>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-2 mb-6">
        {['All', 'Published', 'Draft'].map((tab, i) => (
          <button
            key={tab}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={
              i === 0
                ? { background: teal, color: '#fff' }
                : { background: 'white', color: '#6B7C93', border: '1.5px solid rgba(11,22,40,0.1)' }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Posts list ── */}
      <div className="space-y-3">
        {MOCK_POSTS.map((post) => {
          const categoryColor = CATEGORY_COLORS[post.category] ?? '#6B7C93'
          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-5 flex items-start gap-4 transition-all hover:shadow-md cursor-pointer"
              style={{ border: '1px solid rgba(11,22,40,0.08)' }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(3,173,180,0.08)' }}
              >
                <FileText className="w-4.5 h-4.5" style={{ color: teal }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-[0.9rem]" style={{ color: navy }}>
                    {post.title}
                  </h3>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                    style={STATUS_STYLE[post.status] ?? STATUS_STYLE.Draft}
                  >
                    {post.status}
                  </span>
                </div>
                <p
                  className="text-[0.8rem] leading-relaxed mb-3"
                  style={{ color: '#6B7C93' }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[0.75rem]" style={{ color: '#6B7C93' }}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.date}
                  </span>
                  <span>{post.author}</span>
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold"
                    style={{ background: `${categoryColor}15`, color: categoryColor }}
                  >
                    <Tag className="w-2.5 h-2.5" /> {post.category}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
