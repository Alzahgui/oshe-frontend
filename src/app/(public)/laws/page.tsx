"use client";

import { useDeferredValue, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, ExternalLink, BookOpen } from "lucide-react";
import { useLawDocuments } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { resolveIcon } from "@/lib/icons";
import type { LawDocumentCategory } from "@/types/content";

const navy = "#0B1628";
const teal = "#03ADB4";
const pink = "#FD2EBB";

const CATEGORIES: { label: string; value?: LawDocumentCategory }[] = [
  { label: "Бүгд" },
  { label: "Олон улсын конвенц", value: "international_standard" },
  { label: "Монгол улсын хууль", value: "national_law" },
  { label: "Тушаал", value: "regulation" },
  { label: "Дүрэм, журам", value: "regulation" },
  { label: "Үндэсний стандарт", value: "national_standard" },
];

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K татал`;
  return `${count} татал`;
}

export default function LawsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<LawDocumentCategory | undefined>(undefined);
  const [activeLabelIndex, setActiveLabelIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const deferredSearch = useDeferredValue(searchValue);

  const { data: laws, isLoading, isError } = useLawDocuments({
    category: activeCategory,
    q: deferredSearch || undefined,
  });

  const handleTabClick = (index: number, value?: LawDocumentCategory) => {
    setActiveLabelIndex(index);
    setActiveCategory(value);
  };

  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif" }}>
      <title>Хууль ба Стандарт — YOSH</title>

      {/* ── Hero ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${navy} 0%, #162040 100%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 60% at 10% 50%, rgba(253,46,187,0.1) 0%, transparent 60%), radial-gradient(40% 40% at 90% 30%, rgba(3,173,180,0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(253,46,187,0.15)", border: "1px solid rgba(253,46,187,0.3)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: pink }} />
            <span className="text-[0.78rem] font-bold tracking-widest" style={{ color: pink }}>
              ХУУЛИЙН НОМЫН САН
            </span>
          </div>

          <h1
            className="font-extrabold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}
          >
            ХУУЛЬ БА СТАНДАРТ
          </h1>
          <p
            className="mx-auto max-w-[600px] leading-relaxed text-[1rem]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Монгол улсын хөдөлмөрийн аюулгүй байдлын хууль, дүрэм журам болон
            олон улсын стандартуудын иж бүрэн номын санд хандах. ISO 45001, MNS стандартууд
            болон улсын хуулийн актуудыг татаж авах боломжтой.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-12 lg:py-16" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {CATEGORIES.map((cat, index) => {
                const isActive = activeLabelIndex === index;
                return (
                  <button
                    key={`${cat.label}-${index}`}
                    onClick={() => handleTabClick(index, cat.value)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
                    style={
                      isActive
                        ? { background: teal, color: "#fff", border: `1.5px solid ${teal}` }
                        : { background: "#fff", color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }
                    }
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#6B7C93" }}
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Хууль, стандартыг хайх..."
                className="pl-10 pr-4 py-2.5 rounded-xl border text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#03ADB4]"
                style={{ borderColor: "rgba(11,22,40,0.12)", background: "#fff", color: navy }}
              />
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <LoadingSpinner size={32} />
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div
              className="text-center py-12 rounded-2xl"
              style={{ background: "#fff", border: "1px solid rgba(11,22,40,0.07)" }}
            >
              <p className="font-semibold" style={{ color: "#ef4444" }}>
                Хуулийн мэдээллийг ачаалж чадсангүй.
              </p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>
                Дахин оролдоно уу.
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && (laws ?? []).length === 0 && (
            <div
              className="text-center py-16 rounded-2xl"
              style={{ background: "#fff", border: "1px solid rgba(11,22,40,0.07)" }}
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(11,22,40,0.2)" }} />
              <p className="font-semibold" style={{ color: navy }}>
                Тохирох баримт бичиг олдсонгүй
              </p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>
                Өөр ангилал эсвэл хайлтын үгийг ашиглана уу.
              </p>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && (laws ?? []).length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(laws ?? []).map((law) => {
                const Icon = resolveIcon(law.icon);
                return (
                  <div
                    key={law.id}
                    onClick={() => router.push(`/laws/${law.id}`)}
                    className="group relative bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    style={{ border: "1px solid rgba(11,22,40,0.07)" }}
                  >
                    {law.isNew && (
                      <div
                        className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)" }}
                      >
                        ШИНЭ
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: law.iconBg }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: law.iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-md text-xs font-bold"
                            style={{ background: law.statusBg, color: law.statusColor }}
                          >
                            {law.statusLabel}
                          </span>
                          <span className="text-[0.72rem]" style={{ color: "#6B7C93" }}>
                            {law.code}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-[0.875rem] leading-snug group-hover:text-[#03ADB4] transition-colors line-clamp-2"
                          style={{ color: navy }}
                        >
                          {law.title}
                        </h3>
                      </div>
                    </div>

                    <p
                      className="line-clamp-2 mb-4 text-[0.8rem] leading-relaxed"
                      style={{ color: "#6B7C93" }}
                    >
                      {law.description}
                    </p>

                    <div
                      className="flex items-center justify-between pt-3"
                      style={{ borderTop: "1px solid rgba(11,22,40,0.06)" }}
                    >
                      <div
                        className="flex items-center gap-1.5 text-[0.72rem]"
                        style={{ color: "#6B7C93" }}
                      >
                        <Download className="w-3 h-3" />
                        {formatDownloads(law.downloadsCount)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); if (law.fileUrl) window.open(law.fileUrl, "_blank"); }}
                          disabled={!law.fileUrl}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-[#e0f7f8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ color: teal }}
                        >
                          <Download className="w-3 h-3" /> PDF
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); router.push(`/laws/${law.id}`); }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
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
        </div>
      </section>
    </div>
  );
}
