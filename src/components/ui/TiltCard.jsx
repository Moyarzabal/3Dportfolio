import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

/**
 * Card with pointer-tracking spotlight + subtle 3D tilt.
 * Spotlight is pure CSS (vars --mx/--my); tilt uses spring-smoothed motion values.
 */
const TiltCard = ({ children, className, maxTilt = 7, scale = 1.015, as = "div", ...rest }) => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);
  const s = useSpring(1, spring);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (enabled) {
      px.set(x);
      py.set(y);
    }
  };
  const onEnter = () => enabled && s.set(scale);
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    s.set(1);
  };

  const Comp = motion[as] ?? motion.div;

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={
        enabled
          ? { rotateX, rotateY, scale: s, transformStyle: "preserve-3d", transformPerspective: 1100 }
          : undefined
      }
      className={cn("card spotlight will-change-transform", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default TiltCard;
