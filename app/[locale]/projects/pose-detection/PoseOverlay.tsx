// @ts-nocheck
import React from 'react'

type Landmark = { x: number; y: number }
type PoseOverlayProps = {
  landmarks: Landmark[][] // multiple poses
  width: number
  height: number
  scale: number
  xOffset: number
  yOffset: number
}

const POSE_CONNECTIONS = [
  // Eyes & nose
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [3, 7],
  [6, 8],

  // Mouth
  [9, 10],

  // Upper body
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],

  // Hands
  [15, 17],
  [15, 19],
  [15, 21],
  [16, 18],
  [16, 20],
  [16, 22],

  // Torso
  [11, 23],
  [12, 24],
  [23, 24],

  // Legs
  [23, 25],
  [25, 27],
  [27, 29],
  [29, 31],
  [24, 26],
  [26, 28],
  [28, 30],
  [30, 32],
]

export const PoseOverlay: React.FC<PoseOverlayProps> = ({
  landmarks,
  width,
  height,
  scale,
  xOffset,
  yOffset,
}) => {
  return (
    <>
      {landmarks.map((pose, poseIndex) => (
        <React.Fragment key={poseIndex}>
          {/* Connections */}
          {POSE_CONNECTIONS.map(([startIdx, endIdx], i) => {
            const start = pose[startIdx]
            const end = pose[endIdx]

            const x1 = start.x * width * scale + xOffset
            const y1 = start.y * height * scale + yOffset
            const x2 = end.x * width * scale + xOffset
            const y2 = end.y * height * scale + yOffset

            const length = Math.hypot(x2 - x1, y2 - y1)
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)

            return (
              <div
                key={`line-${poseIndex}-${i}`}
                className="absolute h-0.5 bg-black"
                style={{
                  width: `${length}px`,
                  transform: `translate(${x1}px, ${y1}px) rotate(${angle}deg)`,
                  transformOrigin: '0 0',
                }}
              />
            )
          })}

          {/* Points */}
          {pose.map((point, i) => {
            const x = point.x * width * scale + xOffset
            const y = point.y * height * scale + yOffset
            return (
              <div
                key={`point-${poseIndex}-${i}`}
                className="absolute aspect-square w-2 rounded-full bg-red-400"
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
