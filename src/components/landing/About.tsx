import { motion } from "framer-motion";
import dmitryPhoto from "@/assets/dmitry.jpg";

const stats = [
  { num: "10+", label: "Лет опыта в подборе и доставке авто" },
  { num: "1500+", label: "Автомобилей доставлено из-за рубежа" },
  { num: "25 дней", label: "Средний срок доставки до клиента" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="page-container">
        {/* О компании badge */}
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            О компании
          </span>
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] max-w-[360px] rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#1a1d24] to-[#0f1218]"
          >
            <img src={dmitryPhoto} alt="Дмитрий Адаменко" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 p-4">
              <div className="text-white font-semibold">Дмитрий Адаменко</div>
              <div className="text-xs text-gray-400">Ваш личный автоменеджер</div>
            </div>
          </motion.div>

          <div>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium">
              Меня зовут <span className="text-white">Дмитрий</span>. Более 10 лет я помогаю людям покупать автомобили за границей. Нахожу редкие комплектации и делаю процесс максимально простым и понятным.
            </p>

            <h3 className="mt-8 text-2xl lg:text-3xl font-bold text-white leading-tight">
              Все сделки прозрачные
            </h3>
            <p className="mt-3 text-lg text-gray-400 leading-relaxed">
              реальные кейсы, фиксированные сроки и экономия для клиентов — <span className="text-white font-semibold">от 15 до 40%</span>
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {stats.map((s) => (
                <div key={s.num} className="rounded-2xl bg-surface border border-white/5 p-7 hover:border-[#16A34A]/40 hover:-translate-y-0.5 transition">
                  <div className="text-3xl lg:text-4xl font-bold text-[#16A34A] leading-none whitespace-nowrap">{s.num}</div>
                  <div className="mt-4 text-base text-gray-400 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
