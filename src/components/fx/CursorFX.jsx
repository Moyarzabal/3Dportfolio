import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

const COLORS = ["#c4b5fd", "#f9a8d4", "#67e8f9", "#ffffff"];
const MAX_PARTICLES = 220;

/**
 * Full-screen 2D canvas drawn above the page:
 *  - sparks trail the pointer, more when it moves fast
 *  - every click sends out a shockwave ring + a burst of sparks
 *  - anything can request a burst via the `fx:burst` window event (unused for now)
 * The loop only runs while something is on screen.
 */
const CursorFX = () => {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    const particles = [];
    const rings = [];
    let raf = 0;
    let running = false;
    const last = { x: 0, y: 0, t: 0 };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];

    const spawn = (x, y, n, { speed = 2, spread = Math.PI * 2, dir = 0, size = 2, color, gravity = 0.04, decay = 0.025 } = {}) => {
      for (let i = 0; i < n; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const a = dir + (Math.random() - 0.5) * spread;
        const v = rand(speed * 0.3, speed);
        particles.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          decay: rand(decay * 0.7, decay * 1.4),
          size: rand(size * 0.5, size * 1.4),
          color: color ?? pick(COLORS),
          gravity,
        });
      }
      start();
    };

    const ring = (x, y, color = "#c4b5fd", max = 90) => {
      rings.push({ x, y, r: 4, max, life: 1, color });
      start();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.r += (r.max - r.r) * 0.12 + 1.5;
        r.life -= 0.035;
        if (r.life <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = r.life * 0.9;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2 * r.life + 0.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (particles.length || rings.length) raf = requestAnimationFrame(draw);
      else running = false;
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      if (!fine) return;
      const now = performance.now();
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, now - last.t);
      last.x = e.clientX;
      last.y = e.clientY;
      last.t = now;
      if (dist < 3 || dt > 200) return;
      const v = Math.min(dist / dt, 3); // px per ms, clamped
      const n = Math.min(5, Math.ceil(v * 2));
      spawn(e.clientX, e.clientY, n, {
        speed: 0.8 + v,
        dir: Math.atan2(-dy, -dx), // drift back along the path
        spread: 1.2,
        size: 1.4 + v,
        gravity: 0.015,
        decay: 0.03,
      });
    };

    const onDown = (e) => {
      ring(e.clientX, e.clientY);
      spawn(e.clientX, e.clientY, 26, { speed: 5, size: 2.4, gravity: 0.08, decay: 0.02 });
    };

    const onBurst = (e) => {
      const { x, y, color, count = 60, power = 7, rings: withRings = true } = e.detail;
      if (withRings) {
        ring(x, y, color ?? "#f9a8d4", 140);
        ring(x, y, color ?? "#67e8f9", 220);
      }
      spawn(x, y, count, { speed: power, size: 3, gravity: 0.1, decay: 0.014, color });
      spawn(x, y, count / 2, { speed: power * 0.5, size: 2, gravity: 0.03, decay: 0.012 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("fx:burst", onBurst);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("fx:burst", onBurst);
    };
  }, [fine, reduce]);

  if (reduce) return null;
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[95]" />;
};

export default CursorFX;
