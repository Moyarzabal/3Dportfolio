import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Drives a `frameloop="demand"` canvas at full frame rate only while the
 * element in `targetRef` is near the viewport and the tab is visible.
 * Checks geometry directly each frame, so it never waits on React state.
 */
const RenderLoop = ({ targetRef, margin = 120 }) => {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    let id;
    const tick = () => {
      id = requestAnimationFrame(tick);
      if (document.visibilityState !== "visible") return;
      const el = targetRef?.current ?? gl.domElement;
      const r = el.getBoundingClientRect();
      if (r.bottom < -margin || r.top > window.innerHeight + margin) return;
      invalidate();
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [targetRef, margin, invalidate, gl]);
  return null;
};

export default RenderLoop;
