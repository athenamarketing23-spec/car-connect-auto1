import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "loading" | "reveal" | "done";

const MIN_VISIBLE_MS = 1400;
const REVEAL_DURATION_MS = 750;

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(true);
  const finishedRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let target = 12;
    let raf = 0;

    const tick = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const delta = (target - prev) * 0.08;
        const next = prev + Math.max(delta, prev < 30 ? 0.6 : 0.15);
        return Math.min(next, target);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onReadyState = () => {
      if (document.readyState === "interactive") target = Math.max(target, 72);
      if (document.readyState === "complete") target = 100;
    };

    const trackImages = () => {
      const images = Array.from(document.images);
      if (images.length === 0) return;

      let loaded = 0;
      const bump = () => {
        loaded += 1;
        const ratio = loaded / images.length;
        target = Math.max(target, 55 + ratio * 35);
        if (loaded >= images.length) target = Math.max(target, 92);
      };

      images.forEach((img) => {
        if (img.complete) bump();
        else {
          img.addEventListener("load", bump);
          img.addEventListener("error", bump);
        }
      });
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const elapsed = Date.now() - startTimeRef.current;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.setTimeout(() => {
        target = 100;
        setProgress(100);

        window.setTimeout(() => setShowBar(false), 350);
        window.setTimeout(() => setPhase("reveal"), 450);
        window.setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
        }, 450 + REVEAL_DURATION_MS);
      }, wait);
    };

    onReadyState();
    document.addEventListener("readystatechange", onReadyState);
    trackImages();

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("readystatechange", onReadyState);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const reveal = phase === "reveal";
  const roundedProgress = Math.round(progress);
  const labelAtEnd = roundedProgress >= 92;

  return (
    <div
      className="fixed inset-0 z-[10000]"
      aria-live="polite"
      aria-busy={!reveal}
      aria-label="Загрузка сайта"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#15181E]"
        initial={false}
        animate={{ y: reveal ? "-100%" : "0%" }}
        transition={{ duration: REVEAL_DURATION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#15181E]"
        initial={false}
        animate={{ y: reveal ? "100%" : "0%" }}
        transition={{ duration: REVEAL_DURATION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
      />

      <AnimatePresence>
        {showBar && (
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative h-20 w-full bg-black sm:h-24">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#16A34A]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <motion.span
                className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl ${
                  labelAtEnd ? "-translate-x-full pr-3" : "-translate-x-1/2"
                }`}
                initial={false}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {roundedProgress}%
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
