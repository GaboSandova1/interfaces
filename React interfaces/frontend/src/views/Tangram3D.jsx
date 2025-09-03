"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Función para crear geometría desde path SVG
function createSVGGeometry(pathData, depth = 0.4) {
  const shape = new THREE.Shape()
  const path = new THREE.ShapePath()
  path.setFromPoints(
    THREE.SVGLoader.pointsToShapeHoles(
      THREE.SVGLoader.parsePathNode({ getAttribute: () => pathData }).subPaths[0].getPoints(),
    ).shape,
  )

  // Método alternativo más directo para crear la forma
  const loader = new THREE.SVGLoader()
  const svgData = `<svg><path d="${pathData}"/></svg>`
  const svgGroup = loader.parse(svgData)

  if (svgGroup.paths.length > 0) {
    const shapes = svgGroup.paths[0].toShapes(true)
    if (shapes.length > 0) {
      const extrudeSettings = { depth, bevelEnabled: false }
      return new THREE.ExtrudeGeometry(shapes[0], extrudeSettings)
    }
  }

  // Fallback: crear manualmente
  return createFallbackGeometry(pathData, depth)
}

function createFallbackGeometry(pathData, depth) {
  const shape = new THREE.Shape()
  // Parsear el path manualmente para casos específicos
  if (pathData.includes("M0,0 L4,0 L0,4 Z")) {
    // Triángulo grande
    shape.moveTo(0, 0)
    shape.lineTo(4, 0)
    shape.lineTo(0, 4)
    shape.lineTo(0, 0)
  } else if (pathData.includes("M0,0 L2,2 L0,4 Z")) {
    // Triángulo mediano
    shape.moveTo(0, 0)
    shape.lineTo(2, 2)
    shape.lineTo(0, 4)
    shape.lineTo(0, 0)
  } else if (pathData.includes("M0,0 L2,0 L0,2 Z")) {
    // Triángulo pequeño
    shape.moveTo(0, 0)
    shape.lineTo(2, 0)
    shape.lineTo(0, 2)
    shape.lineTo(0, 0)
  }

  const extrudeSettings = { depth, bevelEnabled: false }
  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

// Componente para cada pieza del tangram
function TangramPiece({ pathData, color, position, rotation, scale }) {
  const meshRef = useRef(null)
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    // Crear geometría desde SVG path
    const shape = new THREE.Shape()
    // Definir formas manualmente para mayor control
    if (pathData === "triangulo-grande") {
      shape.moveTo(0, 0)
      shape.lineTo(4, 0)
      shape.lineTo(0, 4)
      shape.lineTo(0, 0)
    } else if (pathData === "triangulo-mediano") {
      shape.moveTo(0, 0)
      shape.lineTo(2, 2)
      shape.lineTo(0, 4)
      shape.lineTo(0, 0)
    } else if (pathData === "triangulo-pequeno") {
      shape.moveTo(0, 0)
      shape.lineTo(2, 0)
      shape.lineTo(0, 2)
      shape.lineTo(0, 0)
    } else if (pathData === "cuadrado") {
      const side = (2 * Math.sqrt(2)) / 2
      shape.moveTo(0, 0)
      shape.lineTo(side, 0)
      shape.lineTo(side, side)
      shape.lineTo(0, side)
      shape.lineTo(0, 0)
    } else if (pathData === "paralelogramo") {
      shape.moveTo(0, 0)
      shape.lineTo(2, 0)
      shape.lineTo(3.2, 1.2)
      shape.lineTo(1, 1.2)
      shape.lineTo(0, 0)
    }

    const extrudeSettings = { depth: 0.4, bevelEnabled: false }
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geom.center()
    setGeometry(geom)
  }, [pathData])

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position)
      meshRef.current.rotation.set(...rotation)
      meshRef.current.scale.set(...scale)
    }
  }, [position, rotation, scale])

  if (!geometry) return null

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Utilidades para interpolación
function lerp(a, b, t) {
  return a + (b - a) * t
}

function lerpAngle(a, b, t) {
  let diff = b - a
  while (diff > Math.PI) diff -= 2 * Math.PI
  while (diff < -Math.PI) diff += 2 * Math.PI
  return a + diff * t
}

