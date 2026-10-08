import { useEffect, useState } from "react";

function useMatch(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMatch("(max-width: 767px)");
export const useIsDesktop = () => useMatch("(min-width: 1024px)");
export const useFinePointer = () => useMatch("(pointer: fine)");
export const usePrefersReducedMotion = () => useMatch("(prefers-reduced-motion: reduce)");
