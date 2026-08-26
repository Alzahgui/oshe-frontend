"use client";

import { useState } from "react";
import { Clock, MapPin, Users, Monitor, Calendar } from "lucide-react";
import { useEvents } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Event } from "@/types/content";

const navy = "#0B1628";
const teal = "#03ADB4";

type FilterTab = "all" | "online" | "offline";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "Бүгд", value: "all" },
  { label: "Онлайн", value: "online" },
  { label: "Танхимийн", value: "offline" },
];

const PLACEHOLDER_EVENTS: Event[] = [
  {
    id: 1001,
    title: "ISO 45001 Хөдөлмөрийн Аюулгүй Байдлын Менежментийн Систем",
    description: "ISO 45001 стандарт нэвтрүүлэх, баримтжуулах, дотоод аудит явуулах чиглэлээр зохиогдох иж бүрэн сургалт.",
    imageUrl: null,
    category: "Онлайн сургалт",
    categoryColor: teal,
    categoryBg: "rgba(3,173,180,0.1)",
    day: "15",
    monthLabel: "9-р сар",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    timeRange: "09:00 – 17:00",
    location: "Онлайн (Zoom)",
    isOnline: true,
    seatsInfo: "8 суудал үлдсэн",
    price: "150,000 ₮",
    buttonColor: teal,
    order: 1,
  },
  {
    id: 1002,
    title: "Хөдөлмөрийн эрүүл ахуйн шинэчлэгдсэн хууль тогтоомжийн тайлбар",
    description: "2024 оны шинэчлэлт бүхий хөдөлмөрийн аюулгүй байдлын хуулийн дэлгэрэнгүй тайлбар болон практик хэрэглээ.",
    imageUrl: null,
    category: "Танхимийн сургалт",
    categoryColor: "#7C3AED",
    categoryBg: "rgba(124,58,237,0.1)",
    day: "22",
    monthLabel: "9-р сар",
    startDate: "2026-09-22",
    endDate: null,
    timeRange: "09:00 – 13:00",
    location: "MANOSH сургалтын төв, УБ",
    isOnline: false,
    seatsInfo: "20 суудал үлдсэн",
    price: "75,000 ₮",
    buttonColor: "#7C3AED",
    order: 2,
  },
  {
    id: 1003,
    title: "Эрсдэлийн үнэлгээ: Практик аргачлал ба баримтжуулалт",
    description: "Ажлын байрны эрсдэлийг тодорхойлох, дүгнэх, хянах практик аргачлалыг эзэмших сургалт.",
    imageUrl: null,
    category: "Онлайн сургалт",
    categoryColor: teal,
    categoryBg: "rgba(3,173,180,0.1)",
    day: "05",
    monthLabel: "10-р сар",
    startDate: "2026-10-05",
    endDate: "2026-10-06",
    timeRange: "10:00 – 16:00",
    location: "Онлайн (Microsoft Teams)",
    isOnline: true,
    seatsInfo: "15 суудал үлдсэн",
    price: "120,000 ₮",
    buttonColor: teal,
    order: 3,
  },
];

function EventCard({ ev }: { ev: Event }) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ border: "1px solid rgba(11,22,40,0.07)" }}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          {/* Date badge */}
          <div
            className="w-14 text-center rounded-xl py-2 flex-shrink-0"
            style={{ background: ev.categoryBg }}
          >
            <div className="font-extrabold text-[1.4rem] leading-none" style={{ color: ev.categoryColor }}>
              {ev.day}
            </div>
            <div className="text-[0.6rem] font-semibold tracking-wider mt-0.5 opacity-75" style={{ color: ev.categoryColor }}>
              {ev.monthLabel}
            </div>
          </div>
          {/* Category badge */}
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{ background: ev.categoryBg, color: ev.categoryColor }}
          >
            {ev.category}
          </span>
        </div>

        <h3
          className="font-bold text-[0.95rem] leading-tight mb-2 group-hover:text-[#03ADB4] transition-colors"
          style={{ color: navy }}
        >
          {ev.title}
        </h3>
        <p className="text-[0.8rem] leading-relaxed mb-4 line-clamp-2" style={{ color: "#6B7C93" }}>
          {ev.description}
        </p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}>
            <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: teal }} />
            {ev.timeRange}
          </div>
          <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}>
            {ev.isOnline ? (
              <Monitor className="w-3.5 h-3.5 flex-shrink-0" style={{ color: teal }} />
            ) : (
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: teal }} />
            )}
            {ev.location}
          </div>
          <div className="flex items-center gap-2 text-[0.75rem]" style={{ color: "#6B7C93" }}>
            <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: teal }} />
            {ev.seatsInfo}
          </div>
        </div>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}
        >
          <span className="font-bold text-[0.9rem]" style={{ color: navy }}>
            {ev.price}
          </span>
          <button
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white hover:shadow-md hover:scale-105 transition-all"
            style={{ background: ev.buttonColor }}
          >
            Бүртгүүлэх →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { data: events, isLoading, isError } = useEvents();

  const rawEvents = events && events.length > 0 ? events : null;

  const filteredEvents = rawEvents
    ? rawEvents.filter((ev) => {
        if (activeTab === "online") return ev.isOnline;
        if (activeTab === "offline") return !ev.isOnline;
        return true;
      })
    : null;

  const displayEvents = filteredEvents ?? PLACEHOLDER_EVENTS.filter((ev) => {
    if (activeTab === "online") return ev.isOnline;
    if (activeTab === "offline") return !ev.isOnline;
    return true;
  });

  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif" }}>
      <title>Сургалт — MANOSH</title>

      {/* ── Hero ── */}
      <section
        className="py-16 lg:py-20"
        style={{
          background: `linear-gradient(135deg, ${navy} 0%, #162040 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}
          >
            <Calendar className="w-4 h-4" style={{ color: teal }} />
            <span className="text-[0.78rem] font-bold tracking-widest" style={{ color: teal }}>
              СУРГАЛТ &amp; АРГА ХЭМЖЭЭ
            </span>
          </div>

          <h1
            className="font-extrabold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}
          >
            СУРГАЛТ
          </h1>
          <p
            className="mx-auto max-w-[580px] leading-relaxed text-[1rem]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Онлайн болон танхимийн хэлбэрт сургалтуудад хамрагдаж, хөдөлмөрийн
            аюулгүй байдлын мэдлэг, ур чадвараа дээшлүүлээрэй. ISO 45001 стандарт,
            эрсдэлийн үнэлгээ, хууль тогтоомжийн чиглэлүүдээр сургалт явагддаг.
          </p>
        </div>
      </section>

      {/* ── Filter tabs + events ── */}
      <section className="py-12 lg:py-16" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                  style={
                    active
                      ? { background: teal, color: "#fff", border: `1.5px solid ${teal}` }
                      : { background: "#fff", color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <LoadingSpinner size={32} />
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="text-center py-16">
              <p className="text-[0.9rem] mb-2 font-semibold" style={{ color: "#ef4444" }}>
                Сургалтын мэдээллийг ачаалж чадсангүй.
              </p>
              <p className="text-[0.82rem]" style={{ color: "#6B7C93" }}>
                Жишээ сургалтуудыг харуулж байна.
              </p>
            </div>
          )}

          {/* Events grid */}
          {!isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayEvents.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && displayEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(11,22,40,0.2)" }} />
              <p className="font-semibold" style={{ color: navy }}>
                Энэ ангилалд сургалт олдсонгүй
              </p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>
                Бусад ангиллыг сонгоно уу.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
