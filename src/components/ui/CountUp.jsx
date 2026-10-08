import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/** Animates 0 → value once when visible. Writes to the DOM directly (no re-renders). */
const CountUp = ({ value, suffix = "", duration = 1.8, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    const el = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
};

export default CountUp;
