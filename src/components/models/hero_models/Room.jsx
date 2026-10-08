/*
Based on gltfjsx output for optimized-room.glb.
Materials are memoised so they are created once per mount, not on every render.
*/
import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/optimized-room.glb";
const MATCAP = "/images/textures/mat1.png";

export function Room(props) {
  const { nodes, materials } = useGLTF(MODEL);
  const matcapTexture = useTexture(MATCAP);

  const m = useMemo(() => {
    const curtain = new THREE.MeshPhongMaterial({ color: "#d90429", shininess: 10 });
    const body = new THREE.MeshPhongMaterial({ map: matcapTexture });
    const table = new THREE.MeshPhongMaterial({ color: "#582f0e" });
    const radiator = new THREE.MeshPhongMaterial({ color: "#fff" });
    const comp = new THREE.MeshStandardMaterial({ color: "#f5f5f5", roughness: 0.35, metalness: 0.2 });
    const pillow = new THREE.MeshPhongMaterial({ color: "#8338ec" });
    const chair = new THREE.MeshPhongMaterial({ color: "#0a0a0a", shininess: 60 });
    return { curtain, body, table, radiator, comp, pillow, chair };
  }, [matcapTexture]);

  // Make the screen glow a little so Bloom has something to pick up.
  useMemo(() => {
    if (materials.lambert1) {
      materials.lambert1.emissive = new THREE.Color("#7dd3fc");
      materials.lambert1.emissiveIntensity = 1.4;
    }
  }, [materials]);

  const b = materials.blinn1;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes._________6_blinn1_0.geometry} material={m.curtain} />
      <mesh geometry={nodes.body1_blinn1_0.geometry} material={m.body} />
      <mesh geometry={nodes.cabin_blinn1_0.geometry} material={m.table} />
      <mesh geometry={nodes.chair_body_blinn1_0.geometry} material={m.chair} />
      <mesh geometry={nodes.comp_blinn1_0.geometry} material={m.comp} />
      <mesh geometry={nodes.emis_lambert1_0.geometry} material={materials.lambert1} />
      <mesh geometry={nodes.handls_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.keyboard_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.kovrik_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.lamp_bl_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.lamp_white_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.miuse_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.monitor2_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.monitor3_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.pCylinder5_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.pillows_blinn1_0.geometry} material={m.pillow} />
      <mesh geometry={nodes.polySurface53_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.radiator_blinn1_0.geometry} material={m.radiator} />
      <mesh geometry={nodes.radiator_blinn1_0001.geometry} material={b} />
      <mesh geometry={nodes.railing_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.red_bttns_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.red_vac_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.stylus_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.table_blinn1_0.geometry} material={m.table} />
      <mesh geometry={nodes.tablet_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.triangle_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.vac_black_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.vacuum1_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.vacuumgrey_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.vires_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.window_blinn1_0.geometry} material={b} />
      <mesh geometry={nodes.window4_phong1_0.geometry} material={materials.phong1} />
    </group>
  );
}

useGLTF.preload(MODEL);
useTexture.preload(MATCAP);
