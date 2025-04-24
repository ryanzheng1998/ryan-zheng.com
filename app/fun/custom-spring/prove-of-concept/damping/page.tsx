"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [go, setGo] = useState(false);

  const damping = 0.5;

  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 500,
    element: null as HTMLDivElement | null,
  });

  useEffect(() => {
    let animationId = 0;

    const step = (time: number) => {
      if (!go) return;
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
      const nextVelocity = velocity - velocity * damping;

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
  }, [go]);

  return (
    <div>
      <div
        className="h-[300px] w-[300px] bg-green-500"
        ref={(el) => (animationState.current.element = el)}
      />
      <button
        onClick={() => {
          setGo((x) => !x);
        }}
      >
        {go ? "Stop" : "Start"}
      </button>
    </div>
  );
}
