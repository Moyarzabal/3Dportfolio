import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import RenderLoop from "./RenderLoop";

const Stars = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(1800 * 3), { radius: 1.3 }));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    ref.current.rotation.x -= dt / 12;
    ref.current.rotation.y -= dt / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#f0abfc" size={0.0028} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

/** Drifting star-field background. Only renders frames while on screen. */
const StarsCanvas = () => {
  const wrap = useRef(null);
  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} frameloop="demand" gl={{ alpha: true, antialias: false }}>
        <RenderLoop targetRef={wrap} margin={200} />
        <Stars />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
