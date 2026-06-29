// ── src/app/(dashboard)/layout.tsx ───────────────────────────────────────

import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#F8FAFC' }}>
      <Sidebar />
      {/* Main content offset by sidebar width */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
