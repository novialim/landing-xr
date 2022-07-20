import * as THREE from "three";
import React from "react";
import { useLoader } from "@react-three/fiber";
import img from "/images/flower.png";

export function Image(props) {
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[0.4, 0.4]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
}
