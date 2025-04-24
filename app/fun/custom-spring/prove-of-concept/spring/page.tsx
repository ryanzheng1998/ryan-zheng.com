"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const damping = 10;
  const springStiffness = 200;
  const timeSlowdown = 1;
  const precision = 0.01;
  const [springPosition, setSpringPosition] = useState(0);

  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
    element: null as HTMLDivElement | null,
  });

  useEffect(() => {
    let animationId = 0;

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
        element.style.transform = `translateX(${springPosition}px)`;
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

      element.style.transform = `translateX(${nextPosition}px)`;

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
  }, [springPosition]);

  return (
    <div>
      <div
        className="h-[300px] w-[300px] bg-green-500"
        ref={(el) => (animationState.current.element = el)}
      />
      <button
        onClick={() => {
          setSpringPosition((x) => (x === 0 ? 500 : 0));
        }}
      >
        Apply Force
      </button>
    </div>
  );
}
