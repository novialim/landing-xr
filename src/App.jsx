import { useState } from "react";
import "./App.css";
import { Home } from "./components/home/index.jsx";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { angleToRadians } from "./utils/angle";
import { TextureLoader } from "three";
import { MapControls, Sky, Stars } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";

import MetalMap from "./assets/MetalMap.png";
import MetalNormalMap from "./assets/MetalNormalMap.png";

import { VRCanvas, ARCanvas } from "@react-three/xr";

import { StartVideo } from "./components/zoom/StartVideo";

const Plane = () => {
  // --> https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry

  // Lets add a cutom texture & material...
  // Generate NormalMaps --> https://cpetry.github.io/NormalMap-Online/
  const [metalNormalMap, metalMap] = useLoader(TextureLoader, [
    MetalNormalMap,
    MetalMap,
  ]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[30, 30]} />
      <meshStandardMaterial
        attach="material"
        map={metalMap}
        normalMap={metalNormalMap}
        metalness={0.2}
      />
    </mesh>
  );
};

function App() {
  const [toggleVR, setToggleVR] = useState(false);
  const isVRSite = window.location.pathname === "/vr";

  const app = (
    <Suspense fallback={<></>}>
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />
      <ambientLight intensity={0.75} />
      <Home />
    </Suspense>
  );
  return (
    <div className="relative h-screen">
      <button
        className={`absolute top-2 left-2 z-50 opacity-50 hover:opacity-100 ${
          isVRSite ? "hidden" : ""
        }`}
        onClick={() => setToggleVR(!toggleVR)}
      >
        Toggle VR
      </button>
      <div className="absolute top-2 left-28 z-50 opacity-50 hover:opacity-100">
        <StartVideo role={1} userName="Host" buttonText="Start Meeting" />
      </div>
      <div className="absolute top-2 left-60 z-50 opacity-50 hover:opacity-100">
        <StartVideo role={0} userName="Guest" buttonText="Join Meeting" />
      </div>
      {toggleVR || isVRSite ? (
        <VRCanvas
          id="three-canvas-container"
          shadows
          style={{ height: "100vh", position: "absolute", top: 0, left: 0 }}
        >
          {app}
        </VRCanvas>
      ) : (
        <Canvas
          shadows
          style={{ height: "100vh", position: "absolute", top: 0, left: 0 }}
        >
          {app}
        </Canvas>
      )}
    </div>
  );
}

export default App;
