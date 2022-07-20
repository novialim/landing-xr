import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import proximanova from "../../assets/ProximaNovaRg_Regular.json";
import { extend } from "@react-three/fiber";

export function Text(props) {
  const font = new FontLoader().parse(proximanova);
  extend({ TextGeometry });
  return (
    <mesh position={props.position}>
      <textGeometry
        args={[
          props.text,
          {
            font,
            size: props.size,
            height: props.height,
            // curveSegments: 0.01,
            // bevelThickness: 0.01,
            // bevelSize: 0.01,
            // bevelEnabled: true,
          },
        ]}
      />
      <meshPhongMaterial color={props.color} />
    </mesh>
  );
}
