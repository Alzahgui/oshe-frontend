"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield, Globe, Phone, ArrowRight, BookOpen, Bot, Users,
  Download, ExternalLink, TrendingDown, TrendingUp, Clock, MapPin, Monitor,
  Star, Sparkles, Search, Calendar, Send, Menu, Play, ChevronRight, ChevronDown,
} from "lucide-react";
import {
  useAiFeatures, useAnnouncements, useEvents, useFooterLinkGroups,
  useHeroStats, useIndustryRisks, useLawDocuments, useNavMenus,
  useNewsArticles, usePartners, useQuickAccessCards, useSafetyMetrics,
  useSafetyTrends, useSiteSettings, useTestimonials,
} from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { resolveIcon } from "@/lib/icons";
import type { LawDocumentCategory, NavMenu } from "@/types/content";

const teal = "#03ADB4";
const pink = "#FD2EBB";
const navy = "#0B1628";

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K татал`;
  return `${count} татал`;
}

function formatMongolianDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()} оны ${d.getMonth() + 1}-р сарын ${d.getDate()}`;
}

const LAW_CATEGORIES: { label: string; value?: LawDocumentCategory }[] = [
  { label: "Бүгд" },
  { label: "Үндэсний хууль", value: "national_law" },
  { label: "Дүрэм журам", value: "regulation" },
  { label: "Үндэсний стандарт", value: "national_standard" },
  { label: "Олон улсын", value: "international_standard" },
];

