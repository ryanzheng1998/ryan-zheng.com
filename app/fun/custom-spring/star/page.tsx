"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const damping = 26;
  const springStiffness = 170;
  const timeSlowdown = 2;
  const precision = 0.01;
  const transform = (position: number, element: HTMLElement | SVGElement) => {
    element.style.strokeDashoffset = `${position * 100}`;
  };
  const [flip, setFlip] = useState(false);

  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
    element: null as HTMLElement | SVGElement | null,
  });

  useEffect(() => {
    let animationId = 0;
    const springPosition = flip ? 1 : 0;

    const step = (time: number) => {
      const element = animationState.current.element;
      if (element === null) return;
      const { position, velocity } = animationState.current;

      const timeDelta =
        (time - animationState.current.time) / 1000 / timeSlowdown;

      // prevent animation jump when tab is inactive
      if (timeDelta > 0.1) {
        animationState.current.time = time;
        animationId = requestAnimationFrame(step);
        return;
      }

      // stop animation to save battery
      if (
        Math.abs(velocity) < precision &&
        Math.abs(springPosition - position) < precision
      ) {
        transform(springPosition, element);

        animationState.current = {
          ...animationState.current,
          time,
          velocity: 0,
          position: springPosition,
        };

        setTimeout(() => {
          setFlip((x) => !x);
        }, 500);

        return;
      }

      const springForce = (springPosition - position) * springStiffness;
      const dampingForce = -velocity * damping;
      const totalForce = springForce + dampingForce;
      const nextVelocity = velocity + totalForce * timeDelta;
      const nextPosition = position + nextVelocity * timeDelta;

      transform(nextPosition, element);

      animationState.current = {
        ...animationState.current,
        time,
        position: nextPosition,
        velocity: nextVelocity,
      };

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [flip]);

  return (
    <div className="fixed inset-0 grid place-items-center">
      <svg
        className="aspect-square w-80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        strokeDasharray={100}
        strokeDashoffset={0}
        ref={(el) => (animationState.current.element = el)}
      >
        <title>Star</title>
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="1"
          pathLength={100}
        />
      </svg>
    </div>
  );
}
