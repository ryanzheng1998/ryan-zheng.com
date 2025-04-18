import React from 'react'

type Landmark = { x: number; y: number }
type HandOverlayProps = {
  landmarks: Landmark[][] // array of hands, each with 21 points
  width: number
  height: number
  scale: number
  xOffset: number
  yOffset: number
}

const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // Thumb
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8], // Index finger
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12], // Middle finger
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16], // Ring finger
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20], // Pinky
]

export const HandOverlay: React.FC<HandOverlayProps> = ({
  landmarks,
  width,
  height,
  scale,
  xOffset,
  yOffset,
}) => {
  return (
    <>
      {landmarks.map((hand, handIndex) => (
        <React.Fragment key={handIndex}>
          {/* Render Connections */}
          {HAND_CONNECTIONS.map(([startIdx, endIdx], i) => {
            const start = hand[startIdx]
            const end = hand[endIdx]

            const x1 = start.x * width * scale + xOffset
            const y1 = start.y * height * scale + yOffset
            const x2 = end.x * width * scale + xOffset
            const y2 = end.y * height * scale + yOffset

            const length = Math.hypot(x2 - x1, y2 - y1)
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

            return (
              <div
                key={`line-${handIndex}-${i}`}
                className="absolute h-0.5 bg-lime-400"
                style={{
                  width: `${length}px`,
                  transform: `translate(${x1}px, ${y1}px) rotate(${angle}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            )
          })}

          {/* Render Points */}
          {hand.map((point, i) => {
            const x = point.x * width * scale + xOffset
            const y = point.y * height * scale + yOffset
            return (
              <div
                key={`point-${handIndex}-${i}`}
                className="absolute aspect-square w-2 rounded-full bg-blue-400"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              />
            )
          })}
        </React.Fragment>
      ))}
    </>
  )
}
