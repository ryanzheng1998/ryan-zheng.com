"use client";

import { preset } from "@/config/preset";
import { useRef, useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const ref = useRef({
    element: null as HTMLParagraphElement | null,
    time: 0,
    velocity: 0,
    position: 0,
  });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid place-items-center gap-7">
        <h1
          ref={(element) => (ref.current.element = element)}
          className="text-9xl"
        >
          0.00
        </h1>
        <button
          className="rounded bg-slate-400 px-10 py-3 text-6xl text-white shadow"
          onClick={() => {
            setFlip((x) => !x);

            const element = ref.current.element;
            if (element === null) return;

            const springPosition = flip ? 0 : 1;
            const stiffness = preset.noWobble.stiffness;
            const damping = preset.noWobble.damping;
            const precision = 0.01;
            const timeSlowdown = 5;

            const step = (t: number) => {
              const { time, velocity, position } = ref.current;
              const timeDelta = (t - time) / 1000 / timeSlowdown;

              if (timeDelta > 0.1) {
                ref.current.time = t;
                requestAnimationFrame(step);
                return;
              }

              if (
                velocity < precision &&
                Math.abs(position - springPosition) < precision
              ) {
                element.innerHTML = springPosition.toFixed(2);
                return;
              }

              const springForce = (springPosition - position) * stiffness;
              const dampingForce = -velocity * damping;
              const totalForce = springForce + dampingForce;
              const nextVelocity = velocity + totalForce * timeDelta;
              const nextPosition = position + nextVelocity * timeDelta;

              element.innerHTML = nextPosition.toFixed(2);

              ref.current.time = t;
              ref.current.velocity = nextVelocity;
              ref.current.position = nextPosition;
              requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
          }}
        >
          Flip
        </button>
      </div>
    </div>
  );
}
