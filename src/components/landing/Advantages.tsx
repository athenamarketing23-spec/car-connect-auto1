import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Camera, ShieldCheck, FileCheck2, Truck, Handshake, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import interiorGreen from "@/assets/interior-green.jpg";

const benefits = [
  { icon: Camera, t: "Подробные фото и видео отчёты", d: "Перед покупкой вы видите авто в деталях — все плюсы и минусы." },
  { icon: ShieldCheck, t: "Возвратный депозит", d: "В полном объёме, если сделка не состоится по моей вине." },
  { icon: FileCheck2, t: "Фиксированная цена", d: "По договору, без скрытых платежей и наценок." },
  { icon: Truck, t: "Доставка в любую точку", d: "Привезу автомобиль в любой город России и мира." },
  { icon: Handshake, t: "Полное сопровождение", d: "От заявки до постановки на учёт — всё под ключ." },
  { icon: Wrench, t: "Тех- и юр-проверка", d: "С гарантией прозрачной истории и состояния." },
];

/** 4 колонки сетки — слева | пустой центр | справа, все карточки одной ширины */
const CARD =
  "col-span-12 lg:col-span-4 w-full h-[288px] sm:h-[300px] lg:h-[308px]";
const CARD_LEFT = `${CARD} lg:col-start-1 lg:justify-self-stretch`;
const CARD_CENTER = `${CARD} lg:col-start-5 lg:justify-self-stretch max-w-none mx-0`;
const CARD_RIGHT = `${CARD} lg:col-start-9 lg:justify-self-stretch`;
const ROW_GRID = "grid grid-cols-12 gap-x-6 lg:gap-x-8 gap-y-6 lg:gap-y-8";

const points = [
  { t: "Состояние авто", d: "Автомобили из-за границы отличаются отличным техническим состоянием и аккуратной эксплуатацией." },
  { t: "Экономия", d: "Импорт автомобилей позволяет сэкономить от 15 до 40% относительно цен на рынке РФ." },
  { t: "Ассортимент", d: "За границей доступен более широкий ассортимент комплектаций и редких моделей." },
];

function colorForAngle(angleDeg: number): string {
  const a = (angleDeg * Math.PI) / 180;
  const px = Math.sin(a);
  const py = -Math.cos(a);
  const nx = Math.SQRT1_2;
  const ny = -Math.SQRT1_2;
  const proj = px * nx + py * ny;
  const t = (proj + 1) / 2;
  const r = Math.round(255 + (22 - 255) * t);
  const g = Math.round(255 + (163 - 255) * t);
  const b = Math.round(255 + (74 - 255) * t);
  return `rgb(${r},${g},${b})`;
}

function TickRing({ count = 120, radius = 48, length = 3, width = 0.45 }: { count?: number; radius?: number; length?: number; width?: number }) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        return (
          <line
            key={i}
            x1="50"
            y1={50 - radius}
            x2="50"
            y2={50 - radius + length}
            stroke={colorForAngle(angle)}
            strokeWidth={width}
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </g>
  );
}

function DotRing({ count = 84, radius = 42, dotR = 0.45 }: { count?: number; radius?: number; dotR?: number }) {
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const angleDeg = (i / count) * 360;
        const a = (angleDeg * Math.PI) / 180;
        const cx = 50 + radius * Math.sin(a);
        const cy = 50 - radius * Math.cos(a);
        return <circle key={i} cx={cx} cy={cy} r={dotR} fill={colorForAngle(angleDeg)} />;
      })}
    </g>
  );
}

function BenefitCard({
  icon: Icon,
  t,
  d,
  greenBg,
  className,
  delay,
}: {
  icon: LucideIcon;
  t: string;
  d: string;
  greenBg: boolean;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "rounded-3xl border p-7 lg:p-8 flex flex-col overflow-hidden transition-all hover:-translate-y-1",
        greenBg
          ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_20px_50px_-20px_rgba(22,163,74,0.5)]"
          : "bg-surface border-white/5 hover:border-white/10",
        className,
      )}
    >
      <div className="flex gap-4 items-center mb-6 min-h-[3.5rem]">
        <div
          className={cn(
            "flex items-center justify-center h-14 w-14 rounded-xl shrink-0",
            greenBg ? "bg-white/15 text-white" : "bg-[#16A34A]/10 text-[#16A34A]",
          )}
        >
          <Icon size={26} strokeWidth={2} />
        </div>
        <h3 className="flex-1 min-w-0 text-xl lg:text-2xl font-bold text-white leading-tight">{t}</h3>
      </div>
      <p className={cn("text-base lg:text-lg leading-relaxed mt-auto", greenBg ? "text-white/90" : "text-gray-400")}>{d}</p>
    </motion.div>
  );
}

