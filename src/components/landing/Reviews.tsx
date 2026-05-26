import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  { name: "Артём", city: "Москва", car: "BMW X5 M60i (2024)", text: "Дмитрий нашёл редкую комплектацию из Кореи. Всё прозрачно — каждый этап в отчётах. По срокам в день в день. Сэкономил почти 2 млн против рынка РФ." },
  { name: "Светлана", city: "Краснодар", car: "Hyundai Palisade (2024)", text: "Боялась брать авто из-за границы — оказалось проще, чем у дилера. Договор, фиксированная цена, машина с одним хозяином. Рекомендую." },
  { name: "Игорь", city: "Новосибирск", car: "Lexus LX 600 (2025)", text: "Уже второй автомобиль через Дмитрия. Подбор, диагностика, таможня, доставка — ноль головной боли. Документы привезли вместе с авто." },
  { name: "Мария", city: "Санкт-Петербург", car: "Mercedes-Benz GLE 450 (2025)", text: "Купили подарок мужу. Всё было организовано до мелочей — даже встретили в порту. Спасибо за человеческий подход и честность." },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 lg:py-28">
      <div className="page-container">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Отзывы
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Доверие клиентов — <span className="text-[#16A34A]">результат прозрачности</span> и ответственности
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative rounded-2xl bg-surface border border-white/5 p-7 hover:border-white/10 hover:-translate-y-1 transition-all"
            >
              <Quote size={28} className="text-[#16A34A]/40 mb-3" />
              <p className="text-gray-300 leading-relaxed">{r.text}</p>
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#16A34A] to-[#0d6b30] grid place-items-center text-white font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">{r.name} · <span className="text-gray-500 font-normal">{r.city}</span></div>
                  <div className="text-xs text-gray-500">{r.car}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
