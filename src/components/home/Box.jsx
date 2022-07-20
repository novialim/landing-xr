import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import img from "/images/flower.png";

export function Box(props) {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const base = new THREE.TextureLoader().load(img);

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial attach="material" color={"lightblue"} map={base} />
    </mesh>
  );
}
