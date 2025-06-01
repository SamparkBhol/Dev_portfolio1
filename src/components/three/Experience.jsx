import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Center, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Retro Grid Floor
const RetroGrid = React.memo(() => {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 4 - 2;
    }
  });

  const gridLines = useMemo(() => {
    const lines = [];
    const size = 20;
    const divisions = 20;
    const step = size / divisions;
    
    // Create grid lines
    for (let i = 0; i <= divisions; i++) {
      const x = -size/2 + i * step;
      lines.push(
        <mesh key={`v${i}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.02, 0.1, size]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
      );
    }
    
    for (let i = 0; i <= divisions; i++) {
      const z = -size/2 + i * step;
      lines.push(
        <mesh key={`h${i}`} position={[0, 0, z]}>
          <boxGeometry args={[size, 0.1, 0.02]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
      );
    }
    
    return lines;
  }, []);

  return (
    <group ref={gridRef} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {gridLines}
    </group>
  );
});

// Floating Retro Shapes
const RetroShapes = React.memo(() => {
  const groupRef = useRef();
  
  const shapes = useMemo(() => {
    const temp = [];
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#80ff00'];
    
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = Math.random() * 8 + 2;
      const z = (Math.random() - 0.5) * 15;
      const color = colors[i % colors.length];
      const size = Math.random() * 0.8 + 0.5;
      
      temp.push({
        position: [x, y, z],
        color,
        size,
        rotationSpeed: Math.random() * 0.02 + 0.01,
        floatSpeed: Math.random() * 0.5 + 0.5,
        type: i % 4
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += shapes[i].rotationSpeed;
        child.rotation.y += shapes[i].rotationSpeed * 1.5;
        child.position.y += Math.sin(state.clock.elapsedTime * shapes[i].floatSpeed) * 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.size}>
          {shape.type === 0 && <boxGeometry />}
          {shape.type === 1 && <sphereGeometry args={[1, 8, 6]} />}
          {shape.type === 2 && <cylinderGeometry args={[1, 1, 2, 6]} />}
          {shape.type === 3 && <coneGeometry args={[1, 2, 4]} />}
          <meshBasicMaterial 
            color={shape.color} 
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  );
});

// Retro Tunnel Effect
const RetroTunnel = React.memo(() => {
  const groupRef = useRef();
  
  const rings = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      temp.push({
        z: -i * 3,
        scale: 1 + i * 0.3,
        color: i % 2 === 0 ? '#ff00ff' : '#00ffff'
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.position.z += 0.1;
        if (ring.position.z > 5) {
          ring.position.z = -40;
        }
        ring.rotation.z += 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} scale={ring.scale}>
          <torusGeometry args={[3, 0.1, 8, 16]} />
          <meshBasicMaterial color={ring.color} />
        </mesh>
      ))}
    </group>
  );
});

// Neon Text
const NeonText = React.memo(() => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Center ref={textRef} position={[0, 2, -5]}>
      <mesh>
        <textGeometry args={['SAMPARK', { font: null, size: 1, height: 0.2 }]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <textGeometry args={['BHOL', { font: null, size: 0.8, height: 0.2 }]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </Center>
  );
});

// Simple Neon Text (without font loading)
const SimpleNeonText = React.memo(() => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      const glow = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1;
      textRef.current.children.forEach(child => {
        if (child.material) {
          child.material.emissiveIntensity = glow;
        }
      });
    }
  });

  return (
    <group ref={textRef} position={[0, 2, -3]}>
      {/* S */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.2]} />
        <meshBasicMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-3, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshBasicMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-3, -0.4, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshBasicMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* A */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshBasicMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshBasicMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshBasicMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* M */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* BHOL below */}
      <group position={[0, -2, 0]}>
        <mesh position={[-1, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.2]} />
          <meshBasicMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshBasicMaterial color="#80ff00" emissive="#80ff00" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <sphereGeometry args={[0.4, 8, 6]} />
          <meshBasicMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
});

// Retro Particles
const RetroParticles = React.memo(() => {
  const particlesRef = useRef();
  const count = 200;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    const neonColors = [
      [1, 0, 1],    // Magenta
      [0, 1, 1],    // Cyan
      [1, 1, 0],    // Yellow
      [1, 0, 0.5],  // Pink
      [0.5, 1, 0]   // Green
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      const colorIndex = Math.floor(Math.random() * neonColors.length);
      colors[i * 3] = neonColors[colorIndex][0];
      colors[i * 3 + 1] = neonColors[colorIndex][1];
      colors[i * 3 + 2] = neonColors[colorIndex][2];
    }
    
    return { positions, colors, velocities };
  }, []);
  
  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] += particles.velocities[i * 3];
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
        
        // Reset particles that go too far
        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = -5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors transparent />
    </points>
  );
});

const ThreeExperience = ({ isHero = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 75 }}
      style={{ touchAction: 'pan-y' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#000011']} />
      
      {/* Retro Lighting */}
      <ambientLight intensity={0.3} color="#440044" />
      <pointLight position={[0, 10, 0]} intensity={2} color="#ff00ff" />
      <pointLight position={[-10, 5, 5]} intensity={1.5} color="#00ffff" />
      <pointLight position={[10, 5, 5]} intensity={1.5} color="#ffff00" />
      
      {/* Retro Elements */}
      <RetroGrid />
      <RetroShapes />
      <RetroTunnel />
      <SimpleNeonText />
      <RetroParticles />
      
      {/* Stars */}
      <Stars
        radius={50}
        depth={30}
        count={2000}
        factor={2}
        saturation={1}
        fade={false}
        speed={1}
      />
      
      {/* Sparkles */}
      <Sparkles
        count={30}
        scale={15}
        size={4}
        speed={0.8}
        color="#ff00ff"
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 4}
      />
    </Canvas>
  );
};

export default ThreeExperience;
