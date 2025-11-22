'use client'

import type React from 'react'
import { orb } from './orb'
import { set, useStore } from './useStore'

export default function Page() {
  const store = useStore()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return

    const orbResult = await orb(file)
    const imageUrl = URL.createObjectURL(file)

    set({ orbResult, imageUrl })
  }

  return (
    <div className="space-y-4 overflow-auto">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div className="relative inline-block w-[6000px] overflow-auto">
        <img
          src={store.imageUrl}
          alt="uploaded"
          className="block"
          draggable={false}
        />

        {store.orbResult?.keypoints.map((kp, i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full border border-red-500 bg-red-500/60"
            style={{
              left: kp.x - 3,
              top: kp.y - 3,
              width: 6,
              height: 6,
            }}
          />
        ))}
      </div>
    </div>
  )
}
