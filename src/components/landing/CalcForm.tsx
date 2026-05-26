import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { FloatingInput } from "./FloatingInput";
import managerPhoto from "@/assets/manager.png";

const fields = [
  { key: "brand", label: "Марка авто" },
  { key: "model", label: "Модель авто" },
  { key: "budget", label: "Бюджет" },
  { key: "city", label: "Город доставки" },
  { key: "name", label: "Ваше имя" },
  { key: "phone", label: "Номер телефона" },
] as const;

export function CalcForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setV({}); }, 1800);
  };

  return (
    <section id="calc" className="relative py-20 lg:py-28">
      <div className="page-container">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md p-2">
          <span className="rounded-full bg-[#16A34A] text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Бесплатный расчёт
          </span>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-white/5">
          <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#16A34A]/30 blur-[120px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-5 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-14 items-stretch">
            <div className="lg:col-span-2">
              <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1d2128] to-[#0f1218]">
                <img src={managerPhoto} alt="Дмитрий Адаменко" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 backdrop-blur border border-white/10 p-3">
                  <div className="text-white font-semibold">Дмитрий Адаменко</div>
                  <div className="text-xs text-gray-400">ваш личный автоменеджер</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Я бесплатно рассчитаю стоимость с <span className="text-[#16A34A]">доставкой до России</span>
              </h2>

              <div className="flex flex-wrap gap-3 mt-6">
                <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition">
                  <Send size={16} className="text-[#16A34A]" /> Telegram
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition">
                  <MessageCircle size={16} className="text-[#16A34A]" /> Max
                </a>
              </div>

              <form onSubmit={submit} className="mt-8 grid sm:grid-cols-2 gap-3">
                {fields.map((f) => (
                  <FloatingInput
                    key={f.key} label={f.label} required
                    value={v[f.key] || ""} onChange={(e) => setV({ ...v, [f.key]: e.target.value })}
                  />
                ))}
                <button
                  type="submit" disabled={sent}
                  className="sm:col-span-2 mt-2 rounded-lg bg-[#16A34A] hover:bg-[#15913f] text-white font-semibold py-3.5 transition shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)]"
                >
                  {sent ? "Заявка отправлена ✓" : "Отправить на расчёт"}
                </button>
                <p className="sm:col-span-2 text-xs text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-gray-300">политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