function HeaderNav({ menus }: { menus: NavMenu[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-0.5">
      {menus.map((menu) => {
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
                    const Icon = resolveIcon(item.icon);
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
  const { data: announcements } = useAnnouncements();
  const { data: navMenus } = useNavMenus();
  const { data: heroStatBar } = useHeroStats("stat_bar");
  const { data: heroFloating } = useHeroStats("floating");
  const { data: settings } = useSiteSettings();
  const quickAccessQuery = useQuickAccessCards();
  const newsQuery = useNewsArticles();

  const [lawCategory, setLawCategory] = useState<LawDocumentCategory | undefined>(undefined);
  const [lawSearch, setLawSearch] = useState("");
  const deferredLawSearch = useDeferredValue(lawSearch);
  const lawsQuery = useLawDocuments({ category: lawCategory, q: deferredLawSearch || undefined });

  const safetyMetricsQuery = useSafetyMetrics();
  const safetyTrendsQuery = useSafetyTrends();
  const industryRisksQuery = useIndustryRisks();
  const eventsQuery = useEvents();
  const { data: aiFeatures } = useAiFeatures();
  const testimonialsQuery = useTestimonials();
  const partnersQuery = usePartners();
  const footerLinkGroupsQuery = useFooterLinkGroups();

  const announcement = announcements?.[0];
  const newsArticles = newsQuery.data ?? [];
  const featuredNews = newsArticles.find((a) => a.isFeatured) ?? newsArticles[0];
  const otherNews = newsArticles.filter((a) => a.id !== featuredNews?.id).slice(0, 3);

  const trends = safetyTrendsQuery.data ?? [];
  const trendMax = Math.max(8, ...trends.flatMap((t) => [t.accidentRate, t.nearMissRate]));
  const trendNiceMax = Math.ceil(trendMax / 8) * 8;
  const trendX = (i: number) => (trends.length > 1 ? 40 + (i * 550) / (trends.length - 1) : 40);
  const trendY = (v: number) => 200 - (v / trendNiceMax) * 190;
  const trendGridValues = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * trendNiceMax));
  const trendChangePct =
    trends.length > 1 && trends[0].accidentRate !== 0
      ? Math.round(((trends[trends.length - 1].accidentRate - trends[0].accidentRate) / trends[0].accidentRate) * 100)
      : null;

  return (
    <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", background: "#F8FAFC" }}>

      {/* ── Announcement Bar ── */}
      {announcement && (
        <div className="py-2 px-4 text-center" style={{ background: "linear-gradient(90deg, #03ADB4, #0891A0, #FD2EBB)" }}>
          <p className="flex items-center justify-center gap-2 text-white text-xs">
            <span>📢</span>
            <span>{announcement.message}</span>
            {announcement.linkText && (
              <a href={announcement.linkUrl ?? "#"} className="ml-2 font-semibold text-[0.7rem] px-2.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }}>
                {announcement.linkText}
              </a>
            )}
          </p>
        </div>
      )}

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
                <span className="font-extrabold text-[1rem] tracking-tight block leading-tight" style={{ color: navy }}>{settings?.org_name ?? "Манош"}</span>
                <span className="text-[0.55rem] font-medium tracking-wider block leading-tight uppercase" style={{ color: "#6B7C93" }}>{settings?.org_full_name ?? "Монголын хөдөлмөрийн холбоо"}</span>
              </div>
            </Link>

            {/* Nav */}
            <HeaderNav menus={navMenus ?? []} />

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
                {settings?.hero_headline_prefix ?? "Монгол даяар"}{" "}
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
                    <strong style={{ color: "rgba(255,255,255,0.85)" }}>{settings?.hero_trust_count ?? "2,800+"}</strong> компанийн итгэлийг хүлээсэн
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
              {heroFloating?.[0] && (
                <div className="absolute -top-4 -right-6 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                  <div className="font-extrabold text-[1.4rem]" style={{ color: heroFloating[0].color ?? pink }}>{heroFloating[0].value}</div>
                  <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>{heroFloating[0].label}</div>
                </div>
              )}
              {heroFloating?.[1] && (
                <div className="absolute -left-6 top-1/3 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                  <div className="font-extrabold text-[1.4rem]" style={{ color: heroFloating[1].color ?? teal }}>{heroFloating[1].value}</div>
                  <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>{heroFloating[1].label}</div>
                </div>
              )}
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
              {(heroStatBar ?? []).map((s) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.iconBg ?? "rgba(3,173,180,0.125)", border: `1px solid ${s.iconBorder ?? "rgba(3,173,180,0.19)"}` }}>
                      <Icon className="w-4 h-4" style={{ color: s.iconColor ?? teal }} />
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-[1.3rem] leading-tight">{s.value}</div>
                      <div className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                    </div>
                  </div>
                );
              })}
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
          {quickAccessQuery.isLoading ? (
            <div className="flex justify-center py-10"><LoadingSpinner /></div>
          ) : quickAccessQuery.isError ? (
            <p className="text-center text-sm" style={{ color: "#ef4444" }}>Түргэн хандалтын мэдээллийг ачаалж чадсангүй.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {(quickAccessQuery.data ?? []).map((c) => {
                const Icon = resolveIcon(c.icon);
                return (
                  <a key={c.id} href={c.href} className="group flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "#fff", boxShadow: `0 4px 12px ${c.shadowColor}` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: c.color }} />
                    </div>
                    <div className="font-bold text-[0.8rem] mb-1 leading-tight" style={{ color: navy }}>{c.title}</div>
                    <p className="text-[0.7rem] leading-relaxed mb-3" style={{ color: "#6B7C93", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.description}</p>
                    <span className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: c.color }}>
                      {c.linkText} <ChevronRight className="w-3 h-3" />
                    </span>
                  </a>
                );
              })}
            </div>
          )}
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

          {newsQuery.isLoading ? (
            <div className="flex justify-center py-10"><LoadingSpinner /></div>
          ) : newsQuery.isError ? (
            <p className="text-center text-sm" style={{ color: "#ef4444" }}>Мэдээг ачаалж чадсангүй.</p>
          ) : !featuredNews ? (
            <p className="text-center text-sm" style={{ color: "#6B7C93" }}>Одоогоор мэдээ алга байна.</p>
          ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured */}
            <div className="lg:col-span-3">
              <a href="#" className="group block h-full">
                <div className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl" style={{ border: "1px solid rgba(11,22,40,0.08)" }}>
                  <div className="relative overflow-hidden" style={{ height: 260 }}>
                    <Image src={featuredNews.imageUrl} alt={featuredNews.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(11,22,40,0.6) 100%)" }} />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: featuredNews.tagColor || teal }}>{featuredNews.tag}</span>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-lg" style={{ background: "rgba(255,255,255,0.15)" }}>Онцлох түүх</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold mb-3 leading-tight group-hover:text-[#03ADB4] transition-colors" style={{ color: navy, fontSize: "1.2rem" }}>
                      {featuredNews.title}
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: "#6B7C93", fontSize: "0.9rem" }}>
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                        <Clock className="w-3 h-3" /> {formatMongolianDate(featuredNews.publishedAt)}
                      </div>
                      {featuredNews.readMinutes != null && (
                        <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                          <Search className="w-3 h-3" /> {featuredNews.readMinutes} мин унших
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Side articles */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {otherNews.map((n) => (
                <a key={n.id} href="#" className="group block">
                  <div className="flex gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md" style={{ border: "1px solid rgba(11,22,40,0.07)", background: "#fff" }}>
                    <div className="relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden">
                      <Image src={n.imageUrl} alt={n.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-1.5" style={{ background: n.tagBg, color: n.tagColor }}>{n.tag}</span>
                      <h4 className="font-bold text-[0.85rem] leading-tight mb-1.5 group-hover:text-[#03ADB4] transition-colors line-clamp-2" style={{ color: navy }}>{n.title}</h4>
                      <div className="flex items-center gap-1.5 text-[0.72rem]" style={{ color: "#6B7C93" }}>
                        <Clock className="w-2.5 h-2.5" /> {formatMongolianDate(n.publishedAt)}
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
          )}
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
              <input
                type="text"
                value={lawSearch}
                onChange={(e) => setLawSearch(e.target.value)}
                placeholder="Хууль, стандартыг хайх..."
                className="pl-10 pr-4 py-2.5 rounded-xl border text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#03ADB4]"
                style={{ borderColor: "rgba(11,22,40,0.12)", background: "#fff", color: navy }}
              />
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {LAW_CATEGORIES.map((tab) => {
              const active = lawCategory === tab.value;
              return (
                <button
                  key={tab.label}
                  onClick={() => setLawCategory(tab.value)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                  style={active ? { background: teal, color: "#fff", border: `1.5px solid ${teal}` } : { background: "#fff", color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {lawsQuery.isLoading ? (
            <div className="flex justify-center py-10"><LoadingSpinner /></div>
          ) : lawsQuery.isError ? (
            <p className="text-center text-sm" style={{ color: "#ef4444" }}>Хууль, стандартын жагсаалтыг ачаалж чадсангүй.</p>
          ) : (lawsQuery.data ?? []).length === 0 ? (
            <p className="text-center text-sm" style={{ color: "#6B7C93" }}>Тохирох баримт бичиг олдсонгүй.</p>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(lawsQuery.data ?? []).map((law) => {
              const Icon = resolveIcon(law.icon);
              return (
                <div key={law.id} className="group relative bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                  {law.isNew && (
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)" }}>ШИНЭ</div>
                  )}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: law.iconBg }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: law.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: law.statusBg, color: law.statusColor }}>{law.statusLabel}</span>
                        <span className="text-[0.72rem]" style={{ color: "#6B7C93" }}>{law.code}</span>
                      </div>
                      <h3 className="font-bold text-[0.875rem] leading-snug group-hover:text-[#03ADB4] transition-colors line-clamp-2" style={{ color: navy }}>{law.title}</h3>
                    </div>
                  </div>
                  <p className="line-clamp-2 mb-4 text-[0.8rem] leading-relaxed" style={{ color: "#6B7C93" }}>{law.description}</p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                    <div className="flex items-center gap-1.5 text-[0.72rem]" style={{ color: "#6B7C93" }}>
                      <Download className="w-3 h-3" /> {formatDownloads(law.downloadsCount)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => law.fileUrl && window.open(law.fileUrl, "_blank")}
                        disabled={!law.fileUrl}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-[#e0f7f8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ color: teal }}
                      >
                        <Download className="w-3 h-3" /> PDF
                      </button>
                      <button
                        onClick={() => law.fileUrl && window.open(law.fileUrl, "_blank")}
                        disabled={!law.fileUrl}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ color: "#6B7C93" }}
                      >
                        <ExternalLink className="w-3 h-3" /> Харах
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
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
          {safetyMetricsQuery.isLoading ? (
            <div className="flex justify-center py-10 mb-10"><LoadingSpinner /></div>
          ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {(safetyMetricsQuery.data ?? []).map((m) => {
              const Icon = resolveIcon(m.icon);
              return (
                <div key={m.id} className="rounded-2xl p-5 transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: m.iconBg }}><Icon className="w-4 h-4" style={{ color: m.iconColor }} /></div>
                  <div className="font-extrabold text-[1.6rem] leading-none mb-1" style={{ color: m.color }}>{m.value}</div>
                  <div className="text-white text-[0.8rem] font-semibold mb-1">{m.label}</div>
                  <div className="text-[0.72rem] leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>{m.sublabel}</div>
                </div>
              );
            })}
          </div>
          )}

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Area chart (SVG) */}
            <div className="lg:col-span-3 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-white text-[0.95rem]">Ажлын байрны ослын түвшний чиг хандлага</h3>
                  <p className="text-[0.78rem] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    1,000 ажилчинд ногдох осол{trends.length > 0 && ` — ${trends[0].year}–${trends[trends.length - 1].year}`}
                  </p>
                </div>
                {trendChangePct !== null && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(3,173,180,0.15)" }}>
                    {trendChangePct <= 0 ? <TrendingDown className="w-3 h-3" style={{ color: teal }} /> : <TrendingUp className="w-3 h-3" style={{ color: teal }} />}
                    <span className="text-[0.75rem] font-bold" style={{ color: teal }}>{trends[0].year} оноос {trendChangePct > 0 ? "+" : ""}{trendChangePct}%</span>
                  </div>
                )}
              </div>
              {safetyTrendsQuery.isLoading ? (
                <div className="flex justify-center py-16"><LoadingSpinner /></div>
              ) : trends.length === 0 ? (
                <p className="text-center text-sm py-16" style={{ color: "rgba(255,255,255,0.5)" }}>Статистикийн өгөгдөл алга байна.</p>
              ) : (
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
                {trendGridValues.map((v) => (
                  <text key={v} x="30" y={trendY(v)} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.5)" dominantBaseline="middle">{v}</text>
                ))}
                {/* X labels */}
                {trends.map((t, i) => (
                  <text key={t.id} x={trendX(i)} y="215" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">{t.year}</text>
                ))}
                {/* Accident rate area + line (solid) */}
                <path d={`${trends.map((t, i) => `${i === 0 ? "M" : "L"}${trendX(i)},${trendY(t.accidentRate)}`).join(" ")} L${trendX(trends.length - 1)},200 L40,200 Z`} fill="url(#tealGrad)" />
                <path d={trends.map((t, i) => `${i === 0 ? "M" : "L"}${trendX(i)},${trendY(t.accidentRate)}`).join(" ")} fill="none" stroke="#03ADB4" strokeWidth="2.5" />
                {/* Near-miss rate area + line (dashed — secondary encoding alongside color, since teal/pink sit close in CVD space) */}
                <path d={`${trends.map((t, i) => `${i === 0 ? "M" : "L"}${trendX(i)},${trendY(t.nearMissRate)}`).join(" ")} L${trendX(trends.length - 1)},200 L40,200 Z`} fill="url(#pinkGrad)" />
                <path d={trends.map((t, i) => `${i === 0 ? "M" : "L"}${trendX(i)},${trendY(t.nearMissRate)}`).join(" ")} fill="none" stroke="#FD2EBB" strokeWidth="2" strokeDasharray="6 4" />
                {/* Dots */}
                {trends.map((t, i) => (
                  <g key={t.id}>
                    <circle cx={trendX(i)} cy={trendY(t.accidentRate)} r="4" fill="#03ADB4" />
                    <circle cx={trendX(i)} cy={trendY(t.nearMissRate)} r="3" fill="#FD2EBB" />
                  </g>
                ))}
              </svg>
              )}
              <div className="flex items-center gap-5 mt-2">
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full" style={{ background: teal }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Ослын түвшин / 1K ажилчин</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full border-t-2" style={{ borderTop: `2px dashed ${pink}`, background: "transparent" }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Ослын дөхөмдөл / 1K ажилчин (тасархай)</span></div>
              </div>
            </div>

            {/* Risk index bars */}
            <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-bold text-white text-[0.95rem] mb-1">Салбараар эрсдэлийн индекс</h3>
              <p className="text-[0.78rem] mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Үлдэгдэл эрсдэлийн оноо (бага байх нь сайн)</p>
              {industryRisksQuery.isLoading ? (
                <div className="flex justify-center py-10"><LoadingSpinner /></div>
              ) : (
              <div className="space-y-3">
                {(industryRisksQuery.data ?? []).map((r) => {
                  const scoreColor = r.score >= 50 ? "#ef4444" : r.score >= 30 ? "#f59e0b" : "#16a34a";
                  const barColor = r.score >= 50 ? "linear-gradient(90deg,#ef4444,#f97316)" : r.score >= 30 ? "linear-gradient(90deg,#f59e0b,#fbbf24)" : "linear-gradient(90deg,#03ADB4,#16a34a)";
                  return (
                    <div key={r.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[0.8rem] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{r.label}</span>
                        <span className="text-[0.78rem] font-bold" style={{ color: scoreColor }}>{r.score}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${r.score}%`, background: barColor }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
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

          {eventsQuery.isLoading ? (
            <div className="flex justify-center py-10"><LoadingSpinner /></div>
          ) : eventsQuery.isError ? (
            <p className="text-center text-sm" style={{ color: "#ef4444" }}>Арга хэмжээний мэдээллийг ачаалж чадсангүй.</p>
          ) : (eventsQuery.data ?? []).length === 0 ? (
            <p className="text-center text-sm" style={{ color: "#6B7C93" }}>Одоогоор товлогдсон арга хэмжээ алга байна.</p>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(eventsQuery.data ?? []).map((ev) => (
              <div key={ev.id} className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                {ev.imageUrl ? (
                  <div className="relative overflow-hidden" style={{ height: 140 }}>
                    <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(11,22,40,0.6) 100%)" }} />
                    <div className="absolute top-3 left-3 w-12 text-center rounded-xl py-1.5" style={{ background: navy }}>
                      <div className="font-extrabold text-[1.2rem] leading-none" style={{ color: teal }}>{ev.day}</div>
                      <div className="text-[0.62rem] font-semibold tracking-wider text-white/60">{ev.monthLabel}</div>
                    </div>
                  </div>
                ) : null}
                <div className="p-5">
                  {!ev.imageUrl && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 text-center rounded-xl py-1.5 flex-shrink-0" style={{ background: ev.categoryBg }}>
                        <div className="font-extrabold text-[1.2rem] leading-none" style={{ color: ev.categoryColor }}>{ev.day}</div>
                        <div className="text-[0.62rem] font-semibold tracking-wider opacity-70" style={{ color: ev.categoryColor }}>{ev.monthLabel}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: ev.categoryBg, color: ev.categoryColor }}>{ev.category}</span>
                    </div>
                  )}
                  {ev.imageUrl && (
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold mb-3" style={{ background: ev.categoryBg, color: ev.categoryColor }}>{ev.category}</span>
                  )}
                  <h3 className="font-bold text-[0.9rem] leading-tight mb-2 group-hover:text-[#03ADB4] transition-colors" style={{ color: navy }}>{ev.title}</h3>
                  <p className="line-clamp-2 mb-4 text-[0.78rem] leading-relaxed" style={{ color: "#6B7C93" }}>{ev.description}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}><Clock className="w-3 h-3" />{ev.timeRange}</div>
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}>
                      {ev.isOnline ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {ev.location}
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}><Users className="w-3 h-3" />{ev.seatsInfo}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                    <span className="font-bold text-[0.875rem]" style={{ color: navy }}>{ev.price}</span>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:shadow-md hover:scale-105 transition-all" style={{ background: ev.buttonColor }}>
                      Бүртгүүлэх →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
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
                {(aiFeatures ?? []).map((f) => {
                  const Icon = resolveIcon(f.icon);
                  return (
                    <div key={f.id} className="p-4 rounded-2xl hover:shadow-md transition-all bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgb(224,247,248)" }}><Icon className="w-4 h-4" style={{ color: teal }} /></div>
                      <div className="font-bold text-[0.875rem] mb-1" style={{ color: navy }}>{f.title}</div>
                      <p className="text-[0.78rem] leading-snug" style={{ color: "#6B7C93" }}>{f.description}</p>
                    </div>
                  );
                })}
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
          {testimonialsQuery.isLoading ? (
            <div className="flex justify-center py-10"><LoadingSpinner /></div>
          ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {(testimonialsQuery.data ?? []).map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-white hover:shadow-xl hover:-translate-y-1 transition-all" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5" fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p className="italic mb-5 leading-relaxed text-[0.9rem]" style={{ color: "#334155" }}>&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(11,22,40,0.07)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: t.avatarBg }}>{t.initial}</div>
                  <div>
                    <div className="font-bold text-[0.85rem]" style={{ color: navy }}>{t.name}</div>
                    <div className="text-[0.75rem]" style={{ color: "#6B7C93" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[0.82rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "#6B7C93" }}>Олон улсын түнш байгууллагууд &amp; хамтрагчид</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {(partnersQuery.data ?? []).map((p) => (
              <div key={p.id} className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:shadow-md cursor-pointer transition-all" style={{ border: "1.5px solid rgba(11,22,40,0.07)" }} title={p.title}>
                <div className="text-[1.3rem] mb-1">{p.flagEmoji}</div>
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
            <h2 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{settings?.cta_title ?? "Илүү аюулгүй ажлын байр бий болгох бэлэн үү?"}</h2>
            <p className="mb-6 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.55)" }}>{settings?.cta_description ?? "MANOSH-ийн гишүүнчлэл, сургалт, хиймэл оюун ухаанд суурилсан аюулгүй байдлын удирдамжаар ашиглаж буй 2,847 монгол байгууллагад нэгдээрэй."}</p>
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
                  <div className="font-extrabold text-[1.1rem] text-white">{settings?.org_name ?? "Манош"}</div>
                  <div className="text-[0.6rem] font-medium tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{settings?.org_full_name ?? "Монголын хөдөлмөрийн холбоо"}</div>
                </div>
              </div>
              <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{settings?.org_tagline ?? "Монгол улсын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн үндэсний байгууллага — ажилчдыг хамгаалж, бүх салбарт илүү аюулгүй ажлын байр бий болгоход зориулагдсан."}</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3"><MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{settings?.contact_address ?? "Чингисийн өргөн чөлөө 15, Чингэлтэй дүүрэг, Улаанбаатар 15160, Монгол улс"}</span></div>
                <div className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{settings?.contact_phone ?? "+976 11-329-000"}</span></div>
                <div className="flex items-center gap-3"><Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{settings?.contact_email ?? "info@manosh.mn"}</span></div>
              </div>
            </div>

            {/* Link columns */}
            {(footerLinkGroupsQuery.data ?? []).map((group) => (
              <div key={group.id}>
                <h4 className="font-bold text-[0.82rem] text-white mb-4 tracking-wider">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.id}><a href={link.href} className="text-[0.82rem] hover:text-[#03ADB4] transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}>{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.3)" }}>{settings?.footer_copyright ?? "© 2024 MANOSH — Монголын Үндэсний Хөдөлмөрийн Аюулгүй Байдал, Эрүүл Ахуйн Холбоо. Бүх эрх хуулиар хамгаалагдсан."}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {(settings?.footer_badges ?? "ISO 45001:2018,ILO түнш,НБУ-ын ТХЗ-тай нийцсэн,KOSHA баталгаажсан").split(",").map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold" style={{ background: "rgba(3,173,180,0.12)", color: "rgba(3,173,180,0.8)", border: "1px solid rgba(3,173,180,0.2)" }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
