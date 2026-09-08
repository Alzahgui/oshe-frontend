"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, ExternalLink, BookOpen } from "lucide-react";
import { useLawDocuments } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { resolveIcon } from "@/lib/icons";

const navy = "#0B1628";
const teal = "#03ADB4";

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K татал`;
  return `${count} татал`;
}

export default function LawDocumentDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: laws, isLoading, isError } = useLawDocuments();
  const law = laws?.find((l) => String(l.id) === params.id);
  const Icon = law ? resolveIcon(law.icon) : null;

  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif", background: "#F8FAFC" }}>
      {law && <title>{`${law.title} — YOSH`}</title>}

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/laws" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-80 transition-opacity" style={{ color: teal }}>
            <ArrowLeft className="w-4 h-4" /> Хуулийн номын сан
          </Link>

          {isLoading && (
            <div className="flex justify-center py-16"><LoadingSpinner size={32} /></div>
          )}

          {isError && !isLoading && (
            <p className="text-center text-sm py-16" style={{ color: "#ef4444" }}>Хуулийн мэдээллийг ачаалж чадсангүй.</p>
          )}

          {!isLoading && !isError && !law && (
            <div className="text-center py-16 rounded-2xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(11,22,40,0.2)" }} />
              <p className="font-semibold" style={{ color: navy }}>Баримт бичиг олдсонгүй</p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>Энэ баримт бичиг устгагдсан эсвэл холбоос буруу байна.</p>
            </div>
          )}

          {law && Icon && (
            <article>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: law.iconBg }}>
                  <Icon className="w-6 h-6" style={{ color: law.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold" style={{ background: law.statusBg, color: law.statusColor }}>{law.statusLabel}</span>
                    <span className="text-[0.8rem]" style={{ color: "#6B7C93" }}>{law.code}</span>
                    {law.isNew && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#03ADB4,#FD2EBB)" }}>ШИНЭ</span>
                    )}
                  </div>
                  <h1 className="font-extrabold leading-tight" style={{ color: navy, fontSize: "clamp(1.5rem,3.5vw,2.1rem)" }}>{law.title}</h1>
                </div>
              </div>

              <p className="leading-relaxed text-[1.05rem] mb-8" style={{ color: "#334155" }}>{law.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                <div className="flex items-center gap-1.5 text-[0.82rem]" style={{ color: "#6B7C93" }}>
                  <Download className="w-3.5 h-3.5" /> {formatDownloads(law.downloadsCount)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => law.fileUrl && window.open(law.fileUrl, "_blank")}
                    disabled={!law.fileUrl}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: teal }}
                  >
                    <Download className="w-3.5 h-3.5" /> PDF татах
                  </button>
                  <button
                    onClick={() => law.fileUrl && window.open(law.fileUrl, "_blank")}
                    disabled={!law.fileUrl}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ color: "#6B7C93", border: "1px solid rgba(11,22,40,0.1)" }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Онлайн харах
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
