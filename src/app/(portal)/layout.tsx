// ── src/app/(portal)/layout.tsx ───────────────────────────────────────────
import MemberHeader from '@/components/MemberHeader'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MemberHeader />
      <main className="flex-1 min-h-screen" style={{ background: '#F8FAFC' }}>
        {children}
      </main>
    </div>
  )
}
