import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";

import { Room } from "./Room";
import Particles from "./Particles";
import RenderLoop from "@/components/canvas/RenderLoop";
import { useIsMobile, useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

/**
 * Rotates its children toward the pointer (tracked on the whole window),
 * and plays a soft "rise in" intro once `ready` flips to true.
 */
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const lerp = (a, b, t) => a + (b - a) * t;
const INTRO_MS = 1600;

function Rig({ children, ready, isMobile }) {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const startedAt = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (ready && startedAt.current === null) startedAt.current = performance.now();
  }, [ready]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.1);
    const targetScale = isMobile ? 1.6 : 1.7;
    const targetY = isMobile ? -2.6 : -3.2;

    // intro is driven by wall-clock time so it looks identical at any frame rate
    const t = startedAt.current === null ? 0 : easeOutExpo((performance.now() - startedAt.current) / INTRO_MS);
    const sc = lerp(0.2, targetScale, t);
    g.scale.set(sc, sc, sc);
    g.position.y = lerp(-6, targetY, t);

    easing.dampE(
      g.rotation,
      [pointer.current.y * 0.06, -Math.PI / 4 + pointer.current.x * 0.22, 0],
      0.6,
      dt
    );
  });

  return (
    <group ref={group} scale={0.2} position={[0, -6, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {children}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#3b2f73" />
      <spotLight position={[2, 6, 6]} angle={0.22} penumbra={0.4} intensity={90} color="#ffffff" />
      <spotLight position={[-4, 5, 5]} angle={0.45} penumbra={1} intensity={55} color="#9d4edd" />
      <pointLight position={[3, 2, -2]} intensity={14} color="#4cc9f0" />
      <pointLight position={[0, 1, 0]} intensity={6} color="#7209b7" />
    </>
  );
}

/**
 * @param {object}  containerRef  element whose visibility gates the render loop
 * @param {boolean} ready         preloader finished → play intro
 */
const HeroExperience = ({ containerRef, ready = true }) => {
  const isMobile = useIsMobile();
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const bloom = !isMobile && !reduce;

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, isMobile ? 1.25 : 1.5]}
      frameloop="demand"
      gl={{ antialias: !bloom, alpha: false, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => gl.setClearColor("#000000", 1)}
      style={{ touchAction: "pan-y" }}
    >
      <RenderLoop targetRef={containerRef} />
      <Lights />

      {fine && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
          autoRotate={!reduce}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />
      )}

      <Suspense fallback={null}>
        <Particles count={isMobile ? 40 : 90} />
        <Rig ready={ready} isMobile={isMobile}>
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.05, 0.05]}>
            <Room />
          </Float>
        </Rig>
      </Suspense>

      {bloom && (
        <EffectComposer multisampling={2} resolutionScale={0.6}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.25} radius={0.65} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default HeroExperience;
