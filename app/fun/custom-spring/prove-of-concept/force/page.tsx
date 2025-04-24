"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const damping = 5;

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

      const timeDelta = (time - animationState.current.time) / 1000;

      if (timeDelta > 0.1) {
        animationState.current.time = time;
        animationId = requestAnimationFrame(step);
        return;
      }

      const nextPosition = position + velocity * timeDelta;
      const nextVelocity = velocity - velocity * damping * timeDelta;

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
  }, []);

  return (
    <div>
      <div
        className="h-[300px] w-[300px] bg-green-500"
        ref={(el) => (animationState.current.element = el)}
      />
      <button
        onClick={() => {
          animationState.current.velocity += 500;
        }}
      >
        Apply Force
      </button>
    </div>
  );
}
