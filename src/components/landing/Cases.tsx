import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import staria1 from "@/assets/staria-1.webp";
import staria2 from "@/assets/staria-2.webp";
import staria3 from "@/assets/staria-3.webp";
import staria4 from "@/assets/staria-4.jpg";
import staria5 from "@/assets/staria-5.jpg";
import gle1 from "@/assets/gle-1.webp";
import gle2 from "@/assets/gle-2.webp";
import gle3 from "@/assets/gle-3.jpg";
import gle4 from "@/assets/gle-4.webp";

const tabs = ["Корея", "Китай", "ОАЭ", "Европа", "США"] as const;
type Tab = typeof tabs[number];

type CaseItem = {
  name: string;
  year: string;
  specs: [string, string][];
  price: string;
  saving: string;
  images?: string[];
};

const data: Record<Tab, CaseItem[]> = {
  "Корея": [
    {
      name: "Hyundai Staria Lounge Inspiration",
      year: "2025",
      specs: [
        ["Пробег", "10 750 км"],
        ["Импорт", "Корея"],
        ["Город доставки", "Владивосток"],
        ["Срок доставки", "14 дней"],
      ],
      price: "5 480 000 ₽",
      saving: "1 500 000 ₽",
      images: [staria3, staria2, staria1, staria4, staria5],
    },
    {
      name: "Mercedes-Benz GLE 450 Coupe",
      year: "2025",
      specs: [
        ["Пробег", "4 000 км"],
        ["Импорт", "Корея"],
        ["Город доставки", "Москва"],
        ["Срок доставки", "35 дней"],
      ],
      price: "11 800 000 ₽",
      saving: "3 000 000 ₽",
      images: [gle1, gle4, gle3, gle2],
    },
  ],
  "Китай": [],
  "ОАЭ": [],
  "Европа": [],
  "США": [],
};

export function Cases() {
  const [tab, setTab] = useState<Tab>("Корея");
  const cases = data[tab].length ? data[tab] : data["Корея"];

  return (
    <section id="cases" className="relative py-20 lg:py-28">
      <div className="page-container">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Кейсы
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Мои последние сделки — <span className="text-[#16A34A]">реальные автомобили</span> с цифрами и сроками
        </h2>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-white/5 pb-1">
          {tabs.map((t) => (
            <button
              key={t} onClick={() => setTab(t)}
              className={`relative px-4 py-2.5 text-sm font-medium transition ${
                tab === t ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t}
              {tab === t && (
                <motion.div layoutId="tab-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#16A34A]" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 flex flex-col gap-6"
          >
            {cases.map((c) => (
              <CaseCard key={c.name} c={c} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CaseCard({ c }: { c: CaseItem }) {
  const [idx, setIdx] = useState(0);
  const images = c.images ?? [];
  const hasImages = images.length > 0;
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="group rounded-2xl bg-surface border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-2xl transition-all">
      <div className="grid sm:grid-cols-2 gap-0">
        <div className="p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white leading-snug">
            {c.name} <span className="text-[#16A34A]">•</span> {c.year}
          </h3>
          <dl className="mt-4 space-y-2 text-sm flex-1">
            {c.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                <dt className="text-gray-500">{k}</dt>
                <dd className="text-gray-200 text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500">Цена со всеми расходами</div>
              <div className="text-2xl font-bold text-white">{c.price}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500">Экономия с рынком РФ</div>
              <div className="text-base font-semibold text-[#16A34A]">{c.saving}</div>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] sm:min-h-[440px] bg-gradient-to-br from-[#1d2128] to-[#0e1116] overflow-hidden">
          {hasImages ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={images[idx]}
                  alt={c.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <button onClick={prev} className="rounded-full bg-black/50 backdrop-blur p-2 text-white border border-white/10 hover:bg-black/70 transition">
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1">
                  {images.map((_, i) => (
                    <span key={i} className={`h-1 w-6 rounded-full transition ${i === idx ? "bg-white" : "bg-white/30"}`} />
                  ))}
                </div>
                <button onClick={next} className="rounded-full bg-black/50 backdrop-blur p-2 text-white border border-white/10 hover:bg-black/70 transition">
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-600 text-xs uppercase tracking-widest">[ Фото авто ]</div>
          )}
        </div>
      </div>
    </div>
  );
}
