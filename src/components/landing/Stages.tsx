import { motion } from "framer-motion";

const stages = [
  { t: "Заявка и подбор", d: "Вы описываете марку, модель и бюджет. Я помогаю вам с выбором автомобиля, оценкой стоимости под ключ, расчётом таможни и доставки. Бюджет на автомобиль — от 3 000 000 ₽" },
  { t: "Заключение договора", d: "Заключаем договор, фиксируем цену и сроки. Вы оплачиваете услугу, стоимость которой зависит от автомобиля, страны ввоза и стоимости. Стоимость услуги — от 200 000 ₽" },
  { t: "Проверка и отчёт", d: "Анализирую рынок, ищу автомобили. Специалист выезжает на осмотр согласованных авто, проводит профессиональную диагностику, проверяет техническое и кузовное состояние. Детальный фото и видео отчёт." },
  { t: "Выкуп автомобиля", d: "Выкупаем согласованный автомобиль. Вы оплачиваете счёт по инвойсу. Доставляем автомобиль до места таможенного контроля и оформления." },
  { t: "Оформление автомобиля", d: "Контролирую таможенную очистку, оплату и списание утилизационного сбора, оформление ЭПТС. Когда все документы готовы, организую доставку автомобиля до вашего города." },
  { t: "Доставка и передача", d: "Средний срок доставки — 25 дней. Для люксовых авто возможна авиадоставка за 5−6 дней. Авто приезжает с полным пакетом документов, готовым к постановке на учёт и эксплуатации.", green: true },
];

export function Stages() {
  return (
    <section id="stages" className="relative py-20 lg:py-28">
      <div className="page-container">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Этапы сотрудничества
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Процесс, в котором вы <span className="text-[#16A34A]">контролируете каждый шаг</span>
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative rounded-2xl p-6 border transition-all hover:-translate-y-1 ${
                s.green
                  ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_25px_60px_-20px_rgba(22,163,74,0.6)]"
                  : "bg-surface border-white/5 hover:border-white/10 hover:shadow-2xl"
              }`}
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border text-lg font-bold tabular-nums ${s.green ? "bg-white/15 border-white/30 text-white" : "bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]"}`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${s.green ? "text-white" : "text-white"}`}>{s.t}</h3>
              <p className={`text-sm leading-relaxed ${s.green ? "text-white/90" : "text-gray-400"}`}>{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
