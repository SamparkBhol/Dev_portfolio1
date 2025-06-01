"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"

const RetroGrid = React.memo(() => {
  const gridRef = useRef()

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 3
      if (gridRef.current.position.z > 5) {
        gridRef.current.position.z = -20
      }
    }
  })

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 40
    const divisions = 40

    // Create grid lines
    for (let i = 0; i <= divisions; i++) {
      const pos = (i / divisions) * size - size / 2

      // Horizontal lines
      vertices.push(-size / 2, pos, 0)
      vertices.push(size / 2, pos, 0)

      // Vertical lines
      vertices.push(pos, -size / 2, 0)
      vertices.push(pos, size / 2, 0)
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={gridRef} position={[0, -5, -15]} rotation={[-Math.PI / 2, 0, 0]}>
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.4} />
      </lineSegments>
    </group>
  )
})

const RetroSpaceship = React.memo(() => {
  const shipRef = useRef()

  useFrame((state, delta) => {
    if (shipRef.current) {
      shipRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 2
      shipRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 1
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <group ref={shipRef} position={[0, 0, 2]}>
      {/* Main body */}
      <mesh>
        <coneGeometry args={[0.4, 1.5, 4]} />
        <meshBasicMaterial color="#ff00ff" wireframe />
      </mesh>

      {/* Wings */}
      <mesh position={[-0.6, 0, 0.2]}>
        <boxGeometry args={[1, 0.1, 0.2]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>
      <mesh position={[0.6, 0, 0.2]}>
        <boxGeometry args={[1, 0.1, 0.2]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>

      {/* Engine glow */}
      <mesh position={[0, 0, -0.8]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
    </group>
  )
})

const RetroAsteroids = React.memo(() => {
  const asteroidsRef = useRef()

  const asteroids = useMemo(() => {
    const temp = []
    for (let i = 0; i < 12; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, -Math.random() * 25 - 5],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.8 + 0.4,
        speed: Math.random() * 3 + 1,
        rotSpeed: (Math.random() - 0.5) * 0.03,
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.children.forEach((asteroid, i) => {
        asteroid.position.z += asteroids[i].speed * delta
        asteroid.rotation.x += asteroids[i].rotSpeed
        asteroid.rotation.y += asteroids[i].rotSpeed * 0.7

        if (asteroid.position.z > 8) {
          asteroid.position.z = -25
          asteroid.position.x = (Math.random() - 0.5) * 15
          asteroid.position.y = (Math.random() - 0.5) * 10
        }
      })
    }
  })

  return (
    <group ref={asteroidsRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position} rotation={asteroid.rotation} scale={asteroid.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ff6600" wireframe />
        </mesh>
      ))}
    </group>
  )
})

const RetroEnemies = React.memo(() => {
  const enemiesRef = useRef()

  const enemies = useMemo(() => {
    const temp = []
    for (let i = 0; i < 6; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -Math.random() * 20 - 10],
        speed: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (enemiesRef.current) {
      enemiesRef.current.children.forEach((enemy, i) => {
        enemy.position.z += enemies[i].speed * delta
        enemy.position.x += Math.sin(state.clock.elapsedTime * 2 + enemies[i].phase) * delta * 0.8
        enemy.rotation.y += delta * 3

        if (enemy.position.z > 8) {
          enemy.position.z = -20
          enemy.position.x = (Math.random() - 0.5) * 12
          enemy.position.y = (Math.random() - 0.5) * 8
        }
      })
    }
  })

  return (
    <group ref={enemiesRef}>
      {enemies.map((enemy, i) => (
        <group key={i} position={enemy.position}>
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial color="#ff0040" wireframe />
          </mesh>
          <mesh position={[-0.4, 0, 0]}>
            <boxGeometry args={[0.6, 0.1, 0.1]} />
            <meshBasicMaterial color="#ff0040" wireframe />
          </mesh>
          <mesh position={[0.4, 0, 0]}>
            <boxGeometry args={[0.6, 0.1, 0.1]} />
            <meshBasicMaterial color="#ff0040" wireframe />
          </mesh>
        </group>
      ))}
    </group>
  )
})

const RetroLasers = React.memo(() => {
  const lasersRef = useRef()

  const lasers = useMemo(() => {
    const temp = []
    for (let i = 0; i < 15; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, Math.random() * 15 - 5],
        speed: Math.random() * 10 + 5,
        isPlayerLaser: Math.random() > 0.4,
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (lasersRef.current) {
      lasersRef.current.children.forEach((laser, i) => {
        if (lasers[i].isPlayerLaser) {
          laser.position.z -= lasers[i].speed * delta
        } else {
          laser.position.z += lasers[i].speed * delta
        }

        if (laser.position.z > 10 || laser.position.z < -10) {
          laser.position.x = (Math.random() - 0.5) * 8
          laser.position.y = (Math.random() - 0.5) * 6
          laser.position.z = lasers[i].isPlayerLaser ? 2 : -10
        }
      })
    }
  })

  return (
    <group ref={lasersRef}>
      {lasers.map((laser, i) => (
        <mesh key={i} position={laser.position}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshBasicMaterial color={laser.isPlayerLaser ? "#00ff00" : "#ff0000"} />
        </mesh>
      ))}
    </group>
  )
})

const RetroExplosions = React.memo(() => {
  const explosionsRef = useRef()

  const explosions = useMemo(() => {
    const temp = []
    for (let i = 0; i < 8; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15],
        scale: Math.random() * 0.3 + 0.2,
        life: Math.random(),
        maxLife: Math.random() * 1.5 + 0.8,
      })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (explosionsRef.current) {
      explosionsRef.current.children.forEach((explosion, i) => {
        explosions[i].life += delta

        const progress = explosions[i].life / explosions[i].maxLife
        explosion.scale.setScalar(explosions[i].scale * (1 + progress * 3))
        explosion.material.opacity = Math.max(0, 1 - progress)

        if (explosions[i].life > explosions[i].maxLife) {
          explosions[i].life = 0
          explosion.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15)
        }
      })
    }
  })

  return (
    <group ref={explosionsRef}>
      {explosions.map((explosion, i) => (
        <mesh key={i} position={explosion.position}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#ffff00" wireframe transparent />
        </mesh>
      ))}
    </group>
  )
})

