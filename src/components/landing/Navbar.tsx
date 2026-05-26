import { useState, useEffect } from "react";
import { Send, MessageCircle, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useFormDrawer } from "./FormDrawerContext";

const links = [
  { href: "#about", label: "О компании" },
  { href: "#stages", label: "Этапы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Navbar() {
  const { openForm } = useFormDrawer();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastY && y > 80) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "bg-[#0B0D12]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="page-container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/autoimport.svg" alt="Logo" className="w-32 h-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <a href="#" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition" aria-label="Telegram">
              <Send size={18} />
            </a>
            <a href="#" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition" aria-label="Max">
              <MessageCircle size={18} />
            </a>
          </div>
          <button
            onClick={openForm}
            className="hidden sm:inline-flex items-center bg-white text-[#0B0D12] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-lg"
          >
            Подобрать Авто
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 text-white" aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0B0D12]/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-gray-300 hover:text-white">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); openForm(); }}
              className="w-full mt-2 bg-white text-[#0B0D12] font-semibold py-2.5 rounded-lg"
            >
              Подобрать Авто
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
