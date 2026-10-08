let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

/** Scroll to an element / selector / number. Falls back to native scrolling. */
export function scrollTo(target, options = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (lenisInstance) {
    lenisInstance.scrollTo(el ?? target, { offset: -72, duration: 1.4, ...options });
    return;
  }
  if (el instanceof Element) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function stopScroll() {
  lenisInstance?.stop();
}
export function startScroll() {
  lenisInstance?.start();
}

