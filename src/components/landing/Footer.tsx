import { Phone, Clock, Send, MessageCircle, Star, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFormDrawer } from "./FormDrawerContext";

const links = [
  { href: "#about", label: "О компании" },
  { href: "#stages", label: "Этапы сотрудничества" },
  { href: "#cases", label: "Кейсы клиентов" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  const { openForm } = useFormDrawer();
  return (
    <footer id="contacts" className="relative border-t border-white/5 mt-10 bg-black">
      <div className="page-container py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — Logo */}
          <div className="relative flex items-center justify-center lg:justify-start overflow-visible lg:-ml-6">
            <Link
              to="/"
              className="shrink-0 max-w-full block -translate-x-4 sm:-translate-x-6 lg:-translate-x-10 -translate-y-6 sm:-translate-y-10 lg:-translate-y-14"
            >
              <img
                src="/autoimport.svg"
                alt="Logo"
                className="w-[950px] max-w-full h-auto object-contain object-[center_38%]"
              />
            </Link>
          </div>

          {/* RIGHT — everything else */}
          <div className="flex flex-col gap-10">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Nav */}
              <nav>
                <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4">Навигация</div>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-gray-200 hover:text-[#16A34A] text-sm uppercase tracking-wider transition">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Contacts */}
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4">Контакты</div>
                <a href="tel:+79999999999" className="block text-2xl sm:text-3xl font-bold text-white hover:text-[#16A34A] transition tracking-tight">
                  +7 (999) 999-99-99
                </a>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gray-500">График работы</div>
                <div className="mt-1 flex items-center gap-2 text-gray-200 text-sm">
                  <Clock size={14} className="text-[#16A34A]" /> Пн–Вс · 09:00–21:00 МСК
                </div>

                <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gray-500">Email</div>
                <a href="mailto:hello@autoimport.ru" className="text-white text-sm hover:text-[#16A34A] transition tracking-wider uppercase">
                  hello@autoimport.ru
                </a>
              </div>
            </div>

            {/* Rating + CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <MapPin size={18} className="text-[#16A34A]" />
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">5,0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-gray-400 leading-tight">Рейтинг<br />в Яндексе</div>
              </div>

              <button
                onClick={openForm}
                className="flex-1 inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15913f] text-white font-semibold px-6 py-4 rounded-2xl transition shadow-[0_15px_40px_-10px_rgba(22,163,74,0.6)] uppercase tracking-wider text-sm"
              >
                Подобрать автомобиль
              </button>
            </div>

            {/* Socials */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">Ежедневно публикую авто с реальными ценами</div>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Telegram" className="h-12 w-12 grid place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 hover:text-white hover:border-[#16A34A] hover:bg-[#16A34A]/10 transition">
                  <Send size={18} />
                </a>
                <a href="#" aria-label="WhatsApp" className="h-12 w-12 grid place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 hover:text-white hover:border-[#16A34A] hover:bg-[#16A34A]/10 transition">
                  <MessageCircle size={18} />
                </a>
                <a href="#" aria-label="Phone" className="h-12 w-12 grid place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 hover:text-white hover:border-[#16A34A] hover:bg-[#16A34A]/10 transition">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-500 uppercase tracking-wider">
          <div>© {new Date().getFullYear()} AUTO·IMPORT. Все права защищены.</div>
          <a href="#" className="hover:text-gray-300">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
