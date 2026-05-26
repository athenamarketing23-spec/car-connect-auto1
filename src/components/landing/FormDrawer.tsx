import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormDrawer } from "./FormDrawerContext";
import { FloatingInput } from "./FloatingInput";

const fields = [
  { key: "brand", label: "Марка авто" },
  { key: "model", label: "Модель авто" },
  { key: "budget", label: "Бюджет" },
  { key: "city", label: "Город доставки" },
  { key: "name", label: "Ваше имя" },
  { key: "phone", label: "Номер телефона" },
] as const;

export function FormDrawer() {
  const { open, closeForm } = useFormDrawer();
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setValues({});
      closeForm();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeForm}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md overflow-y-auto bg-[#0F1218] border-l border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Подобрать автомобиль</h3>
              <button onClick={closeForm} className="rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Оставьте заявку — Дмитрий лично свяжется с вами и подберёт авто под ваш бюджет.
            </p>
            <form onSubmit={submit} className="space-y-3">
              {fields.map((f) => (
                <FloatingInput
                  key={f.key}
                  label={f.label}
                  value={values[f.key] || ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  required
                />
              ))}
              <button
                type="submit"
                disabled={sent}
                className="w-full mt-2 rounded-lg bg-[#16A34A] hover:bg-[#15913f] text-white font-semibold py-3.5 transition-all shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(22,163,74,0.8)]"
              >
                {sent ? "Заявка отправлена ✓" : "Отправить на расчёт"}
              </button>
              <p className="text-xs text-gray-500 text-center pt-2">
                Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-gray-300">политикой конфиденциальности</a>
              </p>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
