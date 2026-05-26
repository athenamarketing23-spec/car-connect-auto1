import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const items = [
  { q: "Сколько занимает доставка автомобиля?", a: "Средний срок — 25 дней от выкупа до передачи. Для люксовых авто возможна авиадоставка за 5–6 дней." },
  { q: "Из каких стран вы возите автомобили?", a: "Основные направления — Южная Корея, Китай, Япония. Также работаем с ОАЭ, Европой и США." },
  { q: "Что входит в стоимость услуги?", a: "Подбор, диагностика, выкуп, доставка, таможенное оформление, ЭПТС и доставка до вашего города." },
  { q: "Какие гарантии вы даёте?", a: "Договор с фиксированной ценой, возвратный депозит, фото/видео-отчёт по каждому этапу и юридическая чистота автомобиля." },
  { q: "Можно ли купить авто в кредит или лизинг?", a: "Да, помогаем с подбором кредитных и лизинговых программ под импортные автомобили." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-20 lg:py-28">
      <div className="page-container max-w-5xl">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Вопросы и ответы
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
          Популярные вопросы
        </h2>
        <div className="mt-10 space-y-2">
          {items.map((it, i) => {
            const active = open === i;
            return (
              <div key={it.q} className="rounded-2xl bg-surface border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="text-white font-semibold text-base sm:text-lg">{it.q}</span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-[#16A34A] transition-transform duration-300 ${active ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-400 leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
