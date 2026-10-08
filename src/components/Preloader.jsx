import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useAppReady } from "@/lib/AppReady";
import { emerge, pet } from "@/lib/pet";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import PetHouse from "./fx/PetHouse";
import signature from "@/assets/signature.json";

const MIN_MS = 1800;
const MAX_MS = 4000;

/**
 * Intro screen: the name is written in cursive, one stroke at a time, as
 * assets load. When the pen finishes, the ghost comes out of its house and
 * flies to the pointer, and the screen fades away.
 */
const Preloader = () => {
  const { progress } = useProgress();
  const { ready, setReady } = useAppReady();
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [start] = useState(() => performance.now());
  const house = useRef(null);
  const pathRefs = useRef([]);
  const lengths = useRef([]);
  const display = useRef(0);
  const target = useRef(0);

  // measure every glyph once
  useLayoutEffect(() => {
    lengths.current = pathRefs.current.map((p) => (p ? p.getTotalLength() : 0));
    pathRefs.current.forEach((p, i) => {
      if (!p) return;
      const L = lengths.current[i];
      p.style.strokeDasharray = `${L}`;
      p.style.strokeDashoffset = `${L}`;
    });
  }, []);

  useEffect(() => {
    target.current = progress;
  }, [progress]);

  // drive the pen
  useEffect(() => {
    let raf;
    const total = () => lengths.current.reduce((a, b) => a + b, 0);
    const tick = () => {
      const floor = Math.min(90, ((performance.now() - start) / MAX_MS) * 100);
      const goal = done ? 100 : Math.max(target.current, floor);
      display.current += (goal - display.current) * (done ? 0.16 : 0.07);
      let budget = (display.current / 100) * total();
      pathRefs.current.forEach((p, i) => {
        if (!p) return;
        const L = lengths.current[i];
        const drawn = Math.max(0, Math.min(L, budget));
        p.style.strokeDashoffset = `${L - drawn}`;
        budget -= L;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, done]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const elapsed = () => performance.now() - start;
    let timer;
    const finish = () => {
      timer = setTimeout(() => setDone(true), Math.max(0, MIN_MS - elapsed()));
    };
    if (progress >= 100) finish();
    const hard = setTimeout(finish, MAX_MS);
    return () => {
      clearTimeout(timer);
      clearTimeout(hard);
    };
  }, [progress, start]);

  // pen finished → ghost comes out of the house (unless it is asleep, or there is no cursor pet) → leave
  useEffect(() => {
    if (!done) return undefined;
    const canEmerge = fine && !reduce && !pet.asleep;
    const timers = [];
    if (canEmerge) {
      timers.push(setTimeout(() => setDoorOpen(true), 500));
      timers.push(
        setTimeout(() => {
          const d = house.current?.door?.();
          if (d) emerge(d.x, d.y);
        }, 800)
      );
      timers.push(setTimeout(() => setDoorOpen(false), 1500));
    }
    timers.push(setTimeout(setReady, canEmerge ? 2200 : 1100));
    return () => timers.forEach(clearTimeout);
  }, [done, fine, reduce, setReady]);

  useEffect(() => {
    if (ready) document.documentElement.style.overflow = "";
  }, [ready]);

  const [vx, vy, vw, vh] = signature.viewBox;

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg px-8"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(50% 45% at 50% 55%, rgba(139,92,246,.18), transparent 70%)" }}
            animate={{ opacity: done ? 1 : 0.5 }}
            transition={{ duration: 1 }}
          />

          <svg
            viewBox={`${vx} ${vy} ${vw} ${vh}`}
            className="relative w-[min(88vw,46rem)] overflow-visible"
            role="img"
            aria-label={signature.text}
          >
            <defs>
              <linearGradient id="sig-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#f9a8d4" />
              </linearGradient>
              <filter id="sig-glow" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation={3 / signature.scale} result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {signature.glyphs.map(({ d, x, y }, i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(${signature.scale} ${-signature.scale})`}>
                <motion.path
                  d={d}
                  fill="url(#sig-grad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: done ? 1 : 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.03 }}
                />
                <motion.path
                  ref={(el) => (pathRefs.current[i] = el)}
                  d={d}
                  fill="none"
                  stroke="url(#sig-grad)"
                  strokeWidth={1.6 / signature.scale}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#sig-glow)"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: done ? 0.35 : 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                />
              </g>
            ))}
          </svg>

          <motion.div
            className="relative mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <PetHouse ref={house} intro open={doorOpen} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
