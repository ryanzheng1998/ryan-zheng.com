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
              className="relative"
              style={{ transform: img.transform }}
            >
              <img
                src={img.imageUrl}
                alt={`uploaded-${idx}`}
                className="absolute opacity-40"
                width={img.imageWidth}
                height={img.imageHeight}
                draggable={false}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
