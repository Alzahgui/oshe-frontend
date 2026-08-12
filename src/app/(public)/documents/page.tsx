"use client";

import { useState } from "react";
import {
  Shield, BookOpen, CheckCircle2, Calendar, Wallet, HardHat,
  Download, ExternalLink, ChevronRight, FileText,
} from "lucide-react";

const navy = "#0B1628";
const teal = "#03ADB4";
const pink = "#FD2EBB";

interface DocItem {
  id: number;
  title: string;
  description: string;
  hasQuestionnaire: boolean;
  fileSize: string;
}

interface DocCategory {
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  title: string;
  description: string;
  docs: DocItem[];
}

const DOC_CATEGORIES: DocCategory[] = [
  {
    id: "risk",
    icon: Shield,
    iconColor: teal,
    iconBg: "rgba(3,173,180,0.1)",
    accentColor: teal,
    title: "Эрсдэлийн үнэлгээ",
    description: "Ажлын байрны эрсдэлийг тодорхойлох, дүгнэх загвар баримт бичгүүд",
    docs: [
      {
        id: 1,
        title: "Ерөнхий эрсдэлийн үнэлгээний маягт (ISO 45001)",
        description: "ISO 45001 стандартад нийцсэн ажлын байрны эрсдэлийн үнэлгээний бүрэн загвар.",
        hasQuestionnaire: true,
        fileSize: "245 KB",
      },
      {
        id: 2,
        title: "Барилгын ажлын эрсдэлийн матриц",
        description: "Барилга, угсралтын ажилд зориулсан эрсдэлийн матриц болон хяналтын арга хэмжээний жагсаалт.",
        hasQuestionnaire: false,
        fileSize: "180 KB",
      },
      {
        id: 3,
        title: "Химийн бодистой ажиллах эрсдэлийн үнэлгээ",
        description: "Аюултай химийн бодис хэрэглэх ажлын байрны COSHH үнэлгээний загвар.",
        hasQuestionnaire: true,
        fileSize: "320 KB",
      },
      {
        id: 4,
        title: "Оффисын ажлын байрны эрсдэлийн үнэлгээ",
        description: "Оффис, административ ажлын орчинд тохиромжтой хялбаршуулсан эрсдэлийн үнэлгээ.",
        hasQuestionnaire: false,
        fileSize: "155 KB",
      },
    ],
  },
  {
    id: "regulation",
    icon: BookOpen,
    iconColor: pink,
    iconBg: "rgba(253,46,187,0.1)",
    accentColor: pink,
    title: "Журам, зааварчилга",
    description: "Ажлын байрны аюулгүй байдлын журам, гарын авлага, зааварчилгууд",
    docs: [
      {
        id: 5,
        title: "Аюулгүй ажиллагааны ерөнхий журам",
        description: "Байгууллагын аюулгүй байдлын бодлого, ажилтны үүрэг хариуцлагыг тодорхойлсон журам.",
        hasQuestionnaire: false,
        fileSize: "290 KB",
      },
      {
        id: 6,
        title: "Гал түймрийн аюулгүй байдлын журам",
        description: "Гал түймрээс урьдчилан сэргийлэх, нүүлгэн шилжүүлэх болон гамшгийн хариу арга хэмжээний журам.",
        hasQuestionnaire: true,
        fileSize: "210 KB",
      },
      {
        id: 7,
        title: "Өндөрт ажиллах аюулгүй байдлын заавар",
        description: "2м-ээс дээш өндөрт ажиллах үед мөрдвөл зохих аюулгүй байдлын зааварчилга.",
        hasQuestionnaire: false,
        fileSize: "175 KB",
      },
    ],
  },
  {
    id: "checklist",
    icon: CheckCircle2,
    iconColor: "#7C3AED",
    iconBg: "rgba(124,58,237,0.1)",
    accentColor: "#7C3AED",
    title: "Шалгах хуудас",
    description: "Аюулгүй байдлын аудит болон тогтмол шалгалтад ашиглах хяналтын хуудсууд",
    docs: [
      {
        id: 8,
        title: "Ажлын байрны аюулгүй байдлын аудитийн шалгах хуудас",
        description: "ISO 45001 шаардлагад тулгуурласан иж бүрэн аудитийн шалгах хуудас.",
        hasQuestionnaire: true,
        fileSize: "380 KB",
      },
      {
        id: 9,
        title: "Өдөр тутмын аюулгүй байдлын шалгалтын хуудас",
        description: "Ажлын байрны өдөр тутмын шалгалтад ашиглах хялбар хяналтын хуудас.",
        hasQuestionnaire: false,
        fileSize: "95 KB",
      },
      {
        id: 10,
        title: "ХХХ-ийн шалгалт болон засвар үйлчилгээний бүртгэл",
        description: "Хувийн хамгаалалтын хэрэгслийн байдал, хугацааг бүртгэх хяналтын хуудас.",
        hasQuestionnaire: false,
        fileSize: "120 KB",
      },
    ],
  },
  {
    id: "plan",
    icon: Calendar,
    iconColor: "#0EA5E9",
    iconBg: "rgba(14,165,233,0.1)",
    accentColor: "#0EA5E9",
    title: "Төлөвлөгөө",
    description: "Аюулгүй байдлын менежментийн төлөвлөгөө, хэрэгжилтийн хуваарь",
    docs: [
      {
        id: 11,
        title: "Жилийн ХАБЭА-ийн менежментийн төлөвлөгөө",
        description: "Байгууллагын жилийн аюулгүй байдлын менежментийн зорилго, арга хэмжээний иж бүрэн төлөвлөгөө.",
        hasQuestionnaire: false,
        fileSize: "265 KB",
      },
      {
        id: 12,
        title: "Аваарийн хариу арга хэмжээний төлөвлөгөө",
        description: "Гамшиг, аваарийн үед хэрэглэгдэх нүүлгэн шилжүүлэлт болон хариу арга хэмжээний төлөвлөгөө.",
        hasQuestionnaire: true,
        fileSize: "310 KB",
      },
      {
        id: 13,
        title: "ISO 45001 нэвтрүүлэлтийн үе шатны төлөвлөгөө",
        description: "ISO 45001 стандартыг байгууллагадаа нэвтрүүлэхэд шаардлагатай үе шат, хугацааны төлөвлөгөө.",
        hasQuestionnaire: false,
        fileSize: "190 KB",
      },
    ],
  },
  {
    id: "budget",
    icon: Wallet,
    iconColor: "#F59E0B",
    iconBg: "rgba(245,158,11,0.1)",
    accentColor: "#F59E0B",
    title: "Төсөв",
    description: "ХАБЭА-ийн хөрөнгө оруулалт, зардлын тооцоо хийх загвар баримт бичгүүд",
    docs: [
      {
        id: 14,
        title: "ХАБЭА-ийн жилийн төсвийн загвар",
        description: "Байгууллагын аюулгүй байдлын зардлыг ангилал тус бүрээр тооцох иж бүрэн төсвийн загвар.",
        hasQuestionnaire: false,
        fileSize: "145 KB",
      },
      {
        id: 15,
        title: "Сургалтын зардлын тооцооны хүснэгт",
        description: "Ажилтнуудын ХАБЭА-ийн сургалтын зардлыг төлөвлөх, бүртгэх хүснэгт.",
        hasQuestionnaire: false,
        fileSize: "85 KB",
      },
      {
        id: 16,
        title: "ХХХ худалдан авалтын зардлын дүн шинжилгээ",
        description: "Хувийн хамгаалалтын хэрэгсэл сонгох, зардлыг харьцуулах шинжилгээний маягт.",
        hasQuestionnaire: true,
        fileSize: "110 KB",
      },
    ],
  },
  {
    id: "manual",
    icon: HardHat,
    iconColor: "#10B981",
    iconBg: "rgba(16,185,129,0.1)",
    accentColor: "#10B981",
    title: "Аюулгүй ажиллагааны гарын авлага",
    description: "Ажлын байр болон салбар бүрт зориулсан аюулгүй ажиллагааны дэлгэрэнгүй гарын авлагууд",
    docs: [
      {
        id: 17,
        title: "Уул уурхайн аюулгүй ажиллагааны гарын авлага",
        description: "Уул уурхайн газрын доор болон гадаргуудын ажилд мөрдвөл зохих аюулгүй байдлын цогц гарын авлага.",
        hasQuestionnaire: false,
        fileSize: "1.2 MB",
      },
      {
        id: 18,
        title: "Барилгын ажлын аюулгүй байдлын гарын авлага",
        description: "Барилга, угсралт болон засварын ажилд зориулсан иж бүрэн аюулгүй ажиллагааны гарын авлага.",
        hasQuestionnaire: false,
        fileSize: "880 KB",
      },
      {
        id: 19,
        title: "Хөдөө аж ахуйн ажлын аюулгүй байдлын гарын авлага",
        description: "Газар тариалан, мал аж ахуйн ажилд тохирсон аюулгүй байдлын практик гарын авлага.",
        hasQuestionnaire: true,
        fileSize: "640 KB",
      },
    ],
  },
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selectedCat = DOC_CATEGORIES.find((c) => c.id === activeCategory) ?? null;

  return (
    <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      <title>Баримт Бичиг — MANOSH</title>

      {/* ── Hero ── */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${navy} 0%, #162040 100%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 60% at 15% 50%, rgba(3,173,180,0.12) 0%, transparent 60%), radial-gradient(40% 40% at 85% 25%, rgba(253,46,187,0.1) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(3,173,180,0.15)", border: "1px solid rgba(3,173,180,0.3)" }}
          >
            <FileText className="w-4 h-4" style={{ color: teal }} />
            <span className="text-[0.78rem] font-bold tracking-widest" style={{ color: teal }}>
              ЗАГВАР БАРИМТ БИЧГҮҮД
            </span>
          </div>

          <h1
            className="font-extrabold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}
          >
            Баримт Бичиг
          </h1>
          <p
            className="mx-auto max-w-[600px] leading-relaxed text-[1rem]"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            ХАБЭА-ийн менежментийн загвар баримт бичгүүдийг татаж авч, байгууллагынхаа
            онцлогт тохируулан ашиглана уу. Эрсдэлийн үнэлгээ, журам, шалгах хуудас
            болон бусад бүх баримт бичгүүд нэг дороос.
          </p>
        </div>
      </section>

      {/* ── Category cards ── */}
      <section className="py-12 lg:py-16" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!activeCategory ? (
            <>
              <div className="text-center mb-10">
                <h2 className="font-extrabold text-[1.4rem]" style={{ color: navy }}>
                  Баримт бичгийн ангилал сонгох
                </h2>
                <p className="mt-2 text-[0.88rem]" style={{ color: "#6B7C93" }}>
                  Хэрэгцээт ангилалаа сонгоод, шаардлагатай загвар баримт бичгээ татаж авна уу.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {DOC_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="group text-left bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                      style={{ border: `1.5px solid rgba(11,22,40,0.07)` }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                        style={{ background: cat.iconBg }}
                      >
                        <Icon className="w-5.5 h-5.5" style={{ color: cat.iconColor }} />
                      </div>
                      <h3
                        className="font-bold text-[1rem] mb-2 group-hover:transition-colors"
                        style={{ color: navy }}
                      >
                        {cat.title}
                      </h3>
                      <p className="text-[0.82rem] leading-relaxed mb-4" style={{ color: "#6B7C93" }}>
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.78rem] font-semibold" style={{ color: cat.accentColor }}>
                          {cat.docs.length} баримт бичиг
                        </span>
                        <span
                          className="flex items-center gap-1 text-[0.78rem] font-semibold"
                          style={{ color: cat.accentColor }}
                        >
                          Харах <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* ── Document list ── */
            <>
              {/* Back + header */}
              <div className="mb-8">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 text-[0.85rem] font-semibold mb-5 transition-colors hover:text-[#03ADB4]"
                  style={{ color: "#6B7C93" }}
                >
                  ← Бүх ангилал руу буцах
                </button>

                {selectedCat && (
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: selectedCat.iconBg }}
                    >
                      <selectedCat.icon className="w-6 h-6" style={{ color: selectedCat.iconColor }} />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-[1.4rem]" style={{ color: navy }}>
                        {selectedCat.title}
                      </h2>
                      <p className="text-[0.85rem]" style={{ color: "#6B7C93" }}>
                        {selectedCat.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Docs */}
              <div className="space-y-4">
                {selectedCat?.docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl p-5 transition-all hover:shadow-md"
                    style={{ border: "1px solid rgba(11,22,40,0.07)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3
                            className="font-bold text-[0.95rem] leading-snug"
                            style={{ color: navy }}
                          >
                            {doc.title}
                          </h3>
                          {doc.hasQuestionnaire && (
                            <span
                              className="px-2.5 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                              style={{
                                background: "rgba(3,173,180,0.1)",
                                color: teal,
                                border: "1px solid rgba(3,173,180,0.25)",
                              }}
                            >
                              Асуулга
                            </span>
                          )}
                        </div>
                        <p className="text-[0.82rem] leading-relaxed mb-3" style={{ color: "#6B7C93" }}>
                          {doc.description}
                        </p>
                        <span className="text-[0.75rem]" style={{ color: "#94A3B8" }}>
                          PDF · {doc.fileSize}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white hover:shadow-md hover:scale-105 transition-all"
                          style={{ background: selectedCat?.accentColor ?? teal }}
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                        <button
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-gray-100 transition-colors"
                          style={{ color: "#6B7C93", border: "1.5px solid rgba(11,22,40,0.1)" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Харах
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
