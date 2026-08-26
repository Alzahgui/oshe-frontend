"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Monitor, Users, Calendar } from "lucide-react";
import { useEvents } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const navy = "#0B1628";
const teal = "#03ADB4";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: events, isLoading, isError } = useEvents();
  const event = events?.find((e) => String(e.id) === params.id);

  return (
    <div style={{ fontFamily: "var(--font-sans-app), sans-serif", background: "#F8FAFC" }}>
      {event && <title>{`${event.title} — MANOSH`}</title>}

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-80 transition-opacity" style={{ color: teal }}>
            <ArrowLeft className="w-4 h-4" /> Нүүр хуудас
          </Link>

          {isLoading && (
            <div className="flex justify-center py-16"><LoadingSpinner size={32} /></div>
          )}

          {isError && !isLoading && (
            <p className="text-center text-sm py-16" style={{ color: "#ef4444" }}>Арга хэмжээний мэдээллийг ачаалж чадсангүй.</p>
          )}

          {!isLoading && !isError && !event && (
            <div className="text-center py-16 rounded-2xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(11,22,40,0.2)" }} />
              <p className="font-semibold" style={{ color: navy }}>Арга хэмжээ олдсонгүй</p>
              <p className="text-[0.85rem] mt-1" style={{ color: "#6B7C93" }}>Энэ арга хэмжээ устгагдсан эсвэл холбоос буруу байна.</p>
            </div>
          )}

          {event && (
            <article>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: event.categoryBg, color: event.categoryColor }}>
                {event.category}
              </span>
              <h1 className="font-extrabold leading-tight mb-6" style={{ color: navy, fontSize: "clamp(1.75rem,4vw,2.5rem)" }}>
                {event.title}
              </h1>

              {event.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: 320 }}>
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
              )}

              <p className="leading-relaxed text-[1.05rem] mb-8" style={{ color: "#334155" }}>{event.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                  <span className="text-[0.85rem]" style={{ color: navy }}>{event.timeRange}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                  {event.isOnline ? <Monitor className="w-4 h-4 flex-shrink-0" style={{ color: teal }} /> : <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />}
                  <span className="text-[0.85rem]" style={{ color: navy }}>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: teal }} />
                  <span className="text-[0.85rem]" style={{ color: navy }}>{event.seatsInfo}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ border: "1px solid rgba(11,22,40,0.07)" }}>
                  <span className="font-bold text-[0.9rem]" style={{ color: navy }}>{event.price}</span>
                </div>
              </div>

              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:shadow-lg hover:scale-105" style={{ background: event.buttonColor }}>
                Бүртгүүлэх →
              </button>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
