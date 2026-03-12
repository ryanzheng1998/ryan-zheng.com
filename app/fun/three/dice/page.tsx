'use client'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Dice } from './Dice'

export default function Page() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.7} />
        <Dice />
        <OrbitControls />

        <EffectComposer>
          <Bloom
            intensity={20}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.15}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
