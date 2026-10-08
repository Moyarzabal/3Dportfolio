import { useCallback, useEffect, useRef, useState } from "react";
import Snack from "./Snack";
import { pet } from "@/lib/pet";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

const MAX_ALIVE = 4; // steady-state population
const SPAWN_EVERY_MS = 9000; // one new snack roughly this often while below MAX_ALIVE
const LIFETIME_MS = [28000, 42000]; // each snack fades away after this long
const INITIAL = 5; // first wave once the ghost is out
const WAKE_WAVE = 9; // big wave when the ghost comes back out of the house

/**
 * Scatters star candies over the page. They appear now and then, linger for a
 * while and fade away, so there is always something for the ghost to find.
 * Must live inside a `position: relative` wrapper that spans the page (main).
 */
const SnackField = () => {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const [snacks, setSnacks] = useState([]);
  const nextId = useRef(1);
  const alive = useRef(0);

  // random spot on the page, away from the edges and below the hero's first screen
  const spot = useCallback(() => {
    const host = document.querySelector("main");
    const h = host?.offsetHeight ?? document.body.scrollHeight;
    const w = window.innerWidth;
    return {
      x: 40 + Math.random() * Math.max(80, w - 120),
      y: window.innerHeight * 0.95 + Math.random() * Math.max(200, h - window.innerHeight * 0.95 - 240),
    };
  }, []);

  const spawn = useCallback(
    (n = 1) => {
      setSnacks((cur) => {
        const add = [];
        for (let i = 0; i < n; i++) {
          const id = nextId.current++;
          add.push({ id, ...spot(), expires: Date.now() + LIFETIME_MS[0] + Math.random() * (LIFETIME_MS[1] - LIFETIME_MS[0]) });
        }
        return [...cur, ...add];
      });
    },
    [spot]
  );

  const remove = useCallback((id) => setSnacks((cur) => cur.filter((s) => s.id !== id)), []);

  useEffect(() => {
    alive.current = snacks.filter((s) => !s.dead).length;
  }, [snacks]);

  useEffect(() => {
    if (!fine || reduce) return undefined;

    let seeded = false;
    const seed = () => {
      if (seeded) return;
      seeded = true;
      // wait a beat so the ghost is out before the first wave appears
      setTimeout(() => spawn(INITIAL), 1200);
    };
    const onWake = () => {
      setSnacks([]);
      setTimeout(() => spawn(WAKE_WAVE), 900);
    };
    const onEntered = () => setSnacks([]);
    // the ghost's first appearance (intro) also counts as "being out"
    const onEmerge = () => (seeded ? spawn(1) : seed());

    if (pet.mode === "active") seed();
    window.addEventListener("pet:emerge", onEmerge);
    window.addEventListener("pet:wake", onWake);
    window.addEventListener("pet:entered", onEntered);

    // steady trickle + expiry sweep
    const trickle = setInterval(() => {
      if (document.visibilityState !== "visible" || pet.asleep || pet.mode === "hidden") return;
      if (alive.current < MAX_ALIVE && Math.random() < 0.75) spawn(1);
    }, SPAWN_EVERY_MS);
    const sweep = setInterval(() => {
      const now = Date.now();
      setSnacks((cur) =>
        cur.some((s) => !s.dead && s.expires < now) ? cur.map((s) => (s.expires < now ? { ...s, dead: true } : s)) : cur
      );
    }, 1000);

    return () => {
      clearInterval(trickle);
      clearInterval(sweep);
      window.removeEventListener("pet:emerge", onEmerge);
      window.removeEventListener("pet:wake", onWake);
      window.removeEventListener("pet:entered", onEntered);
    };
  }, [fine, reduce, spawn]);

  if (!fine || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {snacks.map((s) => (
        <Snack
          key={s.id}
          id={s.id}
          className="pointer-events-auto"
          style={{ left: s.x - 24, top: s.y - 24 }}
          dead={s.dead}
          onGone={() => remove(s.id)}
        />
      ))}
    </div>
  );
};

export default SnackField;
