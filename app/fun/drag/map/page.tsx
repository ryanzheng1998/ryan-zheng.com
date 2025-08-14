'use client'
import { drag } from './drag'
import { set, useStore } from './useStore'

export default function Page() {
  const store = useStore()

  return (
    <div className="h-screen w-screen overflow-hidden overscroll-contain">
      <div
        className="origin-top-left"
        onPointerDown={drag}
        onPointerMove={(e) => {
          const x = (e.pageX - store.panX) / store.zoom
          const y = (e.pageY - store.panY) / store.zoom

          console.log(x, y)
        }}
        onWheel={(e) => {
          const delta = Math.max(Math.min(-e.deltaY, 60), -60)
          const scaleDiff = delta / 300 + 1
          const zoom = store.zoom * scaleDiff
          const x = store.panX
          const y = store.panY
          const currentMousePositionX = (e.pageX - x) / store.zoom
          const currentMousePositionY = (e.pageY - y) / store.zoom
          const panX = x - currentMousePositionX * (zoom - store.zoom)
          const panY = y - currentMousePositionY * (zoom - store.zoom)

          e.currentTarget.style.transform = `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`

          set({
            zoom,
            panX,
            panY,
          })
        }}
      >
        <img
          draggable="false"
          src="/flip-card/DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d.webp"
        />
      </div>
    </div>
  )
}
