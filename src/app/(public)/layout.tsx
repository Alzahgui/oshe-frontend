// src/app/(public)/layout.tsx — Server component layout for all public-facing pages
import PublicHeader from "@/components/PublicHeader";
import { Shield, Phone, Globe } from "lucide-react";

const navy = "#0B1628";
const teal = "#03ADB4";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif", background: "#F8FAFC" }}>
      <PublicHeader />
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer style={{ background: navy }}>
        {/* Brand + contact strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}
                >
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-white text-[1.05rem] leading-tight">MANOSH</div>
                  <div
                    className="text-[0.58rem] font-medium tracking-wider uppercase"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
                  </div>
                </div>
              </div>
              <p className="text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Монгол улсын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн үндэсний байгууллага — ажилчдыг хамгаалж,
                бүх салбарт илүү аюулгүй ажлын байр бий болгоход зориулагдсан.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white text-[0.85rem] mb-4 tracking-wider">ХОЛБОО БАРИХ</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                  +976 11-329-000
                </li>
                <li className="flex items-center gap-3 text-[0.85rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Globe className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                  info@manosh.mn
                </li>
                <li className="text-[0.82rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Чингисийн өргөн чөлөө 15, Чингэлтэй дүүрэг,<br />
                  Улаанбаатар 15160, Монгол улс
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold text-white text-[0.85rem] mb-4 tracking-wider">ХОЛДОС ХОЛБООСУУД</h4>
              <ul className="space-y-2">
                {[
                  { label: "Бидний тухай", href: "/about" },
                  { label: "Сургалт", href: "/training" },
                  { label: "Таны бизнест", href: "/business" },
                  { label: "Хууль ба стандарт", href: "/laws" },
                  { label: "Баримт бичиг", href: "/documents" },
                  { label: "Нэвтрэх", href: "/login" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[0.82rem] hover:text-[#03ADB4] transition-colors"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
              © 2024 MANOSH — Монголын Үндэсний Хөдөлмөрийн Аюулгүй Байдал, Эрүүл Ахуйн Холбоо. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {["ISO 45001:2018", "ILO түнш", "НБУ-ын ТХЗ-тай нийцсэн"].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold"
                  style={{ background: "rgba(3,173,180,0.12)", color: "rgba(3,173,180,0.8)", border: "1px solid rgba(3,173,180,0.2)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
