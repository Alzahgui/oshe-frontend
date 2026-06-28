"use client";

import Image from "next/image";
import {
  Shield, Globe, Phone, ArrowRight, BookOpen, Bot,
  Building2, Users, Award, TrendingUp, TriangleAlert, HardHat,
  FileCheck, GraduationCap, Scale, FileText, Download, ExternalLink,
  TrendingDown, CircleCheck, Activity, Clock, MapPin, Monitor, Star,
  Sparkles, Search, Calendar, Send, Menu, Play, ChevronRight,
} from "lucide-react";

const teal = "#03ADB4";
const pink = "#FD2EBB";
const navy = "#0B1628";

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", background: "#F8FAFC" }}>

      {/* ── Announcement Bar ── */}
      <div className="py-2 px-4 text-center" style={{ background: "linear-gradient(90deg, #03ADB4, #0891A0, #FD2EBB)" }}>
        <p className="flex items-center justify-center gap-2 text-white text-xs">
          <span>📢</span>
          <span>ISO 45001:2018 Lead Auditor Training — Registration Open for December 2024 Cohort</span>
          <span className="ml-2 font-semibold text-[0.7rem] px-2.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }}>
            Register Now →
          </span>
        </p>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md" style={{ borderBottom: "1px solid rgba(11,22,40,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
                <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-[1rem] tracking-tight" style={{ color: navy }}>MANOSH</span>
            </a>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {["About", "News", "Laws & Standards", "Products", "AI Assistant"].map((item) => (
                <a key={item} href="#" className="px-3.5 py-2 rounded-lg text-[0.82rem] font-semibold transition-colors" style={{ color: "#52637A" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#03ADB4"; e.currentTarget.style.background = "#f0f9fa"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#52637A"; e.currentTarget.style.background = "transparent"; }}>
                  {item}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.78rem] font-medium transition-colors hover:bg-gray-50" style={{ color: "#6B7C93" }}>
                <Globe className="w-3.5 h-3.5" /> EN
              </button>
              <div className="w-px h-5 mx-0.5" style={{ background: "rgba(11,22,40,0.1)" }} />
              <a href="/login" className="px-4 py-2 rounded-lg text-[0.82rem] font-semibold transition-colors hover:bg-gray-50" style={{ color: navy }}>
                Log in
              </a>
              <a href="/signup" className="px-4 py-2 rounded-lg text-[0.82rem] font-bold text-white transition-all hover:opacity-90 hover:shadow-md" style={{ background: "linear-gradient(135deg, #03ADB4, #028E95)" }}>
                Sign up free
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
                <span className="text-[0.8rem] font-bold tracking-wider" style={{ color: teal }}>MONGOLIA&apos;S PREMIER OSH AUTHORITY</span>
              </div>

              <h1 className="font-extrabold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>
                Building{" "}
                <span style={{ background: "linear-gradient(135deg, #03ADB4 0%, #FD2EBB 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Safer Workplaces
                </span>{" "}
                Across Mongolia
              </h1>

              <p className="mb-10 max-w-[500px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", lineHeight: 1.7 }}>
                The national authority on occupational safety and health — empowering employers and workers through ISO 45001 standards, expert training, and AI-powered safety guidance.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#membership" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 8px 30px rgba(3,173,180,0.35)" }}>
                  Become a Member <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#training" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10" style={{ border: "1.5px solid rgba(3,173,180,0.5)", color: teal }}>
                  <BookOpen className="w-4 h-4" /> Training Programs
                </a>
                <a href="#ai-assistant" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105" style={{ background: "linear-gradient(135deg,#FD2EBB,#D41EA0)", boxShadow: "0 8px 30px rgba(253,46,187,0.3)" }}>
                  <Bot className="w-4 h-4" /> AI Safety Assistant
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
                    Trusted by <strong style={{ color: "rgba(255,255,255,0.85)" }}>2,800+ companies</strong>
                  </span>
                </div>
                <button className="flex items-center gap-2 transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Play className="w-3 h-3" fill="currentColor" />
                  </div>
                  <span className="text-[0.8rem] font-medium">Watch our story</span>
                </button>
              </div>
            </div>

            {/* Right – image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden" style={{ height: 440, boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
                <Image src="https://images.unsplash.com/photo-1652303518379-c0ef1c9fb2b1?w=800&q=80" alt="Safety professionals at construction site" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(11,22,40,0.5) 100%)" }} />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl" style={{ background: "rgba(11,22,40,0.7)", border: "1px solid rgba(3,173,180,0.4)" }}>
                  <span style={{ color: teal, fontSize: "1.2rem" }}>✓</span>
                  <div>
                    <div className="font-bold text-white text-[0.75rem]">ISO 45001 Certified</div>
                    <div className="text-[0.65rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Management System Standard</div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                <div className="font-extrabold text-[1.4rem]" style={{ color: pink }}>47,000+</div>
                <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>Workers Protected</div>
              </div>
              <div className="absolute -left-6 top-1/3 px-4 py-3 rounded-2xl backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                <div className="font-extrabold text-[1.4rem]" style={{ color: teal }}>98.2%</div>
                <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.6)" }}>Compliance Rate</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-48 h-32 rounded-xl overflow-hidden" style={{ border: `3px solid ${navy}`, boxShadow: "0 15px 40px rgba(0,0,0,0.4)" }}>
                <Image src="https://images.unsplash.com/photo-1581094480465-4e6c25fb4a52?w=400&q=80" alt="Safety engineer" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Building2 className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.125)", border: "rgba(3,173,180,0.19)", value: "2,847+", label: "Member Companies", color: teal },
                { icon: <Users className="w-4 h-4" style={{ color: pink }} />, bg: "rgba(253,46,187,0.125)", border: "rgba(253,46,187,0.19)", value: "47,000+", label: "Workers Protected", color: pink },
                { icon: <Award className="w-4 h-4" style={{ color: teal }} />, bg: "rgba(3,173,180,0.125)", border: "rgba(3,173,180,0.19)", value: "98.2%", label: "Compliance Rate", color: teal },
                { icon: <TrendingUp className="w-4 h-4" style={{ color: pink }} />, bg: "rgba(253,46,187,0.125)", border: "rgba(253,46,187,0.19)", value: "156", label: "Certified Trainers", color: pink },
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
            <h2 className="font-extrabold text-[1.5rem]" style={{ color: navy }}>Quick Access</h2>
            <p className="text-[0.9rem] mt-1" style={{ color: "#6B7C93" }}>Most-used resources, one click away</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <TriangleAlert className="w-4.5 h-4.5" style={{ color: "#ef4444" }} />, bg: "rgb(254,242,242)", border: "rgba(239,68,68,0.2)", shadow: "rgba(239,68,68,0.19)", title: "Emergency Contacts", desc: "24/7 workplace incident hotline and emergency response contacts", link: "Get Help Now", color: "#ef4444" },
              { icon: <HardHat className="w-4.5 h-4.5" style={{ color: "#f59e0b" }} />, bg: "rgb(254,252,232)", border: "rgba(245,158,11,0.2)", shadow: "rgba(245,158,11,0.19)", title: "PPE Requirements", desc: "Find industry-specific personal protective equipment standards", link: "View Standards", color: "#f59e0b" },
              { icon: <FileCheck className="w-4.5 h-4.5" style={{ color: teal }} />, bg: "rgb(224,247,248)", border: "rgba(3,173,180,0.2)", shadow: "rgba(3,173,180,0.19)", title: "Safety Audit Tools", desc: "Download checklists and audit frameworks for ISO 45001 compliance", link: "Download Tools", color: teal },
              { icon: <GraduationCap className="w-4.5 h-4.5" style={{ color: "#8b5cf6" }} />, bg: "rgb(245,243,255)", border: "rgba(139,92,246,0.2)", shadow: "rgba(139,92,246,0.19)", title: "Training Calendar", desc: "Browse all upcoming OSH certification and training programs", link: "View Calendar", color: "#8b5cf6" },
              { icon: <BookOpen className="w-4.5 h-4.5" style={{ color: pink }} />, bg: "rgba(253,46,187,0.06)", border: "rgba(253,46,187,0.2)", shadow: "rgba(253,46,187,0.19)", title: "Regulation Library", desc: "Full searchable database of Mongolian and international safety laws", link: "Browse Library", color: pink },
              { icon: <Building2 className="w-4.5 h-4.5" style={{ color: navy }} />, bg: "rgb(248,250,252)", border: "rgba(11,22,40,0.15)", shadow: "rgba(11,22,40,0.19)", title: "Member Portal", desc: "Access exclusive member resources, certificates, and dashboards", link: "Sign In", color: navy },
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
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>NEWS &amp; UPDATES</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>Latest from MANOSH</h2>
            </div>
            <a href="#news" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-[#028e95] transition-colors" style={{ color: teal }}>
              View all news <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured */}
            <div className="lg:col-span-3">
              <a href="#" className="group block h-full">
                <div className="h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl" style={{ border: "1px solid rgba(11,22,40,0.08)" }}>
                  <div className="relative overflow-hidden" style={{ height: 260 }}>
                    <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="ISO 45001 Mongolia" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 40%, rgba(11,22,40,0.6) 100%)" }} />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: teal }}>Standards</span>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-lg" style={{ background: "rgba(255,255,255,0.15)" }}>Featured Story</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold mb-3 leading-tight group-hover:text-[#03ADB4] transition-colors" style={{ color: navy, fontSize: "1.2rem" }}>
                      Mongolia Adopts ISO 45001:2018 as National Standard — New Certification Program Launched
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: "#6B7C93", fontSize: "0.9rem" }}>
                      MANOSH officially launches the country&apos;s first ISO 45001 Lead Auditor certification program in partnership with the International Labour Organization, targeting 500 certified auditors by 2025.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                        <Clock className="w-3 h-3" /> November 28, 2024
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.78rem]" style={{ color: "#6B7C93" }}>
                        <Search className="w-3 h-3" /> 5 min read
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Side articles */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                { img: "https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=300&q=80", tag: "Regulations", tagColor: pink, tagBg: "rgba(253,46,187,0.09)", title: "New Mining Safety Regulations Take Effect January 2025", date: "November 15, 2024" },
                { img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80", tag: "Events", tagColor: teal, tagBg: "rgba(3,173,180,0.09)", title: "Annual OSH Summit 2024 Draws Record 1,200 Attendees in Ulaanbaatar", date: "October 30, 2024" },
                { img: "https://images.unsplash.com/photo-1600823921193-c388313a14a5?w=300&q=80", tag: "Safety Campaigns", tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.09)", title: '"Zero Harm 2025" National Workplace Safety Campaign Launches Nationwide', date: "October 18, 2024" },
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
                All News &amp; Updates <ArrowRight className="w-3.5 h-3.5" />
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
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: pink }}>LAWS, REGULATIONS &amp; STANDARDS</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>Legal Framework &amp; Standards</h2>
              <p className="mt-2 text-[0.95rem]" style={{ color: "#6B7C93" }}>Access Mongolia&apos;s occupational safety legislation, regulations, and international standards.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6B7C93" }} />
              <input type="text" placeholder="Search laws and standards..." className="pl-10 pr-4 py-2.5 rounded-xl border text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#03ADB4]" style={{ borderColor: "rgba(11,22,40,0.12)", background: "#fff", color: navy }} />
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["All", "National Laws", "Regulations", "National Standards", "International"].map((tab, i) => (
              <button key={tab} className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all" style={i === 0 ? { background: teal, color: "#fff", border: `1.5px solid ${teal}` } : { background: "#fff", color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Scale className="w-4.5 h-4.5" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.082)", tag: "In Effect", tagColor: "#16a34a", tagBg: "rgb(220,252,231)", code: "MGL-OSH-2008", title: "Labour Safety and Health Law of Mongolia", desc: "Primary legislation governing occupational safety and health requirements for all employers and workers in Mongolia.", downloads: "3.4K downloads", isNew: false },
              { icon: <Globe className="w-4.5 h-4.5" style={{ color: pink }} />, iconBg: "rgba(253,46,187,0.082)", tag: "Active", tagColor: teal, tagBg: "rgb(224,247,248)", code: "ISO 45001:2018", title: "ISO 45001:2018 — Occupational Health & Safety Management Systems", desc: "International standard specifying requirements for an occupational health and safety management system.", downloads: "8.1K downloads", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#f59e0b" }} />, iconBg: "rgba(245,158,11,0.082)", tag: "New", tagColor: "#d97706", tagBg: "rgb(254,243,199)", code: "REG-MINE-2024", title: "Mining Safety & Health Regulation 2024", desc: "Updated regulations for mining operations including digital hazard monitoring, PPE requirements, and emergency procedures.", downloads: "1.8K downloads", isNew: true },
              { icon: <BookOpen className="w-4.5 h-4.5" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.082)", tag: "Active", tagColor: teal, tagBg: "rgb(224,247,248)", code: "MNS 4587:2015", title: "MNS 4587:2015 — Personal Protective Equipment Standards", desc: "Mongolian national standard defining specifications, testing, and certification requirements for all PPE categories.", downloads: "2.6K downloads", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#8b5cf6" }} />, iconBg: "rgba(139,92,246,0.082)", tag: "Active", tagColor: teal, tagBg: "rgb(224,247,248)", code: "REG-CONST-2021", title: "Construction Site Safety Code of Practice", desc: "Comprehensive code covering scaffolding, fall protection, equipment operation, and site management for construction projects.", downloads: "2.2K downloads", isNew: false },
              { icon: <FileText className="w-4.5 h-4.5" style={{ color: "#ef4444" }} />, iconBg: "rgba(239,68,68,0.082)", tag: "Active", tagColor: teal, tagBg: "rgb(224,247,248)", code: "REG-CHEM-2020", title: "Chemical Hazard Control and COSHH Regulation", desc: "Regulations for control of substances hazardous to health, including handling, storage, labeling, and disposal standards.", downloads: "1.5K downloads", isNew: false },
            ].map((law, i) => (
              <div key={i} className="group relative bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                {law.isNew && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)" }}>NEW</div>
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
                      <ExternalLink className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#laws" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg" style={{ background: "linear-gradient(135deg,#0B1628,#162040)" }}>
              View Complete Library <ChevronRight className="w-4 h-4" />
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
              <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>SAFETY STATISTICS DASHBOARD</span>
            </div>
            <h2 className="font-extrabold leading-tight text-white" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
              Mongolia&apos;s Workplace Safety{" "}
              <span style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Impact Metrics
              </span>
            </h2>
            <p className="mt-3 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.55)" }}>Real-time safety performance data tracked across Mongolia&apos;s major industries</p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <TrendingDown className="w-4 h-4" style={{ color: teal }} />, iconBg: "rgba(3,173,180,0.145)", value: "-65%", label: "Accident Reduction", sub: "Since MANOSH inception (2014)", color: teal },
              { icon: <TriangleAlert className="w-4 h-4" style={{ color: "#f59e0b" }} />, iconBg: "rgba(245,158,11,0.145)", value: "4.3", label: "Incidents per 1,000 Workers", sub: "2024 national rate (down from 12.4 in 2019)", color: "#f59e0b" },
              { icon: <CircleCheck className="w-4 h-4" style={{ color: "#16a34a" }} />, iconBg: "rgba(22,163,74,0.145)", value: "96%", label: "Inspection Compliance", sub: "Pass rate for certified facilities", color: "#16a34a" },
              { icon: <Activity className="w-4 h-4" style={{ color: pink }} />, iconBg: "rgba(253,46,187,0.145)", value: "340+", label: "Standards Published", sub: "National and sector-specific standards", color: pink },
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
                  <h3 className="font-bold text-white text-[0.95rem]">Workplace Incident Rate Trend</h3>
                  <p className="text-[0.78rem] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Incidents per 1,000 workers — 2019 to 2024</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(3,173,180,0.15)" }}>
                  <TrendingDown className="w-3 h-3" style={{ color: teal }} />
                  <span className="text-[0.75rem] font-bold" style={{ color: teal }}>-65% since 2019</span>
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
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full" style={{ background: teal }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Accident rate / 1K workers</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded-full" style={{ background: pink }} /><span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Near-miss rate / 1K workers</span></div>
              </div>
            </div>

            {/* Risk index bars */}
            <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-bold text-white text-[0.95rem] mb-1">Risk Index by Industry</h3>
              <p className="text-[0.78rem] mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Residual risk score (lower is better)</p>
              <div className="space-y-3">
                {[
                  { label: "Mining", score: 68, color: "linear-gradient(90deg,#ef4444,#f97316)" },
                  { label: "Construction", score: 52, color: "linear-gradient(90deg,#ef4444,#f97316)" },
                  { label: "Manufacturing", score: 34, color: "linear-gradient(90deg,#f59e0b,#fbbf24)" },
                  { label: "Transport", score: 28, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
                  { label: "Agriculture", score: 21, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
                  { label: "Services", score: 8, color: "linear-gradient(90deg,#03ADB4,#16a34a)" },
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
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>UPCOMING EVENTS</span>
              </div>
              <h2 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>Training, Conferences &amp; Events</h2>
            </div>
            <a href="#events" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-[#028e95] transition-colors" style={{ color: teal }}>
              View calendar <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", day: "15", month: "DEC", tag: "Training", tagColor: teal, tagBg: "rgba(3,173,180,0.09)", title: "ISO 45001 Lead Auditor Training", desc: "5-day intensive training leading to internationally recognized ISO 45001 Lead Auditor certification.", time: "Dec 15–19, 2024 · 9:00 AM – 5:00 PM", location: "Ulaanbaatar, Mongolia", seats: "12 seats left", price: "₮850,000", btnColor: "linear-gradient(135deg,#03ADB4,rgba(3,173,180,0.8))" },
              { img: null, day: "22", month: "DEC", tag: "Certification", tagColor: "#ef4444", tagBg: "rgba(239,68,68,0.09)", title: "Fire Safety Certification Program", desc: "Fire prevention, evacuation planning, and extinguisher use. Includes MANOSH digital certificate.", time: "Dec 22, 2024 · 10:00 AM – 4:00 PM", location: "Online (Zoom)", seats: "Open registration", price: "₮120,000", btnColor: "linear-gradient(135deg,#ef4444,rgba(239,68,68,0.8))" },
              { img: null, day: "15", month: "JAN", tag: "Assembly", tagColor: "#8b5cf6", tagBg: "rgba(139,92,246,0.09)", title: "2025 Annual General Assembly", desc: "Annual general meeting to review 2024 performance, elect board members, and set 2025 strategic priorities.", time: "Jan 15, 2025 · 2:00 PM – 6:00 PM", location: "Ulaanbaatar Congress Center", seats: "Members only", price: "Free (Members)", btnColor: "linear-gradient(135deg,#8b5cf6,rgba(139,92,246,0.8))" },
              { img: null, day: "22", month: "JAN", tag: "Workshop", tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.09)", title: "Workplace Risk Assessment Workshop", desc: "Hands-on workshop covering hazard identification, risk matrix analysis, and control hierarchy using ISO 45001.", time: "Jan 22, 2025 · 9:00 AM – 1:00 PM", location: "Online (Teams)", seats: "Open registration", price: "₮95,000", btnColor: "linear-gradient(135deg,#f59e0b,rgba(245,158,11,0.8))" },
              { img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", day: "5", month: "FEB", tag: "Conference", tagColor: pink, tagBg: "rgba(253,46,187,0.09)", title: "Mine Safety Forum 2025", desc: "Mongolia's premier mining safety conference bringing together regulators, operators, and international experts.", time: "Feb 5–6, 2025 · 8:30 AM – 6:00 PM", location: "Ulaanbaatar, Mongolia", seats: "Registration open", price: "₮450,000", btnColor: "linear-gradient(135deg,#FD2EBB,rgba(253,46,187,0.8))" },
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
                      {ev.location.startsWith("Online") ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {ev.location}
                    </div>
                    <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}><Users className="w-3 h-3" />{ev.seats}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                    <span className="font-bold text-[0.875rem]" style={{ color: navy }}>{ev.price}</span>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:shadow-md hover:scale-105 transition-all" style={{ background: ev.btnColor }}>
                      Register →
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
                <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: pink }}>AI-POWERED SAFETY ASSISTANT</span>
              </div>
              <h2 className="font-extrabold leading-tight mb-4" style={{ color: navy, fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
                Your 24/7 Expert on{" "}
                <span style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Mongolian Safety Law
                </span>
              </h2>
              <p className="mb-8 leading-relaxed text-[0.95rem]" style={{ color: "#6B7C93" }}>
                Our AI assistant is trained on the full corpus of Mongolia&apos;s occupational safety legislation, international standards, and MANOSH guidelines — giving instant, reliable answers to your workplace safety questions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Search className="w-4 h-4" style={{ color: teal }} />, title: "Regulation Search", desc: "Instantly search Mongolia's full legal database and find relevant OSH regulations by keyword, industry, or hazard type." },
                  { icon: <FileText className="w-4 h-4" style={{ color: teal }} />, title: "Standard Interpretation", desc: "Get plain-language explanations of ISO 45001 clauses and Mongolian national standards in seconds." },
                  { icon: <Activity className="w-4 h-4" style={{ color: teal }} />, title: "Risk Assessment Guidance", desc: "Step-by-step workplace hazard identification and risk scoring using ISO 45001 methodology." },
                  { icon: <CircleCheck className="w-4 h-4" style={{ color: teal }} />, title: "24/7 Safety FAQ", desc: "Answers to 5,000+ frequently asked occupational safety questions, updated with every regulation change." },
                ].map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl hover:shadow-md transition-all bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgb(224,247,248)" }}>{f.icon}</div>
                    <div className="font-bold text-[0.875rem] mb-1" style={{ color: navy }}>{f.title}</div>
                    <p className="text-[0.78rem] leading-snug" style={{ color: "#6B7C93" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              <a href="#ai" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg,#FD2EBB,#D41EA0)", boxShadow: "0 8px 30px rgba(253,46,187,0.3)" }}>
                <Bot className="w-4 h-4" /> Open AI Safety Assistant <ChevronRight className="w-4 h-4" />
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
                    <div className="text-white font-bold text-[0.9rem]">MANOSH Safety AI</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Online · Trained on 340+ OSH standards</span>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 ml-auto" style={{ color: pink }} />
                </div>

                {/* Messages */}
                <div className="p-4 space-y-4 overflow-y-auto" style={{ background: "#F8FAFC", minHeight: 320, maxHeight: 360 }}>
                  {/* User */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm text-white text-[0.85rem] leading-relaxed" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 4px 15px rgba(3,173,180,0.35)" }}>
                      What are the mandatory PPE requirements for mining operations in Mongolia?
                    </div>
                  </div>
                  {/* AI */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)" }}>
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-white text-[0.85rem] leading-relaxed" style={{ color: navy, boxShadow: "0 2px 12px rgba(11,22,40,0.08)" }}>
                      <p>Under Mongolia&apos;s <strong>Mining Safety Regulation 2024</strong> (Section 4.3), all underground and surface mining workers must wear:</p>
                      <p className="mt-2">• <strong>Hard hat</strong> — METS Class E, EN 397 compliant</p>
                      <p>• <strong>High-visibility vest</strong> — EN ISO 20471 Class 2+</p>
                      <p>• <strong>Safety footwear</strong> — steel-toed, EN ISO 20345 S3</p>
                      <p>• <strong>Safety glasses</strong> — EN 166 impact rated</p>
                      <p>• <strong>Respiratory protection</strong> — in dust zones &gt;5 mg/m³</p>
                      <p className="mt-2">See also <strong>MNS 4587:2015</strong> for full specifications.</p>
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid rgba(11,22,40,0.07)" }}>
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: "rgb(224,247,248)", color: teal }}>📄 Mining Safety Regulation 2024</span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: "rgb(224,247,248)", color: teal }}>📄 MNS 4587:2015</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="p-3 bg-white" style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "#F0F4F8", border: "1px solid rgba(11,22,40,0.08)" }}>
                    <input type="text" placeholder="Ask about regulations, standards, risk assessments..." className="flex-1 bg-transparent focus:outline-none text-sm" style={{ color: navy }} />
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition-all" style={{ background: "rgb(224,244,245)" }}>
                      <Send className="w-3.5 h-3.5" style={{ color: "#6B7C93" }} />
                    </button>
                  </div>
                  <p className="text-[0.68rem] text-center mt-2" style={{ color: "#6B7C93" }}>AI responses are for guidance only. Consult a certified safety officer for legal compliance.</p>
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
              <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>MEMBER TESTIMONIALS</span>
            </div>
            <h2 className="font-extrabold" style={{ color: navy, fontSize: "clamp(1.5rem,3vw,2rem)" }}>Trusted by Mongolia&apos;s Industry Leaders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "MANOSH's ISO 45001 training completely transformed how we manage safety at our mine sites. Zero LTIs for 18 months.", name: "Bayaraa Gantulga", role: "HSE Manager, Erdenes Tavan Tolgoi", initial: "B", bg: "linear-gradient(135deg,#03ADB4,#028E95)" },
              { quote: "The AI safety assistant answered our regulation questions instantly. It's like having a safety lawyer available 24/7.", name: "Enkhjargal Bold", role: "Safety Officer, Mongolian Railway", initial: "E", bg: "linear-gradient(135deg,#FD2EBB,#D41EA0)" },
              { quote: "Our construction company achieved compliance with new 2024 regulations in just 3 weeks thanks to MANOSH guidelines.", name: "Tserenpuntsag Lkhagva", role: "Director, Moncon Group", initial: "T", bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
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
          <p className="text-center text-[0.82rem] font-semibold tracking-widest uppercase mb-8" style={{ color: "#6B7C93" }}>Trusted International Partners &amp; Affiliations</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { flag: "🌐", name: "ILO", title: "International Labour Organization" },
              { flag: "📋", name: "ISO", title: "International Organization for Standardization" },
              { flag: "🏥", name: "WHO", title: "World Health Organization" },
              { flag: "🇰🇷", name: "KOSHA", title: "Korea Occupational Safety & Health Agency" },
              { flag: "🇯🇵", name: "JISHA", title: "Japan Industrial Safety & Health Association" },
              { flag: "🇭🇰", name: "OSHC", title: "Occupational Safety & Health Council HK" },
              { flag: "🇲🇳", name: "MoLE", title: "Mongolia Ministry of Labour & Social Protection" },
              { flag: "🏦", name: "ADB", title: "Asian Development Bank" },
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
            <h2 className="font-extrabold text-white mb-3 leading-tight" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>Ready to Build a Safer Workplace?</h2>
            <p className="mb-6 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.55)" }}>Join 2,847 Mongolian organizations already benefiting from MANOSH membership, training, and AI-powered safety guidance.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#membership" className="px-6 py-3 rounded-xl font-bold text-white hover:shadow-xl hover:scale-105 transition-all" style={{ background: "linear-gradient(135deg,#03ADB4,#028E95)", boxShadow: "0 8px 25px rgba(3,173,180,0.4)" }}>Join MANOSH Today</a>
              <a href="#ai" className="px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all" style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}>Try AI Assistant Free</a>
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
                  <div className="font-extrabold text-[1.1rem] text-white">MANOSH</div>
                  <div className="text-[0.6rem] font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>MONGOLIA OSH ASSOCIATION</div>
                </div>
              </div>
              <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Mongolia&apos;s national authority for occupational safety and health, dedicated to protecting workers and building safer workplaces across all industries.</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3"><MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Chinggis Avenue 15, Chingeltei District,<br />Ulaanbaatar 15160, Mongolia</span></div>
                <div className="flex items-center gap-3"><Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>+976 11-329-000</span></div>
                <div className="flex items-center gap-3"><Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} /><span className="text-[0.8rem]" style={{ color: "rgba(255,255,255,0.5)" }}>info@manosh.mn</span></div>
              </div>
            </div>

            {/* Link columns */}
            {[
              { title: "ABOUT MANOSH", links: ["Mission & Vision", "Organizational Structure", "Board Members", "Membership Information", "Annual Reports", "Partner Organizations"] },
              { title: "LAWS & STANDARDS", links: ["Occupational Safety Laws", "Government Regulations", "National Standards (MNS)", "International Standards", "Downloadable Documents"] },
              { title: "TRAINING & PRODUCTS", links: ["Safety Training Materials", "Guidelines & Manuals", "Publications", "Safety Signage", "E-Learning Platform", "Certification Programs"] },
              { title: "SUPPORT", links: ["AI Safety Assistant", "FAQ Database", "Contact MANOSH", "Report a Workplace Incident", "Feedback & Complaints", "Media Enquiries"] },
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
            <p className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 MANOSH — Mongolia National Occupational Safety & Health Association. All rights reserved.</p>
            <div className="flex items-center gap-2 flex-wrap">
              {["ISO 45001:2018", "ILO Partner", "UN SDG Aligned", "KOSHA Accredited"].map((badge) => (
                <span key={badge} className="px-2.5 py-1 rounded-md text-[0.68rem] font-semibold" style={{ background: "rgba(3,173,180,0.12)", color: "rgba(3,173,180,0.8)", border: "1px solid rgba(3,173,180,0.2)" }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
