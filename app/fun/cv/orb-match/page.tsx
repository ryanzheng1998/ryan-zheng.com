'use client'

import { fileUpload } from './fileUpload'
import { useStore } from './useStore'

export default function Page() {
  const store = useStore()

  return (
    <div className="">
      <input type="file" accept="image/*" multiple onChange={fileUpload} />

      <div className="relative w-[6000px]">
        {store.images.map((img, idx) => {
          return (
            <div
              key={idx}
              // className="relative origin-top-left"
              // style={{ transform: img.cssMatrix }}
            >
              <img
                src={img.imageUrl}
                alt={`uploaded-${idx}`}
                className="absolute opacity-40"
                width={img.imageWidth}
                height={img.imageHeight}
                draggable={false}
              />

              {img.orbResult.keypoints.map((kp, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute rounded-full border border-red-500 bg-red-500/60 opacity-40"
                  style={{
                    left: kp.x - 3,
                    top: kp.y - 3,
                    width: 6,
                    height: 6,
                  }}
                />
              ))}

              {img.goodMatches.map((m, i) => {
                const firstKp =
                  store.images[0]!.orbResult.keypoints[m.queryIdx]!
                const imgKp = img.orbResult.keypoints[m.trainIdx]!
                const x1 = firstKp.x
                const y1 = firstKp.y
                const x2 = imgKp.x
                const y2 = imgKp.y

                const dx = x2 - x1
                const dy = y2 - y1
                const length = Math.sqrt(dx * dx + dy * dy)
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI

                return (
                  <div
                    key={i}
                    className="pointer-events-none absolute bg-blue-500/60"
                    style={{
                      left: x1,
                      top: y1,
                      width: length,
                      height: 2,
                      transformOrigin: '0 0',
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
