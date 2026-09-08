"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Search, Newspaper } from "lucide-react";
import { useNewsArticles } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const navy = "#0B1628";
const teal = "#03ADB4";

function formatMongolianDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()} оны ${d.getMonth() + 1}-р сарын ${d.getDate()}`;
}

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: articles, isLoading, isError } = useNewsArticles();
  const article = articles?.find((a) => String(a.id) === params.id);
  const otherArticles = (articles ?? []).filter((a) => String(a.id) !== params.id).slice(0, 3);

  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif", background: "#F8FAFC" }}>
      {article && <title>{`${article.title} — YOSH`}</title>}

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-80 transition-opacity" style={{ color: teal }}>
            <ArrowLeft className="w-4 h-4" /> Нүүр хуудас
          </Link>

          {isLoading && (
            <div className="flex justify-center py-16"><LoadingSpinner size={32} /></div>
          )}

          {isError && !isLoading && (
            <p className="text-center text-sm py-16" style={{ color: "#ef4444" }}>Мэдээг ачаалж чадсангүй.</p>
          )}

          {!isLoading && !isError && !article && (
            <div className="text-center py-16 rounded-2xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
              <Newspaper className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(11,22,40,0.2)" }} />
              <p className="font-semibold" style={{ color: navy }}>Мэдээ олдсонгүй</p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>Энэ мэдээ устгагдсан эсвэл холбоос буруу байна.</p>
            </div>
          )}

          {article && (
            <article>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style={{ background: article.tagColor || teal }}>
                {article.tag}
              </span>
              <h1 className="font-extrabold leading-tight mb-4" style={{ color: navy, fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>
                {article.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-[0.85rem]" style={{ color: "#6B7C93" }}>
                  <Clock className="w-3.5 h-3.5" /> {formatMongolianDate(article.publishedAt)}
                </div>
                {article.readMinutes != null && (
                  <div className="flex items-center gap-1.5 text-[0.85rem]" style={{ color: "#6B7C93" }}>
                    <Search className="w-3.5 h-3.5" /> {article.readMinutes} мин унших
                  </div>
                )}
              </div>
              <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: 360 }}>
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
              </div>
              <p className="leading-relaxed text-[1.05rem]" style={{ color: "#334155" }}>{article.excerpt}</p>
            </article>
          )}

          {otherArticles.length > 0 && (
            <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(11,22,40,0.08)" }}>
              <h2 className="font-extrabold mb-5 text-[1.1rem]" style={{ color: navy }}>Бусад мэдээ</h2>
              <div className="space-y-3">
                {otherArticles.map((n) => (
                  <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 p-4 rounded-2xl bg-white transition-all hover:shadow-md" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                    <div className="relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden">
                      <Image src={n.imageUrl} alt={n.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-1.5" style={{ background: n.tagBg, color: n.tagColor }}>{n.tag}</span>
                      <h4 className="font-bold text-[0.85rem] leading-tight group-hover:text-[#03ADB4] transition-colors line-clamp-2" style={{ color: navy }}>{n.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
