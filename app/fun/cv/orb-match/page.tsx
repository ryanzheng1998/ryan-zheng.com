'use client'

import { Fragment } from 'react'
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
            <Fragment key={idx}>
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
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
