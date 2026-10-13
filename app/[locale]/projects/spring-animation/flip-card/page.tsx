'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface AnimationState {
  time: number
  elements: {
    position: number
    velocity: number
    element: HTMLElement | SVGElement | null
  }[]
}

export default function Home() {
  const [flip, setFlip] = useState(false)

  const animationState = useRef<AnimationState>({
    time: 0,
    elements: [
      {
        position: 0,
        velocity: 0,
        element: null,
      },
      {
        position: 180,
        velocity: 0,
        element: null,
      },
    ],
  })

  useEffect(() => {
    // how about there are two springs?
    // config
    const timeSlowdown = 3
    const stiffness = 180
    const damping = 12
    const precision = 0.01
    const getSpringPosition = (index: number) => {
      return index === 0 ? (flip ? 180 : 0) : flip ? 360 : 180
    }
    let animationId = 0

    const step = (time: number) => {
      const timeDelta =
        (time - animationState.current.time) / 1000 / timeSlowdown

      // prevent animation jump when tab is inactive
      if (timeDelta > 0.1) {
        animationState.current.time = time
        animationId = requestAnimationFrame(step)
        return
      }

      // stop animation to save battery
      const allElementsAreAtRest = animationState.current.elements.every(
        (el, i) => el.velocity === 0 && getSpringPosition(i) === el.position,
      )
      if (allElementsAreAtRest) {
        return
      }

      // calculate next position and velocity
      const next = animationState.current.elements.map((el, i) => {
        const springPosition = getSpringPosition(i)
        const { position, velocity, element } = el
        if (element === null) throw new Error('Element is null')

        const springForce = (springPosition - position) * stiffness
        const dampingForce = -velocity * damping
        const totalForce = springForce + dampingForce
        const nextVelocity = velocity + totalForce * timeDelta
        const nextPosition = position + nextVelocity * timeDelta

        if (
          Math.abs(velocity) < precision &&
          Math.abs(springPosition - position) < precision
        ) {
          return {
            ...el,
            position: springPosition,
            velocity: 0,
          }
        }

        return {
          ...el,
          position: nextPosition,
          velocity: nextVelocity,
        }
      })

      // start transform
      next.forEach((el) => {
        el.element!.style.transform = `perspective(1000px) rotateX(${el.position}deg)`
      })

      // update state
      animationState.current = {
        ...animationState.current,
        time,
        elements: next,
      }

      // next frame
      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationId)
  }, [flip])

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Flip photo card"
        aria-pressed={flip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setFlip((x) => !x)
          }
        }}
        onClick={() => {
          setFlip((x) => !x)
        }}
        className="relative aspect-[16/9] w-[min(800px,calc(100vw-40px))] cursor-pointer select-none"
      >
        <Image
          alt="Neon billboard on a city street at night"
          ref={(el) => {
            animationState.current.elements[0]!.element = el
          }}
          width={800}
          height={450}
          className="absolute h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: 'hidden',
          }}
          src="/images/night-billboard.webp"
        />
        <Image
          alt="Illuminated sign on a night-time street"
          ref={(el) => {
            animationState.current.elements[1]!.element = el
          }}
          width={800}
          height={450}
          className="absolute h-full w-full rounded bg-slate-400 p-2"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
          src="/images/night-sign.webp"
        />
      </div>
    </div>
  )
}
