import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './AttackMap.css';

interface AttackData {
  id: string;
  from: [number, number]; // Tuple type for exactly 2 numbers
  to: [number, number];   // Tuple type for exactly 2 numbers
  severity: 'low' | 'medium' | 'high';
}

const AttackMap: React.FC<{ attacks: AttackData[] }> = ({ attacks }) => {
  return (
    <div className="attack-map-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth attacks={attacks} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

const Earth: React.FC<{ attacks: AttackData[] }> = ({ attacks }) => {
  const earthRef = React.useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshPhongMaterial
          color="#1a3a8f"
          specular="#111111"
          shininess={5}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      {attacks.map((attack) => (
        <AttackBeam key={attack.id} attack={attack} />
      ))}
    </group>
  );
};

const AttackBeam: React.FC<{ attack: AttackData }> = ({ attack }) => {
  const [fromLat, fromLon] = attack.from;
  const [toLat, toLon] = attack.to;
  
  const getColor = () => {
    switch (attack.severity) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      default: return '#52c41a';
    }
  };

  const fromPos = latLongToVector3(fromLat, fromLon, 5.1);
  const toPos = latLongToVector3(toLat, toLon, 5.1);

  // Create positions array
  const positions = React.useMemo(() => {
    return new Float32Array([
      fromPos.x, fromPos.y, fromPos.z,
      toPos.x, toPos.y, toPos.z
    ]);
  }, [fromPos, toPos]);

  return (
    <line>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} // <-- This is the critical fix
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={getColor()} linewidth={2} />
    </line>
  );
};

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default AttackMap;