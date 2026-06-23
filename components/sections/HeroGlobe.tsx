// "use client";

// import { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import * as THREE from "three";

// function ParticleField() {
//   const ref = useRef<THREE.Points>(null!);

//   const positions = useMemo(() => {
//     const count = 2000;
//     const arr = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       // Sphere distribution
//       const r = 2.5 + Math.random() * 1.5;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
//       arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
//       arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
//       arr[i * 3 + 2] = r * Math.cos(phi);
//     }
//     return arr;
//   }, []);

//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.08;
//       ref.current.rotation.x += delta * 0.03;
//     }
//   });

//   return (
//     <Points ref={ref} positions={positions} stride={3} frustumCulled>
//       <PointMaterial
//         transparent
//         color="#60a5fa"
//         size={0.018}
//         sizeAttenuation
//         depthWrite={false}
//         opacity={0.7}
//       />
//     </Points>
//   );
// }

// function GlobeWireframe() {
//   const ref = useRef<THREE.Mesh>(null!);

//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.12;
//     }
//   });

//   return (
//     <mesh ref={ref}>
//       <sphereGeometry args={[1.8, 32, 32]} />
//       <meshBasicMaterial
//         color="#3b82f6"
//         wireframe
//         transparent
//         opacity={0.12}
//       />
//     </mesh>
//   );
// }

// function NetworkNodes() {
//   const ref = useRef<THREE.Group>(null!);

//   const nodes = useMemo(() => {
//     return Array.from({ length: 8 }, (_, i) => {
//       const angle = (i / 8) * Math.PI * 2;
//       return {
//         x: Math.cos(angle) * 2.2,
//         y: (Math.random() - 0.5) * 2,
//         z: Math.sin(angle) * 2.2,
//       };
//     });
//   }, []);

//   useFrame((state) => {
//     if (ref.current) {
//       ref.current.rotation.y = state.clock.elapsedTime * 0.1;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {nodes.map((node, i) => (
//         <mesh key={i} position={[node.x, node.y, node.z]}>
//           <sphereGeometry args={[0.06, 8, 8]} />
//           <meshBasicMaterial color="#a78bfa" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// export function HeroGlobe() {
//   return (
//     <div className="w-full h-full" aria-hidden="true">
//       <Canvas
//         camera={{ position: [0, 0, 6], fov: 50 }}
//         gl={{ antialias: true, alpha: true }}
//         dpr={[1, 2]}
//       >
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
//         <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
//         <ParticleField />
//         <GlobeWireframe />
//         <NetworkNodes />
//       </Canvas>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";

export function HeroGlobe() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-80 h-80 rounded-full border border-blue-500/20"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-64 h-64 rounded-full border border-purple-500/20"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
    </div>
  );
}