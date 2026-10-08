import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { feed, pet } from "@/lib/pet";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";

const FLAVOURS = [
  { a: "#fbcfe8", b: "#f472b6" },
  { a: "#cffafe", b: "#22d3ee" },
  { a: "#fef3c7", b: "#fbbf24" },
  { a: "#ddd6fe", b: "#a78bfa" },
  { a: "#d1fae5", b: "#34d399" },
];

// 8-point konpeito star
const STAR =
  "M20 2l3.2 9.6 9.2-4.6-4.6 9.2L37.4 20l-9.6 3.2 4.6 9.2-9.2-4.6L20 37.4l-3.2-9.6-9.2 4.6 4.6-9.2L2.6 20l9.6-3.2-4.6-9.2 9.2 4.6z";

/**
 * A glowing star candy. Brush the pointer over it and it flies into the
 * ghost's mouth, which then reacts and grows a little.
 * Only rendered where the cursor companion exists (fine pointer).
 */
const Snack = ({ id, className, style }) => {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  const [flight, setFlight] = useState(null); // {dx, dy} once eaten
  const flavour = FLAVOURS[id % FLAVOURS.length];

  if (!fine || reduce) return null;

  const onEnter = () => {
    if (flight || !ref.current || pet.mode !== "active") return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // fly toward where the ghost's mouth is right now
    setFlight({ dx: pet.x - cx, dy: pet.y + 6 - cy, color: flavour.b });
  };

  return (
    <AnimatePresence>
      {!flight ? (
        <motion.div
          key="snack"
          ref={ref}
          onPointerEnter={onEnter}
          data-cursor
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate: [0, 12, 0] }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: { duration: 3 + (id % 3) * 0.6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5 + (id % 2), repeat: Infinity, ease: "easeInOut" },
          }}
          className={cn("absolute z-20 grid h-12 w-12 place-items-center", className)}
          style={style}
        >
          <span className="absolute h-8 w-8 rounded-full opacity-60 blur-lg" style={{ background: flavour.b }} />
          <svg width="30" height="30" viewBox="0 0 40 40" className="relative drop-shadow-[0_0_6px_rgba(255,255,255,.6)]">
            <defs>
              <radialGradient id={`snack-${id}`} cx="40%" cy="35%" r="70%">
                <stop offset="0" stopColor="#fff" />
                <stop offset="0.35" stopColor={flavour.a} />
                <stop offset="1" stopColor={flavour.b} />
              </radialGradient>
            </defs>
            <path d={STAR} fill={`url(#snack-${id})`} />
            <circle cx="15" cy="14" r="2.2" fill="#fff" opacity="0.9" />
          </svg>
        </motion.div>
      ) : (
        <motion.div
          key="flight"
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x: flight.dx, y: flight.dy, scale: 0.2, opacity: 0.9, rotate: 360 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.6, 1] }}
          onAnimationComplete={() => feed({ color: flight.color })}
          className={cn("pointer-events-none absolute z-20 grid h-12 w-12 place-items-center", className)}
          style={style}
        >
          <svg width="30" height="30" viewBox="0 0 40 40">
            <path d={STAR} fill={flavour.b} />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snack;
