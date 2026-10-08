import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import HeroExperience from "./models/hero_models/HeroExperience";
import Magnetic from "./ui/Magnetic";
import { EASE } from "@/lib/motion";
import { heroWords } from "@/constants";
import { useAppReady } from "@/lib/AppReady";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

gsap.registerPlugin(SplitText, useGSAP);

/** Cycles through words; all words occupy the same grid cell so the width never jumps. */
const RotatingWord = ({ words, start }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [start, words.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {words.map((w) => (
        <span key={w} className="invisible [grid-area:1/1]" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={words[i]}
          initial={{ y: "105%", opacity: 0, rotateX: -40 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-105%", opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-gradient absolute inset-0 [grid-area:1/1]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const { ready } = useAppReady();
  const reduce = usePrefersReducedMotion();
  const section = useRef(null);
  const title = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  // scroll parallax: text drifts up & fades, scene eases back
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useGSAP(
    () => {
      if (!ready) return;
      // autoSplit waits for fonts and re-splits on resize; the returned tween is reverted automatically.
      SplitText.create(".split-target", {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 120,
            opacity: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.1,
            immediateRender: true,
          }),
      });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, onComplete: () => setIntroDone(true) });
      tl.from(".hero-fade", { y: 28, opacity: 0, duration: 1, stagger: 0.12 }, 0.5).from(
        ".hero-cue",
        { opacity: 0, y: -10, duration: 0.8 },
        1.1
      );
      if (reduce) tl.progress(1);
    },
    { dependencies: [ready], scope: section, revertOnUpdate: true }
  );

  return (
    <section id="top" ref={section} className="relative min-h-[100svh] overflow-hidden">
      {/* backdrop (glows sit above the opaque canvas and blend with it) */}
      <div aria-hidden className="grid-pattern absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 30%, rgba(139,92,246,.22), transparent 70%), radial-gradient(40% 35% at 80% 70%, rgba(236,72,153,.14), transparent 70%), radial-gradient(30% 30% at 60% 20%, rgba(34,211,238,.10), transparent 70%)",
        }}
      />

      <div className="container-x relative grid min-h-[100svh] grid-cols-1 items-center pt-28 pb-10 lg:grid-cols-12 lg:pb-0 lg:pt-24">
        {/* copy */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 flex flex-col gap-6 lg:col-span-7 xl:col-span-6">
          <span className="hero-fade chip w-fit !py-1.5 !pl-2 !pr-4">
            <span className="relative grid h-5 w-5 place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Solution Engineer · Tokyo
          </span>

          <h1
            ref={title}
            className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.025em] sm:text-6xl lg:text-[4rem] xl:text-[4.8rem]"
          >
            <span className="block">
              <span className="split-target">Shaping the</span>{" "}
              <span className="hero-fade inline-block">
                <RotatingWord words={heroWords} start={introDone || reduce} />
              </span>
            </span>
            <span className="split-target block text-white/90">through technology.</span>
          </h1>

          <p className="hero-fade max-w-md text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m <strong className="font-semibold text-white">Shun</strong> — a solution engineer and HCI
            researcher turning bold ideas into products people love to use.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#works" className="btn-primary group" data-cursor="hover">
                See my work
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#about" className="btn-ghost" data-cursor="hover">
                Enter my room
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* 3D scene — in flow on mobile, pinned to the right on desktop */}
        <motion.div
          style={{ y: sceneY, scale: sceneScale, mixBlendMode: "screen" }}
          className="relative mt-6 h-[46vh] w-full sm:h-[54vh] lg:absolute lg:inset-y-0 lg:right-[-8vw] lg:mt-0 lg:h-full lg:w-[62vw] xl:right-[-6vw] xl:w-[58vw]"
        >
          <div className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_22%)]">
            <HeroExperience containerRef={section} ready={ready} />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="hero-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted lg:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-brand-light"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown size={12} />
      </a>
    </section>
  );
};

export default Hero;
