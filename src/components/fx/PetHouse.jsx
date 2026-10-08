import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pet, sleepAt, wake } from "@/lib/pet";
import { cn } from "@/lib/utils";

const HOLD_MS = 3000;
const CLICK_COOLDOWN_MS = 1500;

/**
 * The ghost's home: a softly glowing mushroom cottage.
 *  - hold the pointer down on it for 3 s to tuck the ghost in
 *  - press and release it while the ghost sleeps to wake it up (size resets)
 * `intro` renders a non-interactive copy for the loading screen.
 * The imperative `door()` returns the door's viewport coordinates.
 */
const PetHouse = forwardRef(({ intro = false, open = false, className }, ref) => {
  const root = useRef(null);
  const [asleep, setAsleep] = useState(pet.asleep);
  const asleepRef = useRef(pet.asleep);
  const [ajar, setAjar] = useState(false);
  const [hold, setHold] = useState(0);
  const holdRaf = useRef(0);
  const holdStart = useRef(0);
  const pressStartedAsleep = useRef(false);
  const ignoreUntil = useRef(0);

  useImperativeHandle(ref, () => ({ door: () => doorOf(root.current) }));

  // keep the ref in sync for pointer handlers
  useEffect(() => {
    asleepRef.current = asleep;
  }, [asleep]);

  // react to the ghost flying in / out
  useEffect(() => {
    let t;
    const onSleep = () => setAjar(true);
    const onEntered = () => {
      setAsleep(true);
      ignoreUntil.current = performance.now() + CLICK_COOLDOWN_MS;
      t = setTimeout(() => setAjar(false), 250);
    };
    const onWake = () => {
      setAsleep(false);
      setAjar(true);
      t = setTimeout(() => setAjar(false), 1200);
    };
    window.addEventListener("pet:sleep", onSleep);
    window.addEventListener("pet:entered", onEntered);
    window.addEventListener("pet:wake", onWake);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pet:sleep", onSleep);
      window.removeEventListener("pet:entered", onEntered);
      window.removeEventListener("pet:wake", onWake);
    };
  }, []);

  const cancelHold = () => {
    cancelAnimationFrame(holdRaf.current);
    holdStart.current = 0;
    setHold(0);
  };

  const onDown = (e) => {
    if (intro) return;
    e.preventDefault();
    pressStartedAsleep.current = asleepRef.current;
    if (asleepRef.current || pet.mode !== "active") return;
    holdStart.current = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - holdStart.current) / HOLD_MS);
      setHold(p);
      if (p >= 1) {
        holdStart.current = 0;
        setHold(0);
        // the release of this very press must not count as a wake-up click
        ignoreUntil.current = performance.now() + CLICK_COOLDOWN_MS * 2;
        const d = doorOf(root.current);
        sleepAt(d.x, d.y);
        return;
      }
      holdRaf.current = requestAnimationFrame(tick);
    };
    holdRaf.current = requestAnimationFrame(tick);
  };

  const onUp = () => {
    cancelHold();
    if (intro) return;
    // wake only on a press that began while the ghost was already asleep
    if (pressStartedAsleep.current && asleepRef.current && performance.now() > ignoreUntil.current) {
      const d = doorOf(root.current);
      wake(d.x, d.y);
    }
    pressStartedAsleep.current = false;
  };

  useEffect(() => () => cancelAnimationFrame(holdRaf.current), []);

  const doorOpen = open || ajar;
  const lit = asleep && !doorOpen;

  return (
    <div
      ref={root}
      role={intro ? undefined : "button"}
      aria-label={intro ? undefined : asleep ? "Wake the ghost" : "Hold to put the ghost to bed"}
      data-cursor
      data-cursor-label={intro ? undefined : asleep ? "Wake up" : "Hold 3s"}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      className={cn("relative grid h-28 w-28 select-none place-items-center", !intro && "cursor-pointer", className)}
    >
      {/* ambient glow (brighter while someone is home) */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at 50% 60%, rgba(167,139,250,.35), rgba(236,72,153,.12) 45%, transparent 70%)",
          opacity: lit ? 1 : 0.55,
        }}
      />

      {/* hold progress ring */}
      <svg className="absolute inset-0" viewBox="0 0 144 144" aria-hidden>
        <circle
          cx="72"
          cy="72"
          r="66"
          fill="none"
          stroke="url(#house-ring)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 66}
          strokeDashoffset={2 * Math.PI * 66 * (1 - hold)}
          transform="rotate(-90 72 72)"
          style={{ opacity: hold > 0 ? 1 : 0, transition: "opacity .2s" }}
        />
        <defs>
          <linearGradient id="house-ring" x1="0" x2="1">
            <stop offset="0" stopColor="#c4b5fd" />
            <stop offset="1" stopColor="#f9a8d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* the cottage */}
      <svg width="96" height="96" viewBox="0 0 120 120" className="relative" aria-hidden>
        <defs>
          <linearGradient id="h-cap" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#f5d0fe" />
            <stop offset="0.45" stopColor="#d8b4fe" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="h-cap-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6d28d9" stopOpacity="0" />
            <stop offset="1" stopColor="#4c1d95" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="h-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fdf4ff" />
            <stop offset="1" stopColor="#e9d5ff" />
          </linearGradient>
          <linearGradient id="h-door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#4c1d95" />
          </linearGradient>
          <radialGradient id="h-window" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#fffbeb" />
            <stop offset="0.6" stopColor="#fde68a" />
            <stop offset="1" stopColor="#f59e0b" />
          </radialGradient>
          <radialGradient id="h-window-dark" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#3b2a75" />
            <stop offset="1" stopColor="#1e1540" />
          </radialGradient>
          <radialGradient id="h-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="60" cy="106" rx="40" ry="5" fill="#000" opacity="0.35" />
        {/* grass tufts */}
        <path d="M18 104q4-8 8 0M94 104q4-8 8 0M30 106q3-6 6 0" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />

        {/* bushes */}
        <circle cx="26" cy="96" r="9" fill="#5b21b6" />
        <circle cx="18" cy="100" r="6" fill="#6d28d9" />
        <circle cx="94" cy="96" r="9" fill="#5b21b6" />
        <circle cx="102" cy="100" r="6" fill="#6d28d9" />
        <g fill="#f9a8d4">
          <circle cx="23" cy="92" r="1.6" />
          <circle cx="30" cy="97" r="1.4" />
          <circle cx="91" cy="92" r="1.6" />
          <circle cx="98" cy="98" r="1.4" />
        </g>

        {/* wall */}
        <path d="M30 60h60v34a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" fill="url(#h-wall)" />
        <path d="M30 60h60v34a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" fill="#7c3aed" opacity="0.08" />
        <path d="M30 92h60v2a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" fill="#c4b5fd" opacity="0.55" />

        {/* round windows (lit when the ghost is home) */}
        {[38, 82].map((cx) => (
          <g key={cx}>
            {lit && <circle cx={cx} cy="74" r="12" fill="#fbbf24" opacity="0.22" />}
            <circle cx={cx} cy="74" r="6.5" fill={lit ? "url(#h-window)" : "url(#h-window-dark)"} stroke="#7c3aed" strokeWidth="2" />
            <path d={`M${cx - 6.5} 74h13M${cx} 67.5v13`} stroke="#7c3aed" strokeWidth="1.4" />
            <circle cx={cx} cy="74" r="6.5" fill="none" stroke="#ede9fe" strokeWidth="0.8" opacity="0.6" />
          </g>
        ))}

        {/* door frame + dark interior */}
        <path d="M48 102V80a12 12 0 0 1 24 0v22z" fill="#ede9fe" />
        <path d="M50 102V80a10 10 0 0 1 20 0v22z" fill="#0b0820" />
        {/* door leaf – swings on its left hinge */}
        <motion.g style={{ transformOrigin: "50px 90px" }} animate={{ scaleX: doorOpen ? 0.1 : 1 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
          <path d="M50 102V80a10 10 0 0 1 20 0v22z" fill="url(#h-door)" />
          <path d="M53 100V81a7 7 0 0 1 14 0v19z" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
          {/* heart window */}
          <path d="M60 86.5c-1.3-2.6-5-1.9-5 .7 0 2.2 3.2 4 5 5.8 1.8-1.8 5-3.6 5-5.8 0-2.6-3.7-3.3-5-.7z" fill={lit ? "#fde68a" : "#c4b5fd"} opacity="0.9" />
          <circle cx="66.5" cy="94" r="1.4" fill="#fde68a" />
        </motion.g>

        {/* stepping stones */}
        <ellipse cx="60" cy="105" rx="7" ry="2.2" fill="#c4b5fd" opacity="0.5" />
        <ellipse cx="60" cy="110" rx="5" ry="1.8" fill="#c4b5fd" opacity="0.3" />

        {/* mushroom cap */}
        <path d="M60 14C32 14 12 32 12 54c0 4 3 7 7 7h82c4 0 7-3 7-7 0-22-20-40-48-40z" fill="url(#h-cap)" />
        <path d="M60 14C32 14 12 32 12 54c0 4 3 7 7 7h82c4 0 7-3 7-7 0-22-20-40-48-40z" fill="url(#h-cap-shade)" />
        {/* scalloped rim */}
        <path d="M12 56q6 7 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0" fill="none" stroke="#ede9fe" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        {/* polka dots */}
        <g fill="#fdf4ff" opacity="0.9">
          <circle cx="40" cy="36" r="5" />
          <circle cx="64" cy="26" r="3.6" />
          <circle cx="82" cy="42" r="4.4" />
          <circle cx="56" cy="48" r="2.6" />
        </g>
        {/* cap highlight */}
        <path d="M30 32q12-12 30-13" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />

        {/* chimney */}
        <path d="M80 22h9v12h-9z" fill="#6d28d9" />
        <rect x="78" y="19" width="13" height="5" rx="2" fill="#a78bfa" />
        {lit && (
          <g fill="#e9d5ff">
            <motion.circle cx="84" cy="16" r="2.6" opacity="0.7" animate={{ y: [0, -14], x: [0, 3], opacity: [0.7, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }} />
            <motion.circle cx="86" cy="17" r="1.8" opacity="0.6" animate={{ y: [0, -14], x: [0, -2], opacity: [0.6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1.3 }} />
          </g>
        )}

        {/* lantern by the door */}
        <rect x="78" y="86" width="1.6" height="14" fill="#a78bfa" />
        <circle cx="78.8" cy="86" r="7" fill="url(#h-lamp)" opacity={lit ? 0.9 : 0.6} />
        <rect x="76" y="82" width="5.6" height="7" rx="1.5" fill="#fde68a" stroke="#7c3aed" strokeWidth="1" />
        <path d="M76 82h5.6l-1-2h-3.6z" fill="#7c3aed" />

        {/* sparkles while sleeping */}
        {lit && (
          <g fill="#fdf4ff">
            <motion.path d="M22 40l1.5 3.5 3.5 1.5-3.5 1.5L22 50l-1.5-3.5L17 45l3.5-1.5z" animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity }} style={{ transformOrigin: "22px 45px" }} />
            <motion.path d="M102 30l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }} transition={{ duration: 2.6, repeat: Infinity, delay: 0.9 }} style={{ transformOrigin: "102px 34px" }} />
          </g>
        )}
      </svg>

      {/* zzz */}
      <AnimatePresence>
        {lit && (
          <motion.span
            key="zzz"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -right-1 top-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-widest text-[#1e1b4b] shadow-[0_6px_18px_-6px_rgba(0,0,0,.5)]"
          >
            {["z", "z", "z"].map((z, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
              >
                {z}
              </motion.span>
            ))}
            <span className="absolute -bottom-1 left-2 h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});
PetHouse.displayName = "PetHouse";

/** viewport coordinates of the door opening */
function doorOf(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.74 };
}

export default PetHouse;
