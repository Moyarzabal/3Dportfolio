/**
 * Shared state for the cursor companion. Plain object so the cursor's rAF
 * loop, the snacks and the house can talk without React re-renders.
 *
 * Events (window):
 *   pet:emerge  {x,y}  – come out of the house at (x,y) and fly to the pointer
 *   pet:sleep   {x,y}  – fly into the house door at (x,y)
 *   pet:entered        – the ghost is inside; the house may show "zzz"
 *   pet:wake    {x,y}  – reset size and come back out
 *   pet:eat     {color} – a snack was eaten
 */
const KEY_LEVEL = "pet-level";
const KEY_SLEEP = "pet-asleep";
export const MAX_LEVEL = 12;

const read = (k) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* private mode etc. */
  }
};
const emit = (name, detail = {}) => window.dispatchEvent(new CustomEvent(name, { detail }));

export const pet = {
  x: 0,
  y: 0,
  level: Math.min(MAX_LEVEL, parseInt(read(KEY_LEVEL) ?? "0", 10) || 0),
  asleep: read(KEY_SLEEP) === "1",
  /** hidden | emerging | active | flyingIn */
  mode: "hidden",
};

/** How big the ghost is for a given level (1 → 2.8). */
export const petScale = (level) => 1 + Math.min(level, MAX_LEVEL) * 0.15;

export function feed({ color } = {}) {
  pet.level = Math.min(MAX_LEVEL, pet.level + 1);
  write(KEY_LEVEL, String(pet.level));
  emit("pet:eat", { color });
}

export function emerge(x, y) {
  emit("pet:emerge", { x, y });
}

export function sleepAt(x, y) {
  emit("pet:sleep", { x, y });
}

export function entered() {
  pet.asleep = true;
  write(KEY_SLEEP, "1");
  emit("pet:entered");
}

export function wake(x, y) {
  pet.asleep = false;
  pet.level = 0;
  write(KEY_SLEEP, "0");
  write(KEY_LEVEL, "0");
  emit("pet:wake", { x, y });
}
