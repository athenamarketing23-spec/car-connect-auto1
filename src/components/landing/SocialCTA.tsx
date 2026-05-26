import { Send } from "lucide-react";

export function SocialCTA() {
  return (
    <section className="relative py-12">
      <div className="page-container">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-surface p-8 sm:p-12">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#16A34A]/30 blur-[100px]" />
          <div className="absolute -left-10 -bottom-10 h-72 w-72 rounded-full bg-[#16A34A]/20 blur-[100px]" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
                Подписывайтесь на наши соцсети
              </h3>
              <p className="mt-3 text-gray-400 max-w-xl">
                Ежедневно публикую автомобили с реальными ценами, сроками и комплектациями.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15913f] text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-[0_10px_30px_-10px_rgba(22,163,74,0.7)] shrink-0">
              <Send size={18} /> Подписаться
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
