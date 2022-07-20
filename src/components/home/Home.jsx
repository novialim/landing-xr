import {
  Environment,
  MapControls,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Model from "./Model";
import { Text } from "./Text";
import { Image } from "./Image";
import { Box } from "./Box";

export function Home() {
  // Code to move the camera around
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });

  // Animation
  const ballRef = useRef(null);
  useEffect(() => {
    if (!!ballRef.current) {
      // Timeline
      const timeline = gsap.timeline({ paused: true });

      // x-axis motion
      timeline.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: "power2.out",
      });

      // y-axis motion
      timeline.to(
        ballRef.current.position,
        {
          y: 0.5,
          duration: 1,
          ease: "bounce.out",
        },
        "<"
      );

      // Play
      timeline.play();
    }
  }, [ballRef.current]);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      {/* <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      /> */}

      {/* Ball */}
      <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Shelf */}
      <Model />

      {/* Text */}
      <Text position={[-2, 0.1, 2]} text="Hello" size={0.3} height={0.02} />

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2A578A" metalness={0.5} />
      </mesh>

      {/* Ambient light */}
      <ambientLight args={["#ffffff", 0.25]} />

      {/* Spotlight light */}
      <spotLight
        args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* Images */}
      <Image position={[-0.43, 1.45, -1.55]} />

      {/* Box */}
      <Box position={[-1.13, 1.35, -1.85]} />
      <Text
        position={[-1.33, 1.55, -1.85]}
        text="Cube"
        size={0.1}
        height={0.05}
        color="#000000"
      />

      {/* Environmnet */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#114171" side={THREE.BackSide} />
        </mesh>
      </Environment>
      <MapControls />
    </>
  );
}
