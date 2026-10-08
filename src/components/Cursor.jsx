import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import { pet as petState, petScale, entered } from "@/lib/pet";

/**
 * Custom cursor for fine pointers:
 *  - a tiny dot sits exactly under the pointer (for precision)
 *  - a little ghost companion floats behind it, eyes tracking the pointer,
 *    stretching when you move fast, squashing on click, blinking now and then,
 *    speaking a word when you hover something that has `data-cursor-label`,
 *    celebrating snacks, and flying in and out of its house.
 * Everything runs in one rAF loop; no React state updates per frame.
 *
 * Modes (petState.mode): hidden → emerging → active → flyingIn → hidden
 */
const Cursor = () => {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const dot = useRef(null);
  const pet = useRef(null);
  const body = useRef(null);
  const eyeL = useRef(null);
  const eyeR = useRef(null);
  const lids = useRef(null);
  const bubble = useRef(null);

  useEffect(() => {
    if (!fine || reduce) return undefined;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const petPos = { x: pos.x + 40, y: pos.y + 40 };
    const vel = { x: 0, y: 0 };
    const flyTarget = { x: 0, y: 0 };
    let dotVisible = false;
    let pressed = false;
    let hovering = false;
    let raf = 0;
    let idleT = 0;
    let frame = 0;
    let happyUntil = 0;
    let popScale = 1; // brief pop when growing
    let flyScale = 1; // 0 → 1 while emerging, 1 → 0 while entering the house
    const YUM = ["Yum!", "Mmm~", "おいしい!", "More!", "Thanks!"];
    const OFFSET = { x: 22, y: 26 };

    petState.mode = "hidden";

    const setMode = (m) => {
      petState.mode = m;
      pet.current.dataset.mode = m;
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!dotVisible) {
        dotVisible = true;
        dot.current.style.opacity = "1";
      }
      const target = e.target.closest?.("a, button, [data-cursor], input, textarea, label, [role='button']");
      hovering = Boolean(target);
      // while celebrating a snack, keep the happy face and the "Yum!" bubble
      if (happyUntil && performance.now() < happyUntil) return;
      if (petState.mode === "flyingIn") return;
      const label = target?.getAttribute?.("data-cursor-label") ?? "";
      bubble.current.textContent = label || (hovering ? "!" : "");
      pet.current.dataset.state = label ? "label" : hovering ? "hover" : "idle";
    };
    const onLeave = () => {
      dotVisible = false;
      dot.current.style.opacity = "0";
    };
    const onDown = () => {
      pressed = true;
      pet.current.dataset.pressed = "true";
    };
    const onUp = () => {
      pressed = false;
      delete pet.current.dataset.pressed;
    };
    const sparkle = (count, power, color, rings = true) =>
      window.dispatchEvent(new CustomEvent("fx:burst", { detail: { x: petPos.x, y: petPos.y, color, count, power, rings } }));

    const onEat = (e) => {
      if (petState.mode !== "active") return;
      happyUntil = performance.now() + 1600;
      popScale = 1.35;
      pet.current.dataset.state = "happy";
      bubble.current.textContent = YUM[(Math.random() * YUM.length) | 0];
      sparkle(28, 4.5, e.detail?.color ?? "#f9a8d4");
    };
    // come out of the house (intro, or after being woken up)
    const onEmerge = (e) => {
      petPos.x = e.detail.x;
      petPos.y = e.detail.y;
      flyScale = 0.05;
      happyUntil = 0;
      bubble.current.textContent = "";
      pet.current.dataset.state = "idle";
      pet.current.style.opacity = "1";
      setMode("emerging");
      sparkle(18, 3, "#c4b5fd", false);
    };
    // fly into the house
    const onSleep = (e) => {
      if (petState.mode !== "active") return;
      flyTarget.x = e.detail.x;
      flyTarget.y = e.detail.y;
      happyUntil = 0;
      bubble.current.textContent = "zzz";
      pet.current.dataset.state = "label";
      setMode("flyingIn");
    };

    // blink every few seconds
    let blinkTimer;
    const blink = () => {
      lids.current.style.transform = "scaleY(1)";
      setTimeout(() => (lids.current.style.transform = "scaleY(0)"), 110);
      blinkTimer = setTimeout(blink, 2200 + Math.random() * 2600);
    };
    blinkTimer = setTimeout(blink, 1500);

    const loop = () => {
      frame++;
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;

      const mode = petState.mode;
      if (mode === "hidden") {
        raf = requestAnimationFrame(loop);
        return;
      }

      // where is the ghost heading?
      let tx = pos.x + OFFSET.x;
      let ty = pos.y + OFFSET.y;
      let ease = 0.11;
      if (mode === "flyingIn") {
        tx = flyTarget.x;
        ty = flyTarget.y;
        ease = 0.085;
      } else if (mode === "emerging") {
        ease = 0.075;
      }
      const nx = petPos.x + (tx - petPos.x) * ease;
      const ny = petPos.y + (ty - petPos.y) * ease;
      vel.x = nx - petPos.x;
      vel.y = ny - petPos.y;
      petPos.x = nx;
      petPos.y = ny;
      petState.x = petPos.x;
      petState.y = petPos.y;
      const dist = Math.hypot(tx - petPos.x, ty - petPos.y);

      if (mode === "flyingIn") {
        // shrink as it reaches the door, leave a sparkle trail, then vanish inside
        flyScale += (Math.max(0.08, Math.min(1, dist / 140)) - flyScale) * 0.15;
        if (frame % 3 === 0) sparkle(2, 1.6, "#c4b5fd", false);
        if (dist < 6) {
          pet.current.style.opacity = "0";
          bubble.current.textContent = "";
          setMode("hidden");
          sparkle(16, 3, "#fde68a");
          entered();
        }
      } else if (mode === "emerging") {
        flyScale += (1 - flyScale) * 0.07;
        if (frame % 3 === 0) sparkle(2, 1.6, "#f9a8d4", false);
        if (dist < 12 && flyScale > 0.96) {
          flyScale = 1;
          setMode("active");
        }
      }

      if (happyUntil && performance.now() > happyUntil) {
        happyUntil = 0;
        if (pet.current.dataset.state === "happy") pet.current.dataset.state = hovering ? "hover" : "idle";
        if (!hovering) bubble.current.textContent = "";
      }
      popScale += (1 - popScale) * 0.08;
      const grow = petScale(petState.level) * popScale * flyScale;

      const speed = Math.hypot(vel.x, vel.y);
      const angle = Math.atan2(vel.y, vel.x);
      const stretch = Math.min(speed * 0.028, 0.45);
      const sx = pressed && mode === "active" ? 1.25 : 1 + stretch;
      const sy = pressed && mode === "active" ? 0.75 : 1 - stretch * 0.55;
      idleT += 0.03;
      const bob = Math.sin(idleT) * 2;
      const tilt = Math.max(-18, Math.min(18, vel.x * 1.6));

      pet.current.style.transform = `translate3d(${petPos.x}px, ${petPos.y + bob}px, 0) translate(-50%, -50%)`;
      pet.current.dataset.side = petPos.x > window.innerWidth - 150 ? "left" : "right";
      pet.current.style.setProperty("--pet-grow", grow.toFixed(2));
      body.current.style.transform = `rotate(${tilt}deg) rotate(${(angle * 180) / Math.PI}deg) scale(${sx * grow}, ${sy * grow}) rotate(${(-angle * 180) / Math.PI}deg)`;

      // eyes look toward the pointer (or the door while flying home)
      const dx = tx - petPos.x;
      const dy = ty - petPos.y;
      const d = Math.hypot(dx, dy) || 1;
      const ex = (dx / d) * 2.2;
      const ey = (dy / d) * 2.2;
      eyeL.current.style.transform = `translate(${ex}px, ${ey}px)`;
      eyeR.current.style.transform = `translate(${ex}px, ${ey}px)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("blur", onUp);
    window.addEventListener("pet:eat", onEat);
    window.addEventListener("pet:emerge", onEmerge);
    window.addEventListener("pet:wake", onEmerge);
    window.addEventListener("pet:sleep", onSleep);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      html.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      clearTimeout(blinkTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
      window.removeEventListener("pet:eat", onEat);
      window.removeEventListener("pet:emerge", onEmerge);
      window.removeEventListener("pet:wake", onEmerge);
      window.removeEventListener("pet:sleep", onSleep);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white opacity-0 shadow-[0_0_8px_2px_rgba(255,255,255,.5)] transition-opacity duration-300"
      />
      <div
        ref={pet}
        aria-hidden
        data-state="idle"
        data-mode="hidden"
        className="cursor-pet pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-300"
      >
        <span ref={bubble} className="cursor-bubble" />
        <div className="cursor-jump">
          <span aria-hidden className="cursor-glow" />
          <svg ref={body} width="44" height="48" viewBox="0 0 44 48" className="cursor-body">
            <defs>
              <linearGradient id="pet-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ede9fe" />
                <stop offset="0.55" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#f0abfc" />
              </linearGradient>
            </defs>
            {/* ghost body with a wavy hem */}
            <path
              d="M22 4c-9.4 0-16 7-16 16v17.5c0 1.6 1.9 2.4 3 1.3l2.6-2.6c.6-.6 1.6-.6 2.2 0l2.6 2.6c.6.6 1.6.6 2.2 0l2.6-2.6c.6-.6 1.6-.6 2.2 0l2.6 2.6c.6.6 1.6.6 2.2 0l2.6-2.6c.6-.6 1.6-.6 2.2 0l2.6 2.6c1.1 1.1 3 .3 3-1.3V20c0-9-6.6-16-16-16z"
              fill="url(#pet-fill)"
              opacity="0.95"
            />
            {/* cheeks */}
            <circle cx="10.5" cy="25" r="2.4" fill="#f472b6" opacity="0.45" />
            <circle cx="33.5" cy="25" r="2.4" fill="#f472b6" opacity="0.45" />
            {/* eyes */}
            <g className="cursor-eyes">
              <circle cx="15.5" cy="20" r="4" fill="#fff" />
              <circle cx="28.5" cy="20" r="4" fill="#fff" />
              <circle ref={eyeL} cx="15.5" cy="20" r="2" fill="#1e1b4b" />
              <circle ref={eyeR} cx="28.5" cy="20" r="2" fill="#1e1b4b" />
              <g ref={lids} className="cursor-lids" style={{ transform: "scaleY(0)", transformOrigin: "22px 20px" }}>
                <rect x="10.5" y="15" width="10" height="10" rx="5" fill="#c4b5fd" />
                <rect x="23.5" y="15" width="10" height="10" rx="5" fill="#c4b5fd" />
              </g>
            </g>
            {/* happy eyes (^ ^) shown while eating */}
            <g className="cursor-eyes-happy" stroke="#1e1b4b" strokeWidth="1.8" strokeLinecap="round" fill="none">
              <path d="M11.5 21q4-5.5 8 0" />
              <path d="M24.5 21q4-5.5 8 0" />
            </g>
            {/* mouth */}
            <path className="cursor-mouth" d="M19 28q3 2.4 6 0" stroke="#1e1b4b" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            {/* hearts while happy */}
            <g className="cursor-hearts" fill="#f472b6">
              <path d="M6 10c0-1.6 2.4-2.2 3-.6.6-1.6 3-1 3 .6 0 1.5-3 3.6-3 3.6S6 11.5 6 10z" />
              <path d="M33 6c0-1.3 1.9-1.8 2.4-.5.5-1.3 2.4-.8 2.4.5 0 1.2-2.4 2.9-2.4 2.9S33 7.2 33 6z" />
            </g>
          </svg>
        </div>
      </div>
      <style>{`
        .cursor-pet { will-change: transform; }
        .cursor-jump { position: relative; }
        .cursor-glow { position:absolute; left:50%; top:55%; width:34px; height:34px; border-radius:50%;
          background: radial-gradient(circle, rgba(196,181,253,.55), rgba(240,171,252,.25) 55%, transparent 72%);
          transform: translate(-50%,-50%) scale(var(--pet-grow, 1)); filter: blur(6px); will-change: transform; }
        .cursor-body { display:block; transform-origin: 50% 60%; }
        .cursor-eyes circle { transition: r .25s cubic-bezier(.16,1,.3,1); }
        .cursor-lids rect { transform-box: fill-box; }
        .cursor-lids { transition: transform .08s ease-out; }
        .cursor-mouth { transition: d .3s; }
        .cursor-pet[data-state="hover"] .cursor-eyes circle[fill="#fff"] { r: 5; }
        .cursor-pet[data-state="hover"] .cursor-mouth,
        .cursor-pet[data-state="label"] .cursor-mouth { d: path("M18 27q4 5 8 0"); }
        .cursor-pet[data-state="label"] .cursor-eyes circle[fill="#fff"] { r: 5; }
        .cursor-eyes-happy, .cursor-hearts { opacity: 0; transition: opacity .15s; }
        .cursor-pet[data-state="happy"] .cursor-eyes { opacity: 0; }
        .cursor-pet[data-state="happy"] .cursor-eyes-happy { opacity: 1; }
        .cursor-pet[data-state="happy"] .cursor-hearts { opacity: 1; animation: petHearts 1.3s ease-out; }
        .cursor-pet[data-state="happy"] .cursor-mouth { d: path("M18.5 27a3.5 3 0 1 0 7 0z"); }
        .cursor-pet[data-state="happy"] .cursor-bubble { opacity: 1; transform: translateY(0) scale(1); }
        .cursor-pet[data-state="happy"] .cursor-jump { animation: petJump .9s cubic-bezier(.34,1.56,.64,1); }
        /* sleepy face on the way home */
        .cursor-pet[data-mode="flyingIn"] .cursor-eyes { opacity: 0; }
        .cursor-pet[data-mode="flyingIn"] .cursor-eyes-happy { opacity: 1; }
        .cursor-pet[data-mode="flyingIn"] .cursor-mouth { d: path("M19.5 28.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"); }
        @keyframes petJump {
          0% { transform: translateY(0) rotate(0); }
          30% { transform: translateY(-22px) rotate(-10deg); }
          55% { transform: translateY(0) rotate(0); }
          70% { transform: translateY(-10px) rotate(8deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        @keyframes petHearts {
          0% { transform: translateY(4px) scale(.6); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(-14px) scale(1.2); opacity: 0; }
        }
        .cursor-pet[data-pressed="true"] .cursor-mouth { d: path("M19.5 28.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"); }
        .cursor-bubble {
          /* the body scales around (22px, 28.8px); keep the bubble just past its top-right corner */
          position:absolute; white-space: nowrap;
          left: calc(16px + 22px * var(--pet-grow, 1));
          top: calc(30px - 29px * var(--pet-grow, 1));
          padding: 4px 9px; border-radius: 999px;
          font: 600 11px/1.2 "Mona Sans", system-ui, sans-serif; letter-spacing: .04em;
          color: #1e1b4b; background: #fff;
          box-shadow: 0 6px 18px -6px rgba(0,0,0,.5);
          opacity: 0; transform: translateY(6px) scale(.8); transform-origin: left bottom;
          transition: opacity .25s, transform .35s cubic-bezier(.16,1,.3,1);
        }
        .cursor-pet[data-side="left"] .cursor-bubble { left: auto; right: calc(16px + 22px * var(--pet-grow, 1)); transform-origin: right bottom; }
        .cursor-pet[data-side="left"] .cursor-bubble::after { left: auto; right: -3px; }
        .cursor-bubble::after {
          content:""; position:absolute; left: -3px; bottom: 4px; width: 8px; height: 8px;
          background:#fff; border-radius: 2px; transform: rotate(45deg);
        }
        .cursor-pet[data-state="label"] .cursor-bubble,
        .cursor-pet[data-state="hover"] .cursor-bubble { opacity: 1; transform: translateY(0) scale(1); }
      `}</style>
    </>
  );
};

export default Cursor;
