"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield, Globe, Phone, ArrowRight, BookOpen, Bot,
  Building2, Users, Award, TrendingUp, TriangleAlert, HardHat,
  FileCheck, GraduationCap, Scale, FileText, Download, ExternalLink,
  TrendingDown, CircleCheck, Activity, Clock, MapPin, Monitor, Star,
  Sparkles, Search, Calendar, Send, Menu, Play, ChevronRight, ChevronDown,
  Target, UserPlus, Newspaper, Megaphone, Bell, Layers, Badge,
} from "lucide-react";

const teal = "#03ADB4";
const pink = "#FD2EBB";
const navy = "#0B1628";

type NavDropdownItem = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
  iconColor: string;
  iconBg: string;
  title: string;
  desc: string;
  href: string;
};

type NavMenu = {
  label: string;
  items: NavDropdownItem[];
};

const navMenus: NavMenu[] = [
  {
    label: "Бидний тухай",
    items: [
      { icon: Target, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Эрхэм зорилго ба алсын хараа", desc: "Бидний зорилго, стратегийн зорилтууд", href: "#about-mission" },
      { icon: Building2, iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", title: "Байгууллагын бүтэц", desc: "Бид хэрхэн зохион байгуулагдсан бэ", href: "#about-structure" },
      { icon: Users, iconColor: pink, iconBg: "rgba(253,46,187,0.12)", title: "Удирдах зөвлөлийн гишүүд", desc: "Манлайлал ба засаглал", href: "#about-board" },
      { icon: UserPlus, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", title: "Гишүүнчлэлийн мэдээлэл", desc: "Өнөөдөр MANOSH-д нэгдээрэй", href: "#membership" },
    ],
  },
  {
    label: "Мэдээ & Шинэчлэлтүүд",
    items: [
      { icon: Newspaper, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Салбарын мэдээ", desc: "ХАБЭА-н хамгийн сүүлийн үеийн хөгжил", href: "#news-industry" },
      { icon: Megaphone, iconColor: pink, iconBg: "rgba(253,46,187,0.12)", title: "Аюулгүй байдлын кампанит ажил", desc: "Мэдлэгийн санаачилга", href: "#news-campaigns" },
      { icon: Calendar, iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", title: "Арга хэмжээ ба хурал", desc: "Удахгүй болох хөтөлбөрүүд", href: "#events" },
      { icon: Bell, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", title: "Зарлалууд", desc: "MANOSH-ын албан ёсны мэдэгдэл", href: "#news-announcements" },
    ],
  },
  {
    label: "Хууль ба стандартууд",
    items: [
      { icon: Scale, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Хөдөлмөрийн аюулгүй байдлын тухай хууль", desc: "Монгол Улсын хууль эрх зүйн орчин", href: "#laws" },
      { icon: FileText, iconColor: pink, iconBg: "rgba(253,46,187,0.12)", title: "Засгийн газрын дүрэм журам", desc: "Яамнаас гаргасан дүрэм журам", href: "#regulations" },
      { icon: BookOpen, iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", title: "Үндэсний стандарт (ҮССТ)", desc: "Монголын үндэсний стандартууд", href: "#national-standards" },
      { icon: Globe, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", title: "Олон улсын стандартууд", desc: "ISO 45001 ба дэлхийн хэмжээ", href: "#international-standards" },
      { icon: Download, iconColor: navy, iconBg: "rgba(11,22,40,0.08)", title: "Татаж авах боломжтой баримт бичгүүд", desc: "Үнэгүй эх сурвалжууд болон маягтууд", href: "#downloads" },
    ],
  },
  {
    label: "Бүтээгдэхүүнүүд",
    items: [
      { icon: GraduationCap, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Аюулгүй байдлын сургалтын материалууд", desc: "Сургалт ба сургалтын хөтөлбөрүүд", href: "#products-training" },
      { icon: FileCheck, iconColor: pink, iconBg: "rgba(253,46,187,0.12)", title: "Удирдамж", desc: "Шилдэг туршлагын гарын авлага", href: "#products-guidelines" },
      { icon: Layers, iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", title: "Хэвлэлүүд", desc: "Судалгаа ба тайлан", href: "#products-publications" },
      { icon: Badge, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", title: "Аюулгүй байдлын тэмдэг", desc: "Тэмдэглэгээний шаардлагад нийцсэн шийдлүүд", href: "#products-signage" },
      { icon: Monitor, iconColor: navy, iconBg: "rgba(11,22,40,0.08)", title: "Дижитал нөөцүүд", desc: "Хэрэгслүүд ба цахим сургалт", href: "#products-digital" },
    ],
  },
  {
    label: "Хиймэл оюун ухааны аюулгүй байдлын туслах",
    items: [
      { icon: Bot, iconColor: pink, iconBg: "rgba(253,46,187,0.12)", title: "Хиймэл оюун ухааны чатбот", desc: "24/7 аюулгүй байдлын удирдамж", href: "#ai-assistant" },
      { icon: Search, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Зохицуулалтын хайлт", desc: "Холбогдох хуулиудыг хурдан олох", href: "#ai-search" },
      { icon: FileText, iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", title: "Стандарт тайлбар", desc: "Энгийн хэлээр тайлбарласан", href: "#ai-standards" },
      { icon: Activity, iconColor: "#f59e0b", iconBg: "rgba(245,158,11,0.12)", title: "Эрсдэлийн үнэлгээний хэрэгсэл", desc: "Ажлын байрны аюулын шинжилгээ", href: "#ai-risk" },
      { icon: CircleCheck, iconColor: teal, iconBg: "rgba(3,173,180,0.12)", title: "Түгээмэл асуултуудын мэдээллийн сан", desc: "Нийтлэг асуултуудын хариултууд", href: "#ai-faq" },
    ],
  },
];

function HeaderNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-0.5">
      {navMenus.map((menu) => {
        const isOpen = openMenu === menu.label;
        const isAi = menu.label.includes("Хиймэл оюун");
        return (
          <div
            key={menu.label}
            className="relative"
            onMouseEnter={() => setOpenMenu(menu.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[0.82rem] font-semibold transition-colors whitespace-nowrap"
              style={{
                color: isOpen ? teal : "#52637A",
                background: isOpen ? "#f0f9fa" : "transparent",
              }}
            >
              <span className={isAi ? "max-w-[180px] truncate" : ""}>{menu.label}</span>
              <ChevronDown
                className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
                style={{ color: isOpen ? teal : "#94A3B8", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {isOpen && (
              <div
                className={`absolute top-full pt-2 z-[60] ${isAi ? "right-0" : "left-0"}`}
              >
                <div
                  className="bg-white rounded-2xl py-2 overflow-hidden"
                  style={{
                    minWidth: 340,
                    boxShadow: "0 20px 50px rgba(11,22,40,0.12), 0 0 0 1px rgba(11,22,40,0.06)",
                  }}
                >
                  {menu.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#f8fafc] group"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                          style={{ background: item.iconBg }}
                        >
                          <Icon className="w-4.5 h-4.5" style={{ color: item.iconColor }} strokeWidth={2} />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <div className="font-bold text-[0.85rem] leading-snug mb-0.5 group-hover:text-[#03ADB4] transition-colors" style={{ color: navy }}>
                            {item.title}
                          </div>
                          <div className="text-[0.75rem] leading-snug" style={{ color: "#6B7C93" }}>
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", background: "#F8FAFC" }}>

      {/* ── Announcement Bar ── */}
      <div className="py-2 px-4 text-center" style={{ background: "linear-gradient(90deg, #03ADB4, #0891A0, #FD2EBB)" }}>
        <p className="flex items-center justify-center gap-2 text-white text-xs">
          <span>📢</span>
          <span>ISO 45001:2018 Ахлах аудиторын сургалт — 2024 оны 12-р сарын бүлгийн бүртгэл эхэллээ</span>
          <span className="ml-2 font-semibold text-[0.7rem] px-2.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }}>
            Одоо бүртгүүлэх →
          </span>
        </p>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md" style={{ borderBottom: "1px solid rgba(11,22,40,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
                <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-extrabold text-[1rem] tracking-tight block leading-tight" style={{ color: navy }}>Манош</span>
                <span className="text-[0.55rem] font-medium tracking-wider block leading-tight" style={{ color: "#6B7C93" }}>МОНГОЛЫН ХӨДӨЛМӨРИЙН ХОЛБОО</span>
              </div>
            </Link>

            {/* Nav */}
            <HeaderNav />

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.78rem] font-medium transition-colors hover:bg-gray-50" style={{ color: "#6B7C93" }}>
                <Globe className="w-3.5 h-3.5" /> MN / EN
              </button>
              <div className="w-px h-5 mx-0.5" style={{ background: "rgba(11,22,40,0.1)" }} />
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[0.82rem] font-bold text-white transition-all hover:opacity-90 hover:shadow-md" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
                <Phone className="w-3.5 h-3.5" /> Холбоо барих
              </a>
            </div>
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5" style={{ color: navy }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: navy, minHeight: "calc(100vh - 96px)" }}>
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(70% 60% at 10% 40%, rgba(3,173,180,0.18) 0%, transparent 55%), radial-gradient(50% 50% at 90% 20%, rgba(253,46,187,0.12) 0%, transparent 50%), radial-gradient(40% 40% at 70% 80%, rgba(3,173,180,0.08) 0%, transparent 50%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: teal }} />
                <span className="text-[0.8rem] font-bold tracking-wider" style={{ color: teal }}>МОНГОЛ УЛСЫН ХӨДӨЛМӨРИЙН ГАЗАР</span>
              </div>

              <h1 className="font-extrabold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>
                Монгол даяар{" "}
                <span style={{ color: teal }}>илүү</span>{" "}
                <span style={{ background: "linear-gradient(135deg, #03ADB4 0%, #FD2EBB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  аюулгүй
                </span>{" "}
                <span style={{ color: pink }}>ажлын байр</span>{" "}
                бий болгох нь
              </h1>

              <p className="mb-10 max-w-[500px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", lineHeight: 1.7 }}>
                Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн үндэсний байгууллага — ISO 45001 стандарт, мэргэжилтний сургалт, хиймэл оюун ухаанд суурилсан аюулгүй ажиллагааны удирдамжаар дамжуулан ажил олгогч болон ажилчдыг чадавхжуулах.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#membership" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 8px 30px rgba(3,173,180,0.35)" }}>
                  Гишүүн болох <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#training" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10" style={{ border: "1.5px solid rgba(3,173,180,0.5)", color: teal }}>
                  <BookOpen className="w-4 h-4" /> Сургалтын хөтөлбөрүүд
                </a>
                <a href="#ai-assistant" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105" style={{ background: "linear-gradient(135deg,#FD2EBB,#D41EA0)", boxShadow: "0 8px 30px rgba(253,46,187,0.3)" }}>
                  <Bot className="w-4 h-4" /> Хиймэл оюун ухааны аюулгүй байдлын туслах
                </a>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#334DCC","#9933CC","#CC3380","#CC6633"].map((c,i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: navy }} />
                    ))}
                  </div>
                  <span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <strong style={{ color: "rgba(255,255,255,0.85)" }}>2,800+</strong> компанийн итгэлийг хүлээсэн
                  </span>
                </div>
                <button className="flex items-center gap-2 transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Play className="w-3 h-3" fill="currentColor" />
                  </div>
                  <span className="text-[0.8rem] font-medium">Манай түүхийг үзээрэй</span>
                </button>
              </div>
            </div>

            {/* Right – image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 440, boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
                <Image src="https://images.unsplash.com/photo-1652303518379-c0ef1c9fb2b1?w=800&q=80" alt="Барилгын талбай дахь аюулгүй байдлын мэргэжилтнүүд" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(11,22,40,0.5) 100%)" }} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl" style={{ background: "rgba(11,22,40,0.7)", border: "1px solid rgba(3,173,180,0.4)" }}>
                  <span style={{ color: teal, fontSize: "1.2rem" }}>✓</span>
                  <div>
                    <div className="font-bold text-white text-[0.75rem]">ISO 45001 гэрчилгээтэй</div>
                    <div className="text-[0.65rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Удирдлагын системийн стандарт</div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                <div className="font-extrabold text-[1.4rem]" style={{ color: pink }}>47,000+</div>
                <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>Ажилчид хамгаалагдсан</div>
              </div>
              <div className="absolute -left-6 top-1/3 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                <div className="font-extrabold text-[1.4rem]" style={{ color: teal }}>98.2%</div>
                <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>Дагаж мөрдөх түвшин</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-48 h-32 rounded-xl overflow-hidden" style={{ border: `3px solid ${navy}`, boxShadow: "0 15px 40px rgba(0,0,0,0.4)" }}>
                <Image src="https://images.unsplash.com/photo-1581094480465-4e6c25fb4a52?w=400&q=80" alt="Аюулгүй байдлын инженер" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Building2 className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.125)", border: "rgba(3,173,180,0.19)", value: "2,847", label: "Гишүүн компаниуд", color: teal },
                { icon: <Users className="w-4 h-4" style={{ color: pink }} />, bg: "rgba(253,46,187,0.125)", border: "rgba(253,46,187,0.19)", value: "47,000+", label: "Ажилчид хамгаалагдсан", color: pink },
                { icon: <Award className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.125)", border: "rgba(3,173,180,0.19)", value: "98.2%", label: "Дагаж мөрдөх түвшин", color: teal },
                { icon: <TrendingUp className="w-4 h-4" style={{ color: pink }} />, bg: "rgba(253,46,187,0.125)", border: "rgba(253,46,187,0.19)", value: "156", label: "Баталгаажсан сургагч багш нар", color: pink },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-[1.3rem] leading-tight">{s.value}</div>
                    <div className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access ── */}
      <section className="py-14" style={{ background: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>Түргэн хандалт</h2>
            <p className="text-[0.9rem] mt-1" style={{ color: "#6B7C93" }}>Хамгийн их ашиглагддаг нөөцүүд, нэг товшилтын зайд</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <TriangleAlert className="w-4.5 h-4.5" style={{ color: "#ef4444" }} />, bg: "rgb(254,242,242)", border: "rgba(239,68,68,0.2)", shadow: "rgba(239,68,68,0.19)", title: "Яаралтай тусламжийн холбоо барих хаягууд", desc: "Ажлын байрны ослын үед 24/7 шуурхай утас болон яаралтай тусламж", link: "Одоо тусламж аваарай", color: "#ef4444" },
              { icon: <HardHat className="w-4.5 h-4.5" style={{ color: "#f59e0b" }} />, bg: "rgb(254,252,232)", border: "rgba(245,158,11,0.2)", shadow: "rgba(245,158,11,0.19)", title: "ХХХ-ийн шаардлага", desc: "Салбарын онцлогт тохирсон хувийн хамгаалалтын хэрэгслийн стандартууд", link: "Стандартуудыг харах", color: "#f59e0b" },
              { icon: <FileCheck className="w-4.5 h-4.5" style={{ color: teal }} />, bg: "rgb(224,247,248)", border: "rgba(3,173,180,0.2)", shadow: "rgba(3,173,180,0.19)", title: "Аюулгүй байдлын аудитын хэрэгслүүд", desc: "ISO 45001 стандартын нийцлийн шалгах хуудас, аудитын хүрээ", link: "Татаж авах хэрэгслүүд", color: teal },
              { icon: <GraduationCap className="w-4.5 h-4.5" style={{ color: "#8b5cf6" }} />, bg: "rgb(245,243,255)", border: "rgba(139,92,246,0.2)", shadow: "rgba(139,92,246,0.19)", title: "Сургалтын хуанли", desc: "Удахгүй болох бүх ХАБЭА-н гэрчилгээ, сургалтын хөтөлбөрүүд", link: "Хуанли харах", color: "#8b5cf6" },
              { icon: <BookOpen className="w-4.5 h-4.5" style={{ color: pink }} />, bg: "rgba(253,46,187,0.06)", border: "rgba(253,46,187,0.2)", shadow: "rgba(253,46,187,0.19)", title: "Зохицуулалтын номын сан", desc: "Монгол улсын болон олон улсын аюулгүй байдлын хууль, дүрэм", link: "Номын санг үзэх", color: pink },
              { icon: <Building2 className="w-4.5 h-4.5" style={{ color: navy }} />, bg: "rgb(248,250,252)", border: "rgba(11,22,40,0.15)", shadow: "rgba(11,22,40,0.19)", title: "Гишүүний портал", desc: "Гишүүдийн онцгой нөөц, гэрчилгээ болон хичээлийн материал", link: "Нэвтрэх", color: navy },
            ].map((c, i) => (
              <a key={i} href="#" className="group flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#fff", boxShadow: `0 4px 12px ${c.shadow}` }}>
                  {c.icon}
                </div>
                <div className="font-bold text-[0.8rem] mb-1 leading-tight" style={{ color: navy }}>{c.title}</div>
                <p className="text-[0.7rem] leading-relaxed mb-3" style={{ color: "#6B7C93", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.desc}</p>
                <span className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: c.color }}>
                  {c.link} <ChevronRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── News & Updates ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: "rgb(224,247,248)", border: "1px solid rgba(3,173,180,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: teal }} />
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>МЭДЭЭ БА ШИНЭЧЛЭЛТҮҮД</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>MANOSH-н хамгийн сүүлийн үеийн мэдээ</h2>
            </div>
            <a href="#news" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-[#028e95] transition-colors" style={{ color: teal }}>
              Бүх мэдээг харах <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured */}
            <div className="lg:col-span-3">
              <a href="#" className="group block h-full">
                <div className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl" style={{ border: "1px solid rgba(11,22,40,0.08)" }}>
                  <div className="relative overflow-hidden" style={{ height: 260 }}>
                    <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="ISO 45001 Монгол улс" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(11,22,40,0.6) 100%)" }} />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: teal }}>Стандарт</span>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-lg" style={{ background: "rgba(255,255,255,0.15)" }}>Онцлох түүх</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold mb-3 leading-tight group-hover:text-[#03ADB4] transition-colors" style={{ color: navy, fontSize: "1.2rem" }}>
                      Монгол улс ISO 45001:2018-ийг үндэсний стандарт болгон хүлээн авлаа — Шинэ гэрчилгээний хөтөлбөр эхэллээ
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: "#6B7C93", fontSize: "0.9rem" }}>
                      MANOSH Олон улсын хөдөлмөрийн байгууллагатай хамтран улсын анхны ISO 45001 Ахлах аудиторын гэрчилгээний хөтөлбөрийг албан ёсоор эхлүүлж, 2025 он гарахад 500 гэрчилгээтэй аудитор бэлтгэх зорилго тавьж байна.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                        <Clock className="w-3 h-3" /> 2024 оны 11-р сарын 28
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                        <Search className="w-3 h-3" /> 5 мин унших
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Side articles */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                { img: "https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=300&q=80", tag: "Журам", tagColor: pink, tagBg: "rgba(253,46,187,0.09)", title: "Уул уурхайн аюулгүй байдлын шинэ журам 2025 оны 1-р сараас хэрэгжиж эхэлнэ", date: "2024 оны 11-р сарын 15" },
                { img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80", tag: "Үйл явдлууд", tagColor: teal, tagBg: "rgba(3,173,180,0.09)", title: "Улаанбаатар хотод жил бүр зохион байгуулагддаг ХАБЭА-н дээд хэмжээний уулзалт 1,200 оролцогчтой боллоо", date: "2024 оны 10-р сарын 30" },
                { img: "https://images.unsplash.com/photo-1600823921193-c388313a14a5?w=300&q=80", tag: "Аюулгүй байдлын кампанит ажил", tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.09)", title: '"Тэг хохирол 2025" үндэсний ажлын байрны аюулгүй байдлын кампанит ажил эхэллээ', date: "2024 оны 10-р сарын 18" },
              ].map((n, i) => (
                <a key={i} href="#" className="group block">
                  <div className="flex gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md" style={{ border: "1px solid rgba(11,22,40,0.07)", background: "#fff" }}>
                    <div className="relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden">
                      <Image src={n.img} alt={n.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-1.5" style={{ background: n.tagBg, color: n.tagColor }}>{n.tag}</span>
                      <h4 className="font-bold text-[0.85rem] leading-tight mb-1.5 group-hover:text-[#03ADB4] transition-colors line-clamp-2" style={{ color: navy }}>{n.title}</h4>
                      <div className="flex items-center gap-1.5 text-[0.72rem]" style={{ color: "#6B7C93" }}>
                        <Clock className="w-2.5 h-2.5" /> {n.date}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              <a href="#news" className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-[#03ADB4] hover:text-white hover:shadow-md" style={{ border: `1.5px solid ${teal}`, color: teal }}>
                Бүх мэдээ &amp; шинэчлэлтүүд <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Laws & Standards ── */}
      <section className="py-16 lg:py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: "rgba(253,46,187,0.1)", border: "1px solid rgba(253,46,187,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: pink }} />
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: pink }}>ХУУЛЬ, ДҮРЭМ ЖУРАМ &amp; СТАНДАРТ</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>Хуулийн хүрээ &amp; стандартууд</h2>
              <p className="mt-2 text-[0.95rem]" style={{ color: "#6B7C93" }}>Монгол улсын хөдөлмөрийн аюулгүй байдлын хууль, дүрэм журам болон олон улсын стандартуудад хандах.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7C93" }} />
              <input type="text" placeholder="Хууль, стандартыг хайх..." className="pl-10 pr-4 py-2.5 rounded-xl border text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#03ADB4]" style={{ borderColor: "rgba(11,22,40,0.12)", background: "#fff", color: navy }} />
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["Бүгд", "Үндэсний хууль", "Дүрэм журам", "Үндэсний стандарт", "Олон улсын"].map((tab, i) => (
              <button key={tab} className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all" style={i === 0 ? { background: teal, color: "#fff", border: `1.5px solid ${teal}` } : { background: "#fff", color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Scale className="w-4.5 h-4.5" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.082)", tag: "Хүчин төгөлдөр", tagColor: "#16a34a", tagBg: "rgb(220,252,231)", code: "MGL-OSH-2008", title: "Хөдөлмөрийн аюулгүй байдлын тухай хууль", desc: "Монгол улсын бүх ажил олгогч, ажилчдын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн шаардлагыг зохицуулах үндсэн хууль.", downloads: "3.4K таталт", isNew: false },
              { icon: <Globe className="w-4.5 h-4.5" style={{ color: pink }} />, iconBg: "rgba(253,46,187,0.082)", tag: "Идэвхтэй", tagColor: teal, tagBg: "rgb(224,247,248)", code: "ISO 45001:2018", title: "ISO 45001:2018 — Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн удирдлагын систем", desc: "Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн удирдлагын системийн шаардлагыг тодорхойлсон олон улсын стандарт.", downloads: "8.1K таталт", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#f59e0b" }} />, iconBg: "rgba(245,158,11,0.082)", tag: "Шинэ", tagColor: "#d97706", tagBg: "rgb(254,243,199)", code: "REG-MINE-2024", title: "Уул уурхайн аюулгүй байдал, эрүүл ахуйн дүрэм 2024", desc: "Уул уурхайн үйл ажиллагааны шинэчлэгдсэн дүрэм — дижитал аюулын хяналт, ХХХ-ийн шаардлага, яаралтай тусламж.", downloads: "1.8K таталт", isNew: true },
              { icon: <BookOpen className="w-4.5 h-4.5" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.082)", tag: "Идэвхтэй", tagColor: teal, tagBg: "rgb(224,247,248)", code: "MNS 4587:2015", title: "MNS 4587:2015 — Хувийн хамгаалалтын хэрэгслийн стандарт", desc: "Бүх төрлийн хувийн хамгаалалтын хэрэгслийн техникийн үзүүлэлт, туршилт, гэрчилгээжүүлэлтийн шаардлагыг тодорхойлсон үндэсний стандарт.", downloads: "2.6K таталт", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#8b5cf6" }} />, iconBg: "rgba(139,92,246,0.082)", tag: "Идэвхтэй", tagColor: teal, tagBg: "rgb(224,247,248)", code: "REG-CONST-2021", title: "Барилгын талбайн аюулгүй байдлын практик дүрэм", desc: "Барилгын талбайн нарийн хийц, унах хамгаалалт, тоног төхөөрөмжийн аюулгүй ажиллагаа, талбайн удирдлага.", downloads: "2.2K таталт", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#ef4444" }} />, iconBg: "rgba(239,68,68,0.082)", tag: "Идэвхтэй", tagColor: teal, tagBg: "rgb(224,247,248)", code: "REG-CHEM-2020", title: "Химийн аюулын хяналт, эрүүл мэндэд хортой бодисын дүрэм", desc: "Эрүүл мэндэд хортой бодисын боловсруулалт, хадгалалт, шошгололт, устгалын стандартыг зохицуулсан дүрэм.", downloads: "1.5K таталт", isNew: false },
            ].map((law, i) => (
              <div key={i} className="group relative bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                {law.isNew && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)" }}>ШИНЭ</div>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: law.iconBg }}>
                    {law.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: law.tagBg, color: law.tagColor }}>{law.tag}</span>
                      <span className="text-[0.72rem]" style={{ color: "#6B7C93" }}>{law.code}</span>
                    </div>
                    <h3 className="font-bold text-[0.875rem] leading-snug group-hover:text-[#03ADB4] transition-colors line-clamp-2" style={{ color: navy }}>{law.title}</h3>
                  </div>
                </div>
                <p className="line-clamp-2 mb-4 text-[0.8rem] leading-relaxed" style={{ color: "#6B7C93" }}>{law.desc}</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                  <div className="flex items-center gap-1.5 text-[0.72rem]" style={{ color: "#6B7C93" }}>
                    <Download className="w-3 h-3" /> {law.downloads}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-[#e0f7f8] transition-colors" style={{ color: teal }}>
                      <Download className="w-3 h-3" /> PDF
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors" style={{ color: "#6B7C93" }}>
                      <ExternalLink className="w-3 h-3" /> Харах
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#laws" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg" style={{ background: "linear-gradient(135deg,#0B1628,#162040)" }}>
              Бүрэн номын сан харах <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Statistics Dashboard ── */}
      <section className="py-16 lg:py-24" style={{ background: navy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: teal }} />
              <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>АЮУЛГҮЙ БАЙДЛЫН СТАТИСТИКИЙН САМБАР</span>
            </div>
            <h2 className="font-extrabold leading-tight text-white" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
              Монгол улсын ажлын байрны аюулгүй байдлын{" "}
              <span style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                үр нөлөөний үзүүлэлтүүд
              </span>
            </h2>
            <p className="mt-3 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.55)" }}>Монгол улсын гол салбаруудад хянагддаг аюулгүй байдлын гүйцэтгэлийн бодит цагийн өгөгдөл</p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <TrendingDown className="w-4 h-4" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.145)", value: "-65%", label: "Ослын бууралт", sub: "MANOSH байгуулагдсанаас хойш (2014)", color: teal },
              { icon: <TriangleAlert className="w-4 h-4" style={{ color: "#f59e0b" }} />, iconBg: "rgba(245,158,11,0.145)", value: "4.3", label: "1,000 ажилчинд ногдох осол", sub: "2024 оны улсын түвшний үзүүлэлт (2019 онд 12.4 байсан)", color: "#f59e0b" },
              { icon: <CircleCheck className="w-4 h-4" style={{ color: "#16a34a" }} />, iconBg: "rgba(22,163,74,0.145)", value: "96%", label: "Шалгалтын нийцэл", sub: "Гэрчилгээтэй байгууллагын тэнцэх хувь", color: "#16a34a" },
              { icon: <Activity className="w-4 h-4" style={{ color: pink }} />, iconBg: "rgba(253,46,187,0.145)", value: "340+", label: "Нийтлэгдсэн стандарт", sub: "Үндэсний болон салбарын стандартууд", color: pink },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl p-5 transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: m.iconBg }}>{m.icon}</div>
                <div className="font-extrabold text-[1.6rem] leading-none mb-1" style={{ color: m.color }}>{m.value}</div>
                <div className="text-white text-[0.8rem] font-semibold mb-1">{m.label}</div>
                <div className="text-[0.72rem] leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Area chart (SVG) */}
            <div className="lg:col-span-3 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-white text-[0.95rem]">Ажлын байрны ослын түвшний чиг хандлага</h3>
                  <p className="text-[0.78rem] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>1,000 ажилчинд ногдох осол — 2019–2024</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(3,173,180,0.15)" }}>
                  <TrendingDown className="w-3 h-3" style={{ color: teal }} />
                  <span className="text-[0.75rem] font-bold" style={{ color: teal }}>2019 оноос -65%</span>
                </div>
              </div>
              {/* Simple SVG chart */}
              <svg viewBox="0 0 600 200" className="w-full" style={{ height: 220 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#03ADB4" stopOpacity="0.3" />
                    <stop offset="95%" stopColor="#03ADB4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FD2EBB" stopOpacity="0.2" />
                    <stop offset="95%" stopColor="#FD2EBB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid */}
                {[0, 50, 100, 150, 200].map(y => (
                  <line key={y} x1="40" y1={y} x2="590" y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                ))}
                {/* Y labels */}
                {[{y:200,v:"0"},{y:150,v:"8"},{y:100,v:"16"},{y:50,v:"24"},{y:5,v:"32"}].map(l => (
                  <text key={l.y} x="30" y={l.y} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.5)" dominantBaseline="middle">{l.v}</text>
                ))}
                {/* X labels */}
                {["2019","2020","2021","2022","2023","2024"].map((yr, i) => (
                  <text key={yr} x={40 + i * 110} y="215" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">{yr}</text>
                ))}
                {/* Teal area */}
                <path d="M40,120 C95,123 150,126 205,130 S315,140 370,143 S480,150 535,154 L590,158 L590,200 L40,200 Z" fill="url(#tealGrad)" />
                <path d="M40,120 C95,123 150,126 205,130 S315,140 370,143 S480,150 535,154 L590,158" fill="none" stroke="#03ADB4" strokeWidth="2.5" />
                {/* Pink area */}
                <path d="M40,30 C95,38 150,45 205,52 S315,65 370,75 S480,100 535,112 L590,130 L590,200 L40,200 Z" fill="url(#pinkGrad)" />
                <path d="M40,30 C95,38 150,45 205,52 S315,65 370,75 S480,100 535,112 L590,130" fill="none" stroke="#FD2EBB" strokeWidth="2" />
                {/* Dots */}
                {[40,150,260,370,480,590].map((x, i) => {
                  const ty = [120,126,130,143,150,158][i];
                  const py = [30,45,52,75,100,130][i];
                  return (
                    <g key={i}>
                      <circle cx={x} cy={ty} r="4" fill="#03ADB4" />
                      <circle cx={x} cy={py} r="3" fill="#FD2EBB" />
                    </g>
                  );
                })}
              </svg>
              <div className="flex items-center gap-5 mt-2">
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full" style={{ background: teal }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Ослын түвшин / 1K ажилчин</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full" style={{ background: pink }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Ослын дөхөмдөл / 1K ажилчин</span></div>
              </div>
            </div>

            {/* Risk index bars */}
            <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-bold text-white text-[0.95rem] mb-1">Салбараар эрсдэлийн индекс</h3>
              <p className="text-[0.78rem] mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Үлдэгдэл эрсдэлийн оноо (бага байх нь сайн)</p>
              <div className="space-y-3">
                {[
                  { label: "Уул уурхай", score: 68, color: "linear-gradient(90deg,#ef4444,#f97316)" },
                  { label: "Барилга", score: 52, color: "linear-gradient(90deg,#ef4444,#f97316)" },
                  { label: "Үйлдвэрлэл", score: 34, color: "linear-gradient(90deg,#f59e0b,#fbbf24)" },
                  { label: "Тээвэр", score: 28, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
                  { label: "Хөдөө аж ахуй", score: 21, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
                  { label: "Үйлчилгээ", score: 8, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
                ].map((r) => {
                  const scoreColor = r.score >= 50 ? "#ef4444" : r.score >= 30 ? "#f59e0b" : "#16a34a";
                  return (
                    <div key={r.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[0.8rem] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{r.label}</span>
                        <span className="text-[0.78rem] font-bold" style={{ color: scoreColor }}>{r.score}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${r.score}%`, background: r.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Training Events ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: "rgba(3,173,180,0.1)", border: "1px solid rgba(3,173,180,0.2)" }}>
                <Calendar className="w-3 h-3" style={{ color: teal }} />
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>УРАГДАХ АРГА ХЭМЖЭЭ</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>Сургалт, хурал &amp; арга хэмжээ</h2>
            </div>
            <a href="#events" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-[#028e95] transition-colors" style={{ color: teal }}>
              Хуанли харах <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", day: "15", month: "12-Р САР", tag: "Сургалт", tagColor: teal, tagBg: "rgba(3,173,180,0.09)", title: "ISO 45001 Ахлах аудиторын сургалт", desc: "Олон улсын ISO 45001 Ахлах аудиторын гэрчилгээнд хүргэх 5 хоногийн нарийн сургалт.", time: "2024.12.15–19 · 09:00 – 17:00", location: "Улаанбаатар, Монгол улс", seats: "12 суудал үлдсэн", price: "₮850,000", btnColor: "linear-gradient(135deg,#03ADB4,rgba(3,173,180,0.8))" },
              { img: null, day: "22", month: "12-Р САР", tag: "Гэрчилгээ", tagColor: "#ef4444", tagBg: "rgba(239,68,68,0.09)", title: "Галын аюулгүй байдлын гэрчилгээний хөтөлбөр", desc: "Галын сэргийлэлт, эвакуаци, унтраагч ашиглах. MANOSH-ийн дижитал гэрчилгээтэй.", time: "2024.12.22 · 10:00 – 16:00", location: "Онлайн (Zoom)", seats: "Бүртгэл нээлттэй", price: "₮120,000", btnColor: "linear-gradient(135deg,#ef4444,rgba(239,68,68,0.8))" },
              { img: null, day: "15", month: "1-Р САР", tag: "Хурлын", tagColor: "#8b5cf6", tagBg: "rgba(139,92,246,0.09)", title: "2025 оны ерөнхий чуулган", desc: "2024 оны гүйцэтгэлийг хянан, зөвлөлийн гишүүдийг сонгож, 2025 оны стратегийн зорилтыг тогтоох ерөнхий чуулган.", time: "2025.01.15 · 14:00 – 18:00", location: "Улаанбаатарын хурлын төв", seats: "Зөвхөн гишүүд", price: "Үнэгүй (Гишүүд)", btnColor: "linear-gradient(135deg,#8b5cf6,rgba(139,92,246,0.8))" },
              { img: null, day: "22", month: "1-Р САР", tag: "Семинар", tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.09)", title: "Ажлын байрны эрсдэлийн үнэлгээний семинар", desc: "Аюулын тодорхойлолт, эрсдэлийн матриц, ISO 45001 аргачлалаар хяналтын шатлал.", time: "2025.01.22 · 09:00 – 13:00", location: "Онлайн (Teams)", seats: "Бүртгэл нээлттэй", price: "₮95,000", btnColor: "linear-gradient(135deg,#f59e0b,rgba(245,158,11,0.8))" },
              { img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", day: "5", month: "2-Р САР", tag: "Хурал", tagColor: pink, tagBg: "rgba(253,46,187,0.09)", title: "Уул уурхайн аюулгүй байдлын форум 2025", desc: "Зохицуулагч, оператор, олон улсын мэргэжилтнүүдийг нэгтгэсэн Монголын уул уурхайн аюулгүй байдлын хурал.", time: "2025.02.05–06 · 08:30 – 18:00", location: "Улаанбаатар, Монгол улс", seats: "Бүртгэл нээлттэй", price: "₮450,000", btnColor: "linear-gradient(135deg,#FD2EBB,rgba(253,46,187,0.8))" },
            ].map((ev, i) => (
              <div key={i} className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                {ev.img ? (
                  <div className="relative overflow-hidden" style={{ height: 140 }}>
                    <Image src={ev.img} alt={ev.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(11,22,40,0.6) 100%)" }} />
                    <div className="absolute top-3 left-3 w-12 text-center rounded-xl py-1.5" style={{ background: navy }}>
                      <div className="font-extrabold text-[1.2rem] leading-none" style={{ color: teal }}>{ev.day}</div>
                      <div className="text-[0.62rem] font-semibold tracking-wider text-white/60">{ev.month}</div>
                    </div>
                  </div>
                ) : null}
                <div className="p-5">
                  {!ev.img && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 text-center rounded-xl py-1.5 flex-shrink-0" style={{ background: ev.tagBg }}>
                        <div className="font-extrabold text-[1.2rem] leading-none" style={{ color: ev.tagColor }}>{ev.day}</div>
                        <div className="text-[0.62rem] font-semibold tracking-wider opacity-70" style={{ color: ev.tagColor }}>{ev.month}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: ev.tagBg, color: ev.tagColor }}>{ev.tag}</span>
                    </div>
                  )}
                  {ev.img && (
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold mb-3" style={{ background: ev.tagBg, color: ev.tagColor }}>{ev.tag}</span>
                  )}
                  <h3 className="font-bold text-[0.9rem] leading-tight mb-2 group-hover:text-[#03ADB4] transition-colors" style={{ color: navy }}>{ev.title}</h3>
                  <p className="line-clamp-2 mb-4 text-[0.78rem] leading-relaxed" style={{ color: "#6B7C93" }}>{ev.desc}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}><Clock className="w-3 h-3" />{ev.time}</div>
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}>
                      {ev.location.startsWith("Онлайн") ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {ev.location}
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}><Users className="w-3 h-3" />{ev.seats}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                    <span className="font-bold text-[0.875rem]" style={{ color: navy }}>{ev.price}</span>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:shadow-md hover:scale-105 transition-all" style={{ background: ev.btnColor }}>
                      Бүртгүүлэх →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Safety Assistant ── */}
      <section id="ai-assistant" className="py-16 lg:py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(253,46,187,0.1)", border: "1px solid rgba(253,46,187,0.2)" }}>
                <Sparkles className="w-3 h-3" style={{ color: pink }} />
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: pink }}>ХИЙМЭЛ ОЮУН УХААНД СУУРИЛСАН ТУСЛАХ</span>
              </div>
              <h2 className="font-extrabold leading-tight mb-4" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
                Монголын аюулгүй байдлын хуульд{" "}
                <span style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  24/7 мэргэжилтэн
                </span>
              </h2>
              <p className="mb-8 leading-relaxed text-[0.95rem]" style={{ color: "#6B7C93" }}>
                Манай хиймэл оюун ухааны туслах нь Монгол улсын хөдөлмөрийн аюулгүй байдлын хууль, олон улсын стандарт, MANOSH-ийн удирдамж дээр сургагдсан — ажлын байрны аюулгүй байдлын асуултад шуурхай, найдвартай хариулт өгнө.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Search className="w-4 h-4" style={{ color: teal }} />, title: "Зохицуулалтын хайлт", desc: "Монголын бүрэн хуулийн сангаас ХАБЭА-н дүрэм, журамыг түлхүүр үг, салбар, аюулын төрлөөр хайх." },
                  { icon: <FileText className="w-4 h-4" style={{ color: teal }} />, title: "Стандарт тайлбар", desc: "ISO 45001 заалт болон Монголын үндэсний стандартыг энгийн хэлээр хэдхэн секундэд тайлбарлах." },
                  { icon: <Activity className="w-4 h-4" style={{ color: teal }} />, title: "Эрсдэлийн үнэлгээний хэрэгсэл", desc: "ISO 45001 аргачлалаар ажлын байрны аюулын тодорхойлолт, эрсдэлийн үнэлгээ хийх алхам алхмаар заавар." },
                  { icon: <CircleCheck className="w-4 h-4" style={{ color: teal }} />, title: "24/7 аюулгүй байдлын FAQ", desc: "5,000+ түгээмэл асуултын хариулт — хууль шинэчлэгдэх бүрт шинэчлэгддэг." },
                ].map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl hover:shadow-md transition-all bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgb(224,247,248)" }}>{f.icon}</div>
                    <div className="font-bold text-[0.875rem] mb-1" style={{ color: navy }}>{f.title}</div>
                    <p className="text-[0.78rem] leading-snug" style={{ color: "#6B7C93" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              <a href="#ai" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg,#FD2EBB,#D41EA0)", boxShadow: "0 8px 30px rgba(253,46,187,0.3)" }}>
                <Bot className="w-4 h-4" /> Хиймэл оюун ухааны туслах нээх <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right – Chat UI */}
            <div>
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(11,22,40,0.1)", boxShadow: "0 30px 80px rgba(11,22,40,0.12)" }}>
                {/* Chat header */}
                <div className="px-5 py-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#0B1628,#162040)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}>
                    <Shield className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-[0.9rem]">MANOSH Аюулгүй байдлын AI</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Онлайн · 340+ ХАБЭА стандартаар сургагдсан</span>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 ml-auto" style={{ color: pink }} />
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 overflow-y-auto" style={{ background: "#F8FAFC", minHeight: 320, maxHeight: 360 }}>
                  {/* User */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm text-white text-[0.85rem] leading-relaxed" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 4px 15px rgba(3,173,180,0.35)" }}>
                      Монгол улсад уул уурхайн үйл ажиллагааны заавал өмсөх ХХХ-ийн шаардлага юу вэ?
                    </div>
                  </div>
                  {/* AI */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}>
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-white text-[0.85rem] leading-relaxed" style={{ color: navy, boxShadow: "0 2px 12px rgba(11,22,40,0.08)" }}>
                      <p>Монгол улсын <strong>Уул уурхайн аюулгүй байдал, эрүүл ахуйн дүрэм 2024</strong> (4.3 заалт)-ын дагуу газрын доор болон гадаргуудын уул уурхайн ажилчид дараах хувийн хамгаалалтын хэрэгслийг заавал өмснө:</p>
                      <p className="mt-2">• <strong>Аюулгүй малгай</strong> — METS Class E, EN 397 стандартад нийцсэн</p>
                      <p>• <strong>Тод харагдах хантааз</strong> — EN ISO 20471 Class 2+</p>
                      <p>• <strong>Аюулгүй гутал</strong> — төмөр хамгаалалттай, EN ISO 20345 S3</p>
                      <p>• <strong>Нүдний шил</strong> — EN 166 цохилтын хамгаалалттай</p>
                      <p>• <strong>Амьсгалын хамгаалалт</strong> — тоосны бүс &gt;5 мг/м³ үед</p>
                      <p className="mt-2">Дэлгэрэнгүй үзүүлэлтийг <strong>MNS 4587:2015</strong> стандартаас харна уу.</p>
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid rgba(11,22,40,0.07)" }}>
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: "rgb(224,247,248)", color: teal }}>📄 Уул уурхайн аюулгүй байдлын дүрэм 2024</span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: "rgb(224,247,248)", color: teal }}>📄 MNS 4587:2015</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 bg-white" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "#F0F4F8", border: "1px solid rgba(11,22,40,0.08)" }}>
                    <input type="text" placeholder="Хууль, стандарт, эрсдэлийн үнэлгээний талаар асуу..." className="flex-1 bg-transparent focus:outline-none text-sm" style={{ color: navy }} />
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition-all" style={{ background: "rgb(224,244,245)" }}>
                      <Send className="w-3.5 h-3.5" style={{ color: "#6B7C93" }} />
                    </button>
                  </div>
                  <p className="text-[0.68rem] text-center mt-2" style={{ color: "#6B7C93" }}>AI-ийн хариулт нь зөвхөн зөвлөмж юм. Хуулийн нийцлийн талаар баталгаажсан аюулгүй байдлын мэргэжилтэнтэй зөвлөнө үү.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16" style={{ background: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ background: "rgb(224,247,248)", border: "1px solid rgba(3,173,180,0.2)" }}>
              <Star className="w-3 h-3" style={{ color: teal }} />
              <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>ГИШҮҮДИЙН СЭТГЭГДЭЛ</span>
            </div>
            <h2 className="font-extrabold" style={{ color: navy, fontSize: "clamp(1.5rem,3vw,2rem)" }}>Монголын салбарын тэргүүлэгч байгууллагуудын итгэл</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "MANOSH-ийн ISO 45001 сургалт бидний уул уурхайн аюулгүй байдлын удирдлагыг бүрэн өөрчилсөн. 18 сарын турш ноцтой осол гараагүй.", name: "Баяраа Гантулга", role: "ХАБЭА-н менежер, Эрдэнэс Тавантолгой", initial: "Б", bg: "linear-gradient(135deg,#03ADB4,#028E95)" },
              { quote: "Хиймэл оюун ухааны туслах манай хуулийн асуултад шууд хариулж өгдөг. 24/7 аюулгүй байдлын хуульчтай байгаа мэт.", name: "Энхжаргал Болд", role: "Аюулгүй байдлын мэргэжилтэн, Монгол төмөр зам", initial: "Э", bg: "linear-gradient(135deg,#FD2EBB,#D41EA0)" },
              { quote: "MANOSH-ийн удирдамжаар манай барилгын компани 2024 оны шинэ дүрэмд зөвхөн 3 долоо хоногийн дотор нийцлээ.", name: "Цэрэнпунцаг Лхагва", role: "Захирал, Монкон групп", initial: "Ц", bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white hover:shadow-xl hover:-translate-y-1 transition-all" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5" fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p className="italic mb-5 leading-relaxed text-[0.9rem]" style={{ color: "#334155" }}>&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(11,22,40,0.07)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: t.bg }}>{t.initial}</div>
                  <div>
                    <div className="font-bold text-[0.85rem]" style={{ color: navy }}>{t.name}</div>
                    <div className="text-[0.75rem]" style={{ color: "#6B7C93" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[0.82rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "#6B7C93" }}>Олон улсын түнш байгууллагууд &amp; хамтрагчид</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { flag: "🌐", name: "ILO", title: "Олон улсын хөдөлмөрийн байгууллага" },
              { flag: "📋", name: "ISO", title: "Олон улсын стандартчилалын байгууллага" },
              { flag: "🏥", name: "WHO", title: "Дэлхийн эрүүл мэндийн байгууллага" },
              { flag: "🇰🇷", name: "KOSHA", title: "Солонгосын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн байгууллага" },
              { flag: "🇯🇵", name: "JISHA", title: "Японы аж үйлдвэрийн аюулгүй байдал, эрүүл ахуйн холбоо" },
              { flag: "🇭🇰", name: "OSHC", title: "Хонконгийн хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн зөвлөл" },
              { flag: "🇲🇳", name: "MoLE", title: "Хөдөлмөр, нийгмийн хамгааллын яам" },
              { flag: "🏦", name: "ADB", title: "Азийн хөгжлийн банк" },
            ].map((p) => (
              <div key={p.name} className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:shadow-md cursor-pointer transition-all" style={{ border: "1.5px solid rgba(11,22,40,0.07)" }} title={p.title}>
                <div className="text-[1.3rem] mb-1">{p.flag}</div>
                <div className="font-extrabold text-[0.9rem] group-hover:text-[#03ADB4] transition-colors" style={{ color: navy }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: navy }}>
        {/* CTA */}
        <div className="py-12 text-center px-4" style={{ background: "linear-gradient(135deg,rgba(3,173,180,0.15) 0%,rgba(253,46,187,0.1) 100%)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>Илүү аюулгүй ажлын байр бий болгох бэлэн үү?</h2>
            <p className="mb-6 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.55)" }}>MANOSH-ийн гишүүнчлэл, сургалт, хиймэл оюун ухаанд суурилсан аюулгүй байдлын удирдамжаар ашиглаж буй 2,847 монгол байгууллагад нэгдээрэй.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#membership" className="px-6 py-3 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 8px 25px rgba(3,173,180,0.4)" }}>MANOSH-д нэгдэх</a>
              <a href="#ai" className="px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all" style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}>AI туслах үнэгүй турших</a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-6 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-[1.1rem] text-white">Манош</div>
                  <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>МОНГОЛЫН ХӨДӨЛМӨРИЙН ХОЛБОО</div>
                </div>
              </div>
              <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Монгол улсын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн үндэсний байгууллага — ажилчдыг хамгаалж, бүх салбарт илүү аюулгүй ажлын байр бий болгоход зориулагдсан.</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3"><MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Чингисийн өргөн чөлөө 15, Чингэлтэй дүүрэг,<br />Улаанбаатар 15160, Монгол улс</span></div>
                <div className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>+976 11-329-000</span></div>
                <div className="flex items-center gap-3"><Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>info@manosh.mn</span></div>
              </div>
            </div>

            {/* Link columns */}
            {[
              { title: "MANOSH-Н ТУХАЙ", links: ["Эрхэм зорилго ба алсын хараа", "Байгууллагын бүтэц", "Удирдах зөвлөлийн гишүүд", "Гишүүнчлэлийн мэдээлэл", "Жилийн тайлан", "Түнш байгууллагууд"] },
              { title: "ХУУЛЬ & СТАНДАРТ", links: ["Хөдөлмөрийн аюулгүй байдлын хууль", "Засгийн газрын дүрэм журам", "Үндэсний стандарт (ҮССТ)", "Олон улсын стандартууд", "Татаж авах баримт бичгүүд"] },
              { title: "СУРГАЛТ & БҮТЭЭГДЭХҮҮН", links: ["Аюулгүй байдлын сургалтын материалууд", "Удирдамж", "Хэвлэлүүд", "Аюулгүй байдлын тэмдэг", "Дижитал нөөцүүд", "Гэрчилгээний хөтөлбөрүүд"] },
              { title: "ДЭМЖЛЭГ", links: ["Хиймэл оюун ухааны аюулгүй байдлын туслах", "Түгээмэл асуултуудын мэдээллийн сан", "MANOSH-той холбоо барих", "Ажлын байрны осол мэдээлэх", "Санал хүсэлт & гомдол", "Хэвлэл мэдээлэл"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-[0.82rem] text-white mb-4 tracking-wider">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-[0.82rem] hover:text-[#03ADB4] transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 MANOSH — Монголын Үндэсний Хөдөлмөрийн Аюулгүй Байдал, Эрүүл Ахуйн Холбоо. Бүх эрх хуулиар хамгаалагдсан.</p>
            <div className="flex items-center gap-2 flex-wrap">
              {["ISO 45001:2018", "ILO түнш", "НБУ-ын ТХЗ-тай нийцсэн", "KOSHA баталгаажсан"].map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold" style={{ background: "rgba(3,173,180,0.12)", color: "rgba(3,173,180,0.8)", border: "1px solid rgba(3,173,180,0.2)" }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
