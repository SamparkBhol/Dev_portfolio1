import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
    import { Canvas, useFrame, useThree } from '@react-three/fiber';
    import { OrbitControls, Stars, Text3D, Center, Sparkles, Cloud, Sky, Billboard, useTexture, Environment } from '@react-three/drei';
    import * as THREE from 'three';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

    const MovingStars = React.memo(() => {
      const starsRef = useRef();
      useFrame((state, delta) => {
        if (starsRef.current) {
          starsRef.current.rotation.x += delta * 0.005;
          starsRef.current.rotation.y += delta * 0.01;
        }
      });
      return <Stars ref={starsRef} radius={200} depth={50} count={10000} factor={4} saturation={0} fade speed={0.7} />;
    });
    
    const NameText = React.memo(() => {
      const fontUrl = "/fonts/Orbitron_Bold.json"; 
      const textRef = useRef();
      useFrame(({ clock }) => {
        if(textRef.current) {
          textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
        }
      });

      return (
        <Suspense fallback={null}>
          <Center ref={textRef} position={[0,0,-2]}>
            <Text3D font={fontUrl} size={1} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02} bevelOffset={0} bevelSegments={5}>
              SAMPARK
              <meshStandardMaterial name="name_material" color="#c084fc" emissive="#7e22ce" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
            </Text3D>
            <Text3D font={fontUrl} position={[0, -1, 0]} size={0.9} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02} bevelOffset={0} bevelSegments={5}>
              BHOL
              <meshStandardMaterial name="name_material_bhol" color="#f9a8d4" emissive="#e11d48" emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
            </Text3D>
          </Center>
        </Suspense>
      );
    });

    const FloatingAbstractShapes = React.memo(() => {
        const groupRef = useRef();
        const { viewport } = useThree();
        const shapes = useMemo(() => {
            const temp = [];
            const geometries = [
                new THREE.IcosahedronGeometry(1, 0), 
                new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16), 
                new THREE.OctahedronGeometry(1, 0), 
                new THREE.DodecahedronGeometry(1,0) 
            ];
            const materials = [
                new THREE.MeshPhysicalMaterial({ color: '#8b5cf6', metalness: 0.8, roughness: 0.1, transmission: 0.5, thickness: 0.5, transparent:true, opacity: 0.8 }),
                new THREE.MeshPhysicalMaterial({ color: '#ec4899', metalness: 0.7, roughness: 0.2, transmission: 0.4, thickness: 0.4, transparent:true, opacity: 0.85 }),
                new THREE.MeshPhysicalMaterial({ color: '#10b981', metalness: 0.9, roughness: 0.05, transmission: 0.6, thickness: 0.6, transparent:true, opacity: 0.75 }),
                new THREE.MeshPhysicalMaterial({ color: '#f59e0b', metalness: 0.6, roughness: 0.3, transmission: 0.3, thickness: 0.3, transparent:true, opacity: 0.9 }),
            ];

            for (let i = 0; i < 15; i++) {
                const geometry = geometries[i % geometries.length];
                const material = materials[i % materials.length].clone();
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(
                    (Math.random() - 0.5) * viewport.width * 1.5,
                    (Math.random() - 0.5) * viewport.height * 1.5,
                    (Math.random() - 0.5) * 20 - 10 
                );
                mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                const scale = Math.random() * 0.3 + 0.2;
                mesh.scale.set(scale, scale, scale);
                mesh.userData = { randomFactor: Math.random() * 0.5 + 0.1 };
                temp.push(mesh);
            }
            return temp;
        }, [viewport]);

        useFrame((state, delta) => {
            if (groupRef.current) {
                groupRef.current.rotation.y += delta * 0.05;
                groupRef.current.children.forEach(child => {
                    child.rotation.x += delta * 0.1 * child.userData.randomFactor;
                    child.rotation.y += delta * 0.15 * child.userData.randomFactor;
                    child.position.y += Math.sin(state.clock.elapsedTime * child.userData.randomFactor) * delta * 0.5;
                });
            }
        });
        return <group ref={groupRef}>{shapes.map((shape, i) => <primitive key={i} object={shape} />)}</group>;
    });
    
    const BackgroundGameVisuals = React.memo(() => {
      const count = 50;
      const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
          temp.push({
            position: [ (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30 - 20],
            scale: Math.random() * 0.1 + 0.05,
            speed: Math.random() * 0.02 + 0.01,
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.7)
          });
        }
        return temp;
      }, []);

      const groupRef = useRef();
      useFrame((state, delta) => {
        if(groupRef.current) {
            groupRef.current.children.forEach((mesh, i) => {
                mesh.position.y -= particles[i].speed;
                if (mesh.position.y < -10) {
                    mesh.position.y = 10;
                }
                mesh.rotation.x += delta * 0.1;
                mesh.rotation.y += delta * 0.1;
            });
        }
      });

      return (
        <group ref={groupRef}>
          {particles.map((particle, i) => (
            <mesh key={i} position={particle.position} scale={particle.scale}>
              <boxGeometry />
              <meshStandardMaterial color={particle.color} emissive={particle.color} emissiveIntensity={0.3} transparent opacity={0.6} />
            </mesh>
          ))}
        </group>
      );
    });

    const VolumetricClouds = React.memo(() => {
      return (
        <>
          <Cloud position={[-10, -6, -25]} speed={0.2} opacity={0.15} segments={20} depthTest={false} scale={1.2} color="#4a044e" />
          <Cloud position={[10, -8, -30]} speed={0.2} opacity={0.1} segments={30} depthTest={false} scale={1.8} color="#2c114f"/>
          <Cloud position={[0, 10, -35]} speed={0.1} opacity={0.12} segments={15} depthTest={false} scale={1.5} color="#1e1b4b" />
        </>
      );
    });


    const ThreeExperience = ({ isHero = false }) => {
      const [fontLoaded, setFontLoaded] = useState(false);
      useEffect(() => {
        const loader = new FontLoader();
        loader.load("/fonts/Orbitron_Bold.json", (font) => {
          THREE.Cache.add("/fonts/Orbitron_Bold.json", font);
          setFontLoaded(true);
        });
      }, []);


      return (
        <Canvas 
            camera={{ position: [0, 0, isHero ? 8 : 15], fov: isHero ? 60 : 50 }} 
            style={{ touchAction: 'pan-y' }}
            gl={{ antialias: true, alpha: false }} 
        >
          {isHero ? (
            <color attach="background" args={['#0c0a09']} />
          ) : (
            <color attach="background" args={['#1f2937']} />
          )}

          <ambientLight intensity={isHero ? 0.6 : 0.4} />
          <pointLight position={[10, 15, 10]} intensity={isHero ? 1.5 : 0.8} decay={1.5} distance={60} color="#e9d5ff"/>
          <pointLight position={[-10, -5, -15]} intensity={isHero ? 0.8 : 0.4} color="#fbcfe8" decay={1.8} distance={50}/>
          <directionalLight position={[0, 10, 5]} intensity={isHero ? 0.9 : 0.5} color="#a5f3fc" />
          
          {isHero && fontLoaded && <NameText />}
          {isHero && <FloatingAbstractShapes />}
          <MovingStars />
          <Sparkles count={isHero ? 150 : 50} scale={isHero ? 7 : 10} size={isHero ? 4 : 5} speed={0.4} noise={0.15} color={isHero ? "#fda4af" : "#a78bfa"} />
          {!isHero && <BackgroundGameVisuals />}
          {isHero && <VolumetricClouds />}
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            minDistance={isHero ? 3 : 10} 
            maxDistance={isHero ? 18 : 30} 
            autoRotate={isHero} 
            autoRotateSpeed={isHero ? 0.2 : 0.1}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI - Math.PI / 5}
          />
        </Canvas>
      );
    };
    export default ThreeExperience;