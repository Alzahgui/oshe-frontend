"use client";

import Link from "next/link";
import {
  BookOpen, FileText, BarChart2, AlertTriangle, Users, Award,
  ChevronRight, Phone, Globe, Shield,
} from "lucide-react";

const navy = "#0B1628";
const teal = "#03ADB4";
const pink = "#FD2EBB";

const SERVICES = [
  {
    icon: BookOpen,
    iconColor: teal,
    iconBg: "rgba(3,173,180,0.1)",
    border: "rgba(3,173,180,0.2)",
    title: "Сургалт",
    description: "ISO 45001, эрсдэлийн үнэлгээ, хууль тогтоомж болон бусад ХАБЭА-ийн чиглэлүүдээр мэргэшсэн сургалт авна уу.",
    linkText: "Сургалт харах",
    href: "/training",
  },
  {
    icon: FileText,
    iconColor: "#7C3AED",
    iconBg: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.2)",
    title: "Баримт бичиг",
    description: "Эрсдэлийн үнэлгээ, аюулгүй ажиллагааны журам, шалгах хуудас болон бусад загвар баримт бичгүүдийг татаж авна уу.",
    linkText: "Баримт бичиг харах",
    href: "/documents",
  },
  {
    icon: BarChart2,
    iconColor: "#0EA5E9",
    iconBg: "rgba(14,165,233,0.1)",
    border: "rgba(14,165,233,0.2)",
    title: "Харьцуулсан судалгаа",
    description: "Таны салбарын аюулгүй байдлын үзүүлэлтүүдийг улсын дундажтай харьцуулан дүгнэлт гаргана уу.",
    linkText: "Судалгаа харах",
    href: "/business/research",
  },
  {
    icon: AlertTriangle,
    iconColor: "#F59E0B",
    iconBg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    title: "Аюулт тохиолдолын судалгаа",
    description: "Ажлын байрны осол, аюулт тохиолдлуудыг бүртгэж, шалтгааныг тогтоох, дахин давтагдахаас сэргийлэх арга хэмжээ боловсруулна уу.",
    linkText: "Судалгаа харах",
    href: "/business/incident-analysis",
  },
  {
    icon: Users,
    iconColor: "#10B981",
    iconBg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
    title: "Миний оролцоо",
    description: "MANOSH-ийн арга хэмжээ, сургалт, хурал зөвлөлгөөнд оролцсон түүхээ харах, сертификатаа авах.",
    linkText: "Оролцоо харах",
    href: "/business/participation",
  },
  {
    icon: Award,
    iconColor: pink,
    iconBg: "rgba(253,46,187,0.1)",
    border: "rgba(253,46,187,0.2)",
    title: "Гишүүнчлэл",
    description: "MANOSH-ийн гишүүн болж, онцгой эрх, хөнгөлөлт болон нэмэлт үйлчилгээнүүдэд хандах боломжтой болно уу.",
    linkText: "Бүртгүүлэх",
    href: "/register",
  },
];

export default function BusinessPage() {
  return (
    <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      <title>Таны Бизнест — MANOSH</title>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: navy }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 60% at 5% 50%, rgba(3,173,180,0.15) 0%, transparent 60%), radial-gradient(40% 50% at 95% 20%, rgba(253,46,187,0.1) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}
          >
            <Shield className="w-4 h-4" style={{ color: teal }} />
            <span className="text-[0.78rem] font-bold tracking-widest" style={{ color: teal }}>
              БИЗНЕСИЙН ҮЙЛЧИЛГЭЭ
            </span>
          </div>

          <h1
            className="font-extrabold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}
          >
            ТАНЫ БИЗНЕСТ
          </h1>

          <p
            className="mx-auto max-w-[620px] leading-relaxed text-[1rem]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Таны байгууллагад ХАБЭА-ийн соёлыг нэвтрүүлэх, ажилчдынхаа аюулгүй байдлыг
            хангах, хуулийн шаардлагад нийцэх — бүх шаардлагатай үйлчилгээг нэг дороос авна уу.
          </p>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="py-14 lg:py-20" style={{ background: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>
              Бизнесийн үйлчилгээнүүд
            </h2>
            <p className="mt-2 text-[0.9rem]" style={{ color: "#6B7C93" }}>
              Таны байгууллагын хэрэгцээнд нийцүүлсэн иж бүрэн шийдлүүд
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.title}
                  href={svc.href}
                  className="group bg-white rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                  style={{ border: `1.5px solid ${svc.border}` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: svc.iconBg }}
                  >
                    <Icon className="w-5.5 h-5.5" style={{ color: svc.iconColor }} />
                  </div>
                  <h3
                    className="font-bold text-[1rem] mb-2 group-hover:text-[#03ADB4] transition-colors"
                    style={{ color: navy }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[0.83rem] leading-relaxed mb-5 flex-1"
                    style={{ color: "#6B7C93" }}
                  >
                    {svc.description}
                  </p>
                  <span
                    className="flex items-center gap-1.5 text-[0.82rem] font-semibold mt-auto"
                    style={{ color: svc.iconColor }}
                  >
                    {svc.linkText}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${navy} 0%, #162040 100%)`,
              boxShadow: "0 30px 70px rgba(11,22,40,0.15)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 60% at 20% 50%, rgba(3,173,180,0.15) 0%, transparent 60%), radial-gradient(40% 40% at 80% 30%, rgba(253,46,187,0.1) 0%, transparent 50%)",
              }}
            />

            <div className="relative">
              <h2 className="font-extrabold text-white mb-3" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
                Бизнесийн гишүүнчлэл авах
              </h2>
              <p className="mb-6 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
                QPay болон SocialPay-р шимтгэлгүйгээр гишүүнчлэлийн төлбөрөө хийж,
                MANOSH-ийн бүх үйлчилгээнд хандах эрхтэй болно уу.
              </p>

              {/* Payment badges */}
              <div className="flex justify-center gap-3 mb-7">
                {["QPay", "SocialPay", "Khan Bank", "Golomt Bank"].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-lg text-[0.78rem] font-bold"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#03ADB4,#028E95)",
                    boxShadow: "0 8px 30px rgba(3,173,180,0.4)",
                  }}
                >
                  Гишүүнчлэл авах <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(3,173,180,0.4)", color: teal }}
                >
                  Дэлгэрэнгүй мэдээлэл
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="py-12" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-extrabold text-[1.3rem]" style={{ color: navy }}>
              Холбоо барих
            </h2>
            <p className="mt-1 text-[0.88rem]" style={{ color: "#6B7C93" }}>
              Бизнесийн үйлчилгээтэй холбоотой асуулт байвал бидэнтэй холбоо барина уу.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+97611329000"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white font-semibold text-[0.9rem] transition-all hover:shadow-md"
              style={{ border: "1.5px solid rgba(11,22,40,0.1)", color: navy }}
            >
              <Phone className="w-5 h-5" style={{ color: teal }} />
              +976 11-329-000
            </a>
            <a
              href="mailto:info@manosh.mn"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white font-semibold text-[0.9rem] transition-all hover:shadow-md"
              style={{ border: "1.5px solid rgba(11,22,40,0.1)", color: navy }}
            >
              <Globe className="w-5 h-5" style={{ color: teal }} />
              info@manosh.mn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
