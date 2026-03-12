'use client'

import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const positions = [
  // Top
  -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,

  // Left
  -1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1,

  // Right
  1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1,

  // Front
  1, 1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1,

  // Back
  1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1,

  // Bottom
  -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
]

const step = 1 / 6

const uvs = [
  // Face 1
  0 * step,
  0,
  0 * step,
  1,
  1 * step,
  1,
  1 * step,
  0,

  // Face 2
  1 * step,
  0,
  1 * step,
  1,
  2 * step,
  1,
  2 * step,
  0,

  // Face 3
  2 * step,
  0,
  2 * step,
  1,
  3 * step,
  1,
  3 * step,
  0,

  // Face 4
  3 * step,
  0,
  3 * step,
  1,
  4 * step,
  1,
  4 * step,
  0,

  // Face 5
  4 * step,
  0,
  4 * step,
  1,
  5 * step,
  1,
  5 * step,
  0,

  // Face 6
  5 * step,
  0,
  5 * step,
  1,
  6 * step,
  1,
  6 * step,
  0,
]
const boxIndices = [
  // Top
  0, 1, 2, 0, 2, 3,

  // Left (flipped)
  4, 6, 5, 4, 7, 6,

  // Right
  8, 9, 10, 8, 10, 11,

  // Front (flipped)
  12, 14, 13, 12, 15, 14,

  // Back
  16, 17, 18, 16, 18, 19,

  // Bottom (flipped)
  20, 22, 21, 20, 23, 22,
]

export const Dice = () => {
  const texture = useTexture('/diceTexture.svg')

  return (
    <group>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array(positions), 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[new Float32Array(uvs), 2]}
            attach="attributes-uv"
          />
          <bufferAttribute
            args={[new Uint16Array(boxIndices), 1]}
            attach="index"
          />
        </bufferGeometry>
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>
      <mesh scale={1.05}>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array(positions), 3]}
            attach="attributes-position"
          />
          <bufferAttribute
            args={[new Uint16Array(boxIndices), 1]}
            attach="index"
          />
        </bufferGeometry>
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.5}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