const RetroHUD = React.memo(() => {
  const crosshairRef = useRef()

  useFrame((state) => {
    if (crosshairRef.current) {
      crosshairRef.current.material.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 4) * 0.3
    }
  })

  return (
    <group position={[0, 0, 4]}>
      {/* Score text using simple geometry */}
      <mesh position={[-3.5, 2.8, 0]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>

      {/* Lives indicator */}
      <mesh position={[3.5, 2.8, 0]}>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.8} />
      </mesh>

      {/* Crosshair */}
      <mesh ref={crosshairRef}>
        <ringGeometry args={[0.08, 0.12, 8]} />
        <meshBasicMaterial color="#00ff00" transparent />
      </mesh>

      {/* Crosshair lines */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.001]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
      </mesh>
    </group>
  )
})

const RetroParticles = React.memo(() => {
  const particlesRef = useRef()

  const particleCount = 100
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = Math.random() * 0.1 + 0.05
    }

    return { positions, velocities }
  }, [])

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        positions[i3] += particles.velocities[i3] * delta * 60
        positions[i3 + 1] += particles.velocities[i3 + 1] * delta * 60
        positions[i3 + 2] += particles.velocities[i3 + 2] * delta * 60

        if (positions[i3 + 2] > 10) {
          positions[i3] = (Math.random() - 0.5) * 20
          positions[i3 + 1] = (Math.random() - 0.5) * 15
          positions[i3 + 2] = -15
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
})

const ThreeExperience = ({ isHero = false }) => {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 75 }}
      style={{ touchAction: "pan-y" }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={["#000022"]} />

      {/* Simple lighting */}
      <ambientLight intensity={0.2} />

      {/* All game elements */}
      <RetroGrid />
      <Stars radius={50} depth={30} count={2000} factor={3} saturation={0} fade speed={3} />
      <RetroSpaceship />
      <RetroAsteroids />
      <RetroEnemies />
      <RetroLasers />
      <RetroExplosions />
      <RetroParticles />
      <RetroHUD />
    </Canvas>
  )
}

export default ThreeExperience
