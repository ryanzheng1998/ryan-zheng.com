"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const damping = 26;
  const springStiffness = 170;
  const timeSlowdown = 1;
  const precision = 0.01;
  const [flip, setFlip] = useState(false);

  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
    element: null as HTMLElement | null,
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
        element.innerHTML = springPosition.toFixed(2);
        animationState.current = {
          ...animationState.current,
          time,
          velocity: 0,
          position: springPosition,
        };
        return;
      }

      const springForce = (springPosition - position) * springStiffness;
      const dampingForce = -velocity * damping;
      const totalForce = springForce + dampingForce;
      const nextVelocity = velocity + totalForce * timeDelta;
      const nextPosition = position + nextVelocity * timeDelta;

      element.innerHTML = nextPosition.toFixed(2);

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
      <div className="grid place-items-center gap-7">
        <p
          className="font-mono text-9xl"
          ref={(el) => (animationState.current.element = el)}
        >
          0.00
        </p>
        <button
          className="rounded bg-slate-400 px-10 py-3 text-6xl text-white shadow"
          onClick={() => {
            setFlip((x) => !x);
          }}
        >
          Flip
        </button>
      </div>
    </div>
  );
}
