import { createFileRoute } from "@tanstack/react-router";
import { FormDrawerProvider } from "@/components/landing/FormDrawerContext";
import { FormDrawer } from "@/components/landing/FormDrawer";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Stages } from "@/components/landing/Stages";
import { CalcForm } from "@/components/landing/CalcForm";
import { Cases } from "@/components/landing/Cases";
import { Advantages } from "@/components/landing/Advantages";
import { Reviews } from "@/components/landing/Reviews";
import { SocialCTA } from "@/components/landing/SocialCTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import highwayGreen from "@/assets/highway-green.jpg";
import bmwHeadlight from "@/assets/bmw-headlight.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Доставка авто из Кореи, Китая и Японии под ключ — AUTO·IMPORT" },
      { name: "description", content: "Подбор и доставка автомобилей из Южной Кореи, Китая и Японии под ключ. Договор, фиксированная цена, экономия 15–40%." },
    ],
  }),
});

function Index() {
  return (
    <FormDrawerProvider>
      <div className="bg-app min-h-screen text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <div className="page-container">
            <div className="relative overflow-hidden rounded-3xl border border-white/5">
              <img src={highwayGreen} alt="Ночная трасса" className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <Stages />
          <div className="page-container">
            <div className="relative overflow-hidden rounded-3xl border border-white/5">
              <img src={bmwHeadlight} alt="Фара BMW" className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <CalcForm />
          <Cases />
          <Advantages />
          <Reviews />
          <SocialCTA />
          <FAQ />
        </main>
        <Footer />
        <FormDrawer />
      </div>
    </FormDrawerProvider>
  );
}
