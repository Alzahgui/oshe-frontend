"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X } from "lucide-react";

const navy = "#0B1628";
const teal = "#03ADB4";

const NAV_LINKS = [
  { label: "БИД ҮҮ?", href: "/about" },
  { label: "ТАНД", href: "/training" },
  { label: "ТАНЫ БИЗНЕСТ", href: "/business" },
  { label: "ХУУЛЬ БА СТАНДАРТ", href: "/laws" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md"
      style={{ borderBottom: "1px solid rgba(11,22,40,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg,#0B1628,#1a2e4a)" }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span
                className="font-extrabold text-[1.05rem] tracking-tight block leading-tight"
                style={{ color: navy }}
              >
                YOSH
              </span>
              <span
                className="text-[0.52rem] font-semibold tracking-wider block leading-tight uppercase"
                style={{ color: "#6B7C93" }}
              >
                МОНГОЛЫН ХАБЭА-ИЙН ХОЛБОО
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-[0.82rem] font-semibold transition-all whitespace-nowrap"
                  style={
                    active
                      ? { color: teal, background: "rgba(3,173,180,0.08)" }
                      : { color: "#52637A", background: "transparent" }
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-[0.82rem] font-semibold transition-colors hover:bg-gray-50"
              style={{ color: "#52637A" }}
            >
              Нэвтрэх
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 rounded-lg text-[0.82rem] font-bold text-white transition-all hover:shadow-lg hover:scale-105"
              style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 4px 15px rgba(3,173,180,0.3)" }}
            >
              Бүртгүүлэх
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Цэс хаах" : "Цэс нээх"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" style={{ color: navy }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: navy }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t px-4 pb-4 pt-2 space-y-1"
          style={{ borderColor: "rgba(11,22,40,0.07)", background: "white" }}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-[0.88rem] font-semibold transition-all"
                style={
                  active
                    ? { color: teal, background: "rgba(3,173,180,0.08)" }
                    : { color: "#334155" }
                }
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 rounded-xl text-[0.88rem] font-semibold transition-colors hover:bg-gray-50"
              style={{ color: "#52637A", border: "1.5px solid rgba(11,22,40,0.1)" }}
            >
              Нэвтрэх
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 rounded-xl text-[0.88rem] font-bold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}
            >
              Бүртгүүлэх
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
