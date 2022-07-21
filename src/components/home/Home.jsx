import {
  Environment,
  MapControls,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Model from "./Model";
import { Text } from "./Text";
import { Image } from "./Image";
import { Box } from "./Box";

export function Home() {
  const [items, setItems] = useState(null);
  const topRowXCoords = [-1.43, -0.63, 0.13, 0.93];

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/h3oucsholler/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer CGtLIAUKAI5-keq-C-yX67WGHpDhbvaO4kUxw6uXsEI",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setItems(
          data.productCollectionCollection.items[0].productCollection.items
        );
      });
  }, []);

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
        x: 2.2,
        duration: 3,
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

      {/* Row one */}
      {items &&
        items.map(({ name, productImage }, index) => {
          if (index < 4) {
            return (
              <React.Fragment key={index}>
                <Text
                  position={[topRowXCoords[index], 1.55, -1.85]}
                  text={name}
                  size={0.08}
                  height={0.05}
                  color="#000000"
                />
                <Box
                  position={[topRowXCoords[index] + 0.2, 1.3, -1.85]}
                  src={productImage.url}
                />
              </React.Fragment>
            );
          }
        })}

      {/* Row two */}
      {/* Rotating cube and text */}
      <Box position={[-1.13, 0.55, -1.85]} />
      <Text
        position={[-1.33, 0.75, -1.85]}
        text="Cube"
        size={0.1}
        height={0.05}
        color="#000000"
      />

      {/* Images */}
      <Image position={[-0.4, 0.65, -1.55]} />

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

// const query = `
// {
//   itemCollection {
//     items {
//       name
//     }
//   }
// }
// `;

const query = `
  {
  productCollectionCollection {
    items {
      productCollection(limit: 4) {
        items {
          name
					productImage {
            url
          }
        }
      }
    }
  }
}
`;