export function Advantages() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, -300]);
  /** Видна всё время прокрутки карточек и в «коридоре», исчезает один раз перед следующим разделом */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.84, 0.96], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0.84, 0.96], [1, 0.96]);

  return (
    <section id="advantages" className="relative">
      <div ref={scrollTrackRef} className="page-container relative pt-20 lg:pt-28">
        {/* Фиксированная надпись + кольца (крутятся при скролле секции) */}
        <div className="sticky top-0 z-0 h-screen flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <motion.div
              style={{ rotate: rotateOuter }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <svg viewBox="0 0 100 100" className="w-[min(90vw,780px)] aspect-square">
                <TickRing count={120} radius={48} length={3} width={0.45} />
              </svg>
            </motion.div>

            <motion.div
              style={{ rotate: rotateInner }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <svg viewBox="0 0 100 100" className="w-[min(70vw,600px)] aspect-square">
                <DotRing count={84} radius={42} dotR={0.45} />
              </svg>
            </motion.div>

            <h2 className="relative z-10 text-center text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] px-6 max-w-4xl [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
              Мне доверяют, потому что <span className="text-[#16A34A] block sm:inline">всё прозрачно</span>
            </h2>
          </motion.div>
        </div>

        {/* Карточки наезжают на заголовок при скролле */}
        <div className="relative z-10 -mt-[100vh]">
          <div className="pt-[75vh]">
            <div className="mb-10 lg:mb-12">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0B0D12] p-2">
                <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
                  Преимущества
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Ряд 1 — по центру (кол. 5–8) */}
              <div className={ROW_GRID}>
                <BenefitCard icon={benefits[0].icon} t={benefits[0].t} d={benefits[0].d} greenBg={false} className={CARD_CENTER} delay={0} />
              </div>

              {/* Ряд 2 — слева (1–4) и справа (9–12), центр пустой */}
              <div className={ROW_GRID}>
                <BenefitCard icon={benefits[1].icon} t={benefits[1].t} d={benefits[1].d} greenBg={false} className={CARD_LEFT} delay={0.05} />
                <BenefitCard icon={benefits[2].icon} t={benefits[2].t} d={benefits[2].d} greenBg={false} className={CARD_RIGHT} delay={0.1} />
              </div>

              {/* Ряд 3 — зелёное преимущество по центру */}
              <div className={ROW_GRID}>
                <BenefitCard icon={benefits[3].icon} t={benefits[3].t} d={benefits[3].d} greenBg className={CARD_CENTER} delay={0.15} />
              </div>

              {/* Ряд 4 — по бокам */}
              <div className={ROW_GRID}>
                <BenefitCard icon={benefits[4].icon} t={benefits[4].t} d={benefits[4].d} greenBg={false} className={CARD_LEFT} delay={0.2} />
                <BenefitCard icon={benefits[5].icon} t={benefits[5].t} d={benefits[5].d} greenBg={false} className={CARD_RIGHT} delay={0.25} />
              </div>
            </div>
          </div>

          {/* Прокрутка: блоки уезжают вверх, надпись снова в центре, затем плавно гаснет */}
          <div className="h-[55vh] lg:h-[65vh]" aria-hidden />

          <div className="relative z-20 bg-[#0B0D12] pt-8 pb-16 lg:pb-24">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Почему выгодно покупать <span className="text-[#16A34A]">автомобили за границей?</span>
            </h3>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                {points.map((p, i) => (
                  <div key={p.t} className="flex gap-6 rounded-3xl bg-surface border border-white/5 p-6 lg:p-8">
                    <div className="text-4xl font-bold text-[#16A34A] leading-none w-12 shrink-0">0{i + 1}</div>
                    <div>
                      <h4 className="text-white font-semibold text-xl">{p.t}</h4>
                      <p className="mt-2 text-base text-gray-400 leading-relaxed">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#1d2128] to-[#0e1116]">
                <img src={interiorGreen} alt="Зелёный кожаный салон Mercedes" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
