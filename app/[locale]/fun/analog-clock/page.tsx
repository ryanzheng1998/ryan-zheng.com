'use client'
import React from 'react'
import { useRequestAnimationFrame } from './useRequestAnimationFrame'

export default function AnalogClock() {
  const [time, setTime] = React.useState(new Date())

  useRequestAnimationFrame(() => {
    setTime(new Date())
  })

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hoursDegrees = hours * 30 + minutes * 0.5
  const minutesDegrees = minutes * 6 + seconds * 0.1
  const secondsDegrees = seconds * 6

  return (
    <div className="grid h-screen place-items-center bg-gray-100">
      <div className="grid place-items-center gap-5">
        <h3 className="font-mono text-sm text-neutral-500">
          {time.toLocaleTimeString()}
        </h3>
        <svg
          className="aspect-square w-80 drop-shadow-md"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="clock-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>

          {/* Clock face */}
          <circle cx="50" cy="50" r="50" fill="url(#clock-gradient)" />

          {/* Tick marks */}
          {[...Array(60)].map((_, i) => {
            const angle = (i * 6 * Math.PI) / 180
            const r1 = i % 5 === 0 ? 45 : 48
            const r2 = 50
            const x1 = 50 + r1 * Math.sin(angle)
            const y1 = 50 - r1 * Math.cos(angle)
            const x2 = 50 + r2 * Math.sin(angle)
            const y2 = 50 - r2 * Math.cos(angle)

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={i % 5 === 0 ? 2 : 0.5}
              />
            )
          })}

          {/* Hours hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            className="stroke-black stroke-2"
            style={{
              transform: `rotate(${hoursDegrees}deg)`,
              transformOrigin: '50% 50%',
              transition: 'transform 0.1s linear',
              filter: 'drop-shadow(0 0 0.5px black)',
            }}
          />

          {/* Minutes hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            className="stroke-black stroke-[1.5]"
            style={{
              transform: `rotate(${minutesDegrees}deg)`,
              transformOrigin: '50% 50%',
              transition: 'transform 0.1s linear',
              filter: 'drop-shadow(0 0 0.5px black)',
            }}
          />

          {/* Seconds hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            className="stroke-red-500 stroke-[1]"
            style={{
              transform: `rotate(${secondsDegrees}deg)`,
              transformOrigin: '50% 50%',
              transition: 'transform 0.1s linear',
              filter: 'drop-shadow(0 0 1px red)',
            }}
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="2" className="fill-black" />
        </svg>
      </div>
    </div>
  )
}
