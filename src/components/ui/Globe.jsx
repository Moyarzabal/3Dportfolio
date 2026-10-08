import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const TOKYO = [35.6762, 139.6503];

/**
 * Lightweight WebGL globe (cobe, ~5 kB). Only created while on screen,
 * draggable, auto-rotates and drifts back to Tokyo.
 */
const Globe = ({ className, markers = [{ location: TOKYO, size: 0.09 }] }) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { margin: "100px 0px" });
  const pointer = useRef({ down: null, delta: 0 });

  useEffect(() => {
    if (!inView || !canvasRef.current) return undefined;
    const canvas = canvasRef.current;
    let phi = 3.6;
    let width = canvas.offsetWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const onResize = () => (width = canvas.offsetWidth);
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: 5,
      baseColor: [0.22, 0.17, 0.45],
      markerColor: [0.98, 0.63, 0.86],
      glowColor: [0.33, 0.2, 0.75],
      markers,
      onRender: (state) => {
        if (pointer.current.down === null) phi += 0.0035;
        state.phi = phi + pointer.current.delta;
        state.width = width * dpr;
        state.height = width * dpr;
      },
    });
    requestAnimationFrame(() => (canvas.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [inView, markers]);

  const onDown = (x) => {
    pointer.current.down = x - pointer.current.delta * 200;
    canvasRef.current.style.cursor = "grabbing";
  };
  const onMove = (x) => {
    if (pointer.current.down !== null) pointer.current.delta = (x - pointer.current.down) / 200;
  };
  const onUp = () => {
    pointer.current.down = null;
    canvasRef.current.style.cursor = "grab";
  };

  return (
    <div ref={wrapRef} className={cn("relative aspect-square w-full", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        onPointerDown={(e) => onDown(e.clientX)}
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerUp={onUp}
        onPointerOut={onUp}
        onTouchMove={(e) => e.touches[0] && onMove(e.touches[0].clientX)}
      />
    </div>
  );
};

export default Globe;
