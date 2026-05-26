import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useFormDrawer } from "./FormDrawerContext";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const { openForm } = useFormDrawer();
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col pt-24 pb-10 lg:pt-28 lg:pb-12">
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D12]/80 via-[#0B0D12]/55 to-[#0B0D12] pointer-events-none" />
      <div className="absolute inset-0 radial-green pointer-events-none" />

      <div className="relative page-container w-full flex-1 flex flex-col">
        {/* Heading at top */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5.25rem] font-bold text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] max-w-6xl"
        >
          <span className="text-[#16A34A]">Доставка авто</span> из Южной Кореи, Китая и Японии под ключ
        </motion.h1>

        {/* Spacer */}
        <div className="flex-1 min-h-[80px]" />

        {/* Bottom row: CTA left, free calc right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 items-end"
        >
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Подберу и доставлю автомобиль под ваши требования. Работаю по договору, без скрытых платежей. Полный цикл — от поиска до постановки на учёт.
            </p>
            <button
              onClick={openForm}
              className="group inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15913f] text-white font-semibold px-7 py-4 rounded-xl transition-all shadow-[0_10px_40px_-10px_rgba(22,163,74,0.7)] hover:-translate-y-0.5"
            >
              Подобрать Автомобиль
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:justify-self-end w-full lg:w-auto">
            <a
              href="#calc"
              className="group block rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] transition p-6 lg:min-w-[340px]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[#16A34A] text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                    Бесплатный
                  </div>
                  <div className="text-white text-2xl font-bold leading-tight">
                    Расчёт стоимости
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white group-hover:bg-[#16A34A] group-hover:border-[#16A34A] transition">
                  <Calculator size={20} />
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
