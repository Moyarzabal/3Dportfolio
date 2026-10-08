import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Slowly drifting dust motes. One buffer, updated in place. */
const Particles = ({ count = 80 }) => {
  const points = useRef();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 12 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.25 + Math.random() * 0.35;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const attr = points.current?.geometry.attributes.position;
    if (!attr) return;
    const arr = attr.array;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      let y = arr[i * 3 + 1] - speeds[i] * dt;
      if (y < -2) y = 10;
      arr[i * 3 + 1] = y;
      arr[i * 3] += Math.sin((y + i) * 0.5) * 0.002;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c4b5fd"
        size={0.06}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