// Estados de cada pieza en cada tangram
const tangramStates = [
  // Tangram 1 (Gato)
  [
    { pos: [-4.3, -0.9, -3], rot: [0, 0, 3.9], color: "#87ceeb", scale: [1, 1, 1] },
    { pos: [0.5, -0.2, -3], rot: [0, 0, 3.9], color: "#ffc0cb", scale: [1, 1, 1] },
    { pos: [-2.3, 0.9, -3], rot: [0, 0, -7.9], color: "#ff69b4", scale: [1, 1, 1] },
    { pos: [3.5, 4.2, -3.7], rot: [0, 0, -0.8], color: "#00a99d", scale: [1, 1, 1] },
    { pos: [0.7, 4.2, -3.7], rot: [0, 0, 2.3], color: "#3cb371", scale: [1, 1, 1] },
    { pos: [1.5, 2, 0], rot: [0, 0, -7.09], color: "orange", scale: [1, 1, 1] },
    { pos: [-6.2, 0, -0.2], rot: [0, 0.4, 3.1], color: "#0077be", scale: [1, 1, 1] },
  ],
  // Tangram 2 (Perfume)
  [
    { pos: [2, -2, 0], rot: [0, 0, -Math.PI / 2], color: "#87ceeb", scale: [1, 1, 1] },
    { pos: [-2, -2, 0], rot: [0, 0, Math.PI], color: "#ffc0cb", scale: [1, 1, 1] },
    { pos: [0, 1, 0], rot: [0, 0, Math.PI / 2], color: "#9932cc", scale: [1, 1, 1] },
    { pos: [-3, 1, 0], rot: [0, 0, Math.PI / 2], color: "#3cb371", scale: [1, 1, 1] },
    { pos: [-1, 1, 0], rot: [0, 0, 4.71], color: "#00a99d", scale: [1, 1, 1] },
    { pos: [0, 3, 0], rot: [0, 0, Math.PI / 2], color: "orange", scale: [1, 1, 1] },
    { pos: [2, 1, 0], rot: [0, 0, Math.PI / -4.3], color: "#0077be", scale: [1.3, 1, 1] },
  ],
  // Tangram 3 (Gato variante)
  [
    { pos: [1.9, 0, 0], rot: [0, 0, 0], color: "#87ceeb", scale: [1, 1, 1] },
    { pos: [2, 0, 0], rot: [0, 0, Math.PI], color: "#ffc0cb", scale: [1, 1, 1] },
    { pos: [-1.1, 0, 0], rot: [0, 0, -6.283185307179586], color: "#ff69b4", scale: [1, 1, 1] },
    { pos: [-1, 3.1, -0.4], rot: [0, 0, 3.15], color: "#00a99d", scale: [1, 1, 1] },
    { pos: [2.9, 3, -0.4], rot: [0, 0, -Math.PI / 2], color: "#3cb371", scale: [1, 1, 1] },
    { pos: [0.7, 2.31, 2.2], rot: [6.283185307179586, 0, 0], color: "orange", scale: [1, 1, 1] },
    { pos: [-0.82, 1.6, 1.89], rot: [6.283185307179586, 3, 3.921], color: "#0077be", scale: [1, 1, 1] },
  ],
]

const pieceTypes = [
  "triangulo-grande", // G1
  "triangulo-grande", // G2
  "triangulo-mediano",
  "triangulo-pequeno", // P1
  "triangulo-pequeno", // P2
  "cuadrado",
  "paralelogramo",
]

// Componente principal de animación
function AnimatedTangram() {
  const [currentStates, setCurrentStates] = useState(tangramStates[0])
  const [currentTangram, setCurrentTangram] = useState(0)
  const [nextTangram, setNextTangram] = useState(1)
  const [t, setT] = useState(0)
  const [animating, setAnimating] = useState(true)

  useFrame(() => {
    if (animating) {
      setT((prev) => {
        const newT = prev + 0.025
        if (newT >= 1) {
          // Animación completada
          setCurrentTangram(nextTangram)
          setNextTangram((nextTangram + 1) % tangramStates.length)
          setAnimating(false)
          // Pausa antes de la siguiente animación
          setTimeout(() => {
            setAnimating(true)
          }, 600)
          return 0
        }
        return newT
      })
    }
  })

  useEffect(() => {
    if (animating) {
      const from = tangramStates[currentTangram]
      const to = tangramStates[nextTangram]

      const interpolatedStates = from.map((fromState, i) => {
        const toState = to[i]
        return {
          pos: [
            lerp(fromState.pos[0], toState.pos[0], t),
            lerp(fromState.pos[1], toState.pos[1], t),
            lerp(fromState.pos[2], toState.pos[2], t),
          ],
          rot: [
            lerpAngle(fromState.rot[0], toState.rot[0], t),
            lerpAngle(fromState.rot[1], toState.rot[1], t),
            lerpAngle(fromState.rot[2], toState.rot[2], t),
          ],
          scale: [
            lerp(fromState.scale[0], toState.scale[0], t),
            lerp(fromState.scale[1], toState.scale[1], t),
            lerp(fromState.scale[2], toState.scale[2], t),
          ],
          color: new THREE.Color(fromState.color).lerp(new THREE.Color(toState.color), t).getHexString(),
        }
      })

      setCurrentStates(interpolatedStates)
    }
  }, [t, animating, currentTangram, nextTangram])

  return (
    <>
      {pieceTypes.map((type, index) => (
        <TangramPiece
          key={index}
          pathData={type}
          color={`#${currentStates[index].color}`}
          position={currentStates[index].pos}
          rotation={currentStates[index].rot}
          scale={currentStates[index].scale}
        />
      ))}
    </>
  )
}

export default function TangramSVG3D() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <color attach="background" args={["#f0f0f0"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7.5]} intensity={0.8} />
        <AnimatedTangram />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  )
}
