"use client";

import Link from "next/link";
import { Shield, Users, Award, Globe, CheckCircle2, Building2, ChevronRight } from "lucide-react";

const navy = "#0B1628";
const teal = "#03ADB4";
const pink = "#FD2EBB";

const STATS = [
  { value: "2847+", label: "Гишүүн байгууллага" },
  { value: "47,000+", label: "Ажилчин хамрагдсан" },
  { value: "98.2%", label: "Нийцлийн хувь" },
  { value: "156+", label: "Сертификатт сургагч" },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif" }}>
      <title>БИД ҮҮ? — MANOSH</title>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: navy }}
      >
        {/* Decorative glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 15% 50%, rgba(3,173,180,0.15) 0%, transparent 60%), radial-gradient(40% 40% at 85% 20%, rgba(253,46,187,0.1) 0%, transparent 50%)",
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
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: teal }} />
            <span className="text-[0.78rem] font-bold tracking-widest" style={{ color: teal }}>
              БИДНИЙ ТУХАЙ
            </span>
          </div>

          <h1
            className="font-extrabold text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
          >
            Монголын Хөдөлмөрийн Аюулгүй Байдал,{" "}
            <span style={{ color: teal }}>Эрүүл Ахуйн</span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#03ADB4,#FD2EBB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Холбоо
            </span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-[680px] leading-relaxed text-[1.05rem]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            MANOSH нь 2014 онд үүсгэн байгуулагдсан Монгол улсын хөдөлмөрийн аюулгүй байдал,
            эрүүл ахуйн чиглэлээр үйл ажиллагаа явуулдаг үндэсний мэргэжлийн байгууллага.
            ISO 45001 стандарт, мэргэжлийн сургалт, хиймэл оюун ухааны удирдамжаар дамжуулан
            ажил олгогч болон ажилчдыг чадавхжуулж байна.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#03ADB4,#028E95)",
                boxShadow: "0 8px 30px rgba(3,173,180,0.35)",
              }}
            >
              Гишүүн болох <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(3,173,180,0.5)", color: teal }}
            >
              Холбоо барих
            </Link>
          </div>
        </div>
      </section>

      {/* ── Three columns "БИД ҮҮ?" ── */}
      <section className="py-16 lg:py-24" style={{ background: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
              style={{ background: "rgba(3,173,180,0.1)", border: "1px solid rgba(3,173,180,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: teal }} />
              <span className="text-[0.75rem] font-bold tracking-wider" style={{ color: teal }}>
                БИД ҮҮ?
              </span>
            </div>
            <h2
              className="font-extrabold"
              style={{ color: navy, fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
            >
              Бидний тухай товч танилцуулга
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* БИД БОЛ */}
            <div
              className="rounded-2xl p-6 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ border: "1px solid rgba(11,22,40,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(3,173,180,0.1)" }}
              >
                <Building2 className="w-6 h-6" style={{ color: teal }} />
              </div>
              <h3 className="font-extrabold text-[1.1rem] mb-3" style={{ color: navy }}>
                БИД БОЛ
              </h3>
              <p className="text-[0.88rem] leading-relaxed mb-4" style={{ color: "#6B7C93" }}>
                Монгол улсын хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн чиглэлд үйл ажиллагаа
                явуулдаг үндэсний мэргэжлийн холбоо. Аж ахуйн нэгжүүдэд зориулсан
                сургалт, зөвлөгөө, стандарт нэвтрүүлэх үйлчилгээ үзүүлдэг.
              </p>
              <ul className="space-y-2">
                {[
                  "2014 онд үүсгэн байгуулагдсан",
                  "2847+ гишүүн байгууллага",
                  "Улаанбаатар хотод байрладаг",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.82rem]" style={{ color: "#52637A" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* БИДНИЙ ЗАРЧИМ */}
            <div
              className="rounded-2xl p-6 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ border: "1px solid rgba(11,22,40,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(253,46,187,0.1)" }}
              >
                <Shield className="w-6 h-6" style={{ color: pink }} />
              </div>
              <h3 className="font-extrabold text-[1.1rem] mb-3" style={{ color: navy }}>
                БИДНИЙ ЗАРЧИМ
              </h3>
              <p className="text-[0.88rem] leading-relaxed mb-4" style={{ color: "#6B7C93" }}>
                Манай үйл ажиллагаа нь ёс зүй, бүрэн бүтэн байдал, ил тод байдал,
                мэргэжлийн өндөр стандартад суурилдаг.
              </p>
              <ul className="space-y-2">
                {[
                  "Аюулгүй байдлыг тэргүүнд тавих",
                  "Бүрэн бүтэн байдал ба шударга байдал",
                  "Ил тод байдал ба хариуцлага",
                  "Мэргэжлийн өндөр стандарт",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.82rem]" style={{ color: "#52637A" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: pink }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* МАНАЙ БАГ */}
            <div
              className="rounded-2xl p-6 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ border: "1px solid rgba(11,22,40,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(11,22,40,0.06)" }}
              >
                <Users className="w-6 h-6" style={{ color: navy }} />
              </div>
              <h3 className="font-extrabold text-[1.1rem] mb-3" style={{ color: navy }}>
                МАНАЙ БАГ
              </h3>
              <p className="text-[0.88rem] leading-relaxed mb-4" style={{ color: "#6B7C93" }}>
                MANOSH-ийн удирдах зөвлөл нь хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн
                чиглэлд олон жилийн туршлагатай мэргэжилтнүүдээс бүрддэг.
              </p>
              <ul className="space-y-2">
                {[
                  "156 сертификатт сургагч",
                  "Олон улсын туршлагатай удирдах зөвлөл",
                  "47,000+ ажилчинд сургалт хийсэн",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.82rem]" style={{ color: "#52637A" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: navy }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="font-extrabold"
              style={{ color: navy, fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
            >
              Алсын Хараа &amp; Эрхэм Зорилго
            </h2>
            <p className="mt-2 text-[0.95rem]" style={{ color: "#6B7C93" }}>
              Манай үйл ажиллагааны тулгуур үзэл баримтлал
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(3,173,180,0.08) 0%, rgba(3,173,180,0.02) 100%)",
                border: "1.5px solid rgba(3,173,180,0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(3,173,180,0.12)" }}
              >
                <Globe className="w-6 h-6" style={{ color: teal }} />
              </div>
              <h3 className="font-extrabold text-[1.2rem] mb-4" style={{ color: navy }}>
                Алсын Хараа
              </h3>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "#52637A" }}>
                Монгол улсын бүх салбар, бүс нутагт ажиллаж буй иргэн бүр аюулгүй,
                эрүүл орчинд ажиллах боломжтой нийгэм бий болгоно. Хөдөлмөрийн
                аюулгүй байдал нь хариуцлага биш, харин соёл болно.
              </p>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid rgba(3,173,180,0.15)" }}
              >
                <div className="flex items-center gap-2 text-[0.82rem] font-semibold" style={{ color: teal }}>
                  <Award className="w-4 h-4" />
                  ISO 45001 стандартыг дэлгэрүүлэх
                </div>
              </div>
            </div>

            {/* Mission */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(253,46,187,0.06) 0%, rgba(253,46,187,0.01) 100%)",
                border: "1.5px solid rgba(253,46,187,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(253,46,187,0.1)" }}
              >
                <Shield className="w-6 h-6" style={{ color: pink }} />
              </div>
              <h3 className="font-extrabold text-[1.2rem] mb-4" style={{ color: navy }}>
                Эрхэм Зорилго
              </h3>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "#52637A" }}>
                ISO 45001 болон олон улсын стандартыг нэвтрүүлэх, мэргэжлийн сургалт,
                хиймэл оюун ухааны удирдамжаар дамжуулан Монголын ажилчдыг хамгаалах.
                Аюулгүй байдлын соёлыг дэлгэрүүлж, осол гэмтлийг бууруулна.
              </p>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid rgba(253,46,187,0.12)" }}
              >
                <div className="flex items-center gap-2 text-[0.82rem] font-semibold" style={{ color: pink }}>
                  <Users className="w-4 h-4" />
                  Мэргэжилтний сургалт &amp; AI удирдамж
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: navy }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-extrabold text-[2.4rem] leading-none mb-2"
                  style={{
                    background: "linear-gradient(135deg,#03ADB4,#FD2EBB)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-[0.85rem] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
