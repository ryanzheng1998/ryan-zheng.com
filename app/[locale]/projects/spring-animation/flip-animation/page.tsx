"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  const ref = useRef<HTMLParagraphElement>(null);
  const velocityRef = useRef(0);

  useLayoutEffect(() => {
    // config
    const timeSlowdown = 1;
    const springPosition = 0;
    const stiffness = 170;
    const damping = 26;
    const precision = 0.01;

    let animationId = -1;
    const element = ref.current;
    if (element === null) return;

    // first
    const first = element.getBoundingClientRect();

    // last
    element.style.transform = "";
    element.style.right = flip ? "" : "0";
    element.style.left = flip ? "0" : "";
    const last = element.getBoundingClientRect();

    // invert
    element.style.transform = `translateX(${first.left - last.left}px)`;

    // play
    let position = first.left - last.left;
    let time = performance.now();

    const step = (t: number) => {
      const velocity = velocityRef.current;
      const timeDelta = (t - time) / 1000 / timeSlowdown;

      if (timeDelta > 0.1) {
        time = t;
        requestAnimationFrame(step);
        return;
      }

      if (
        velocity < precision &&
        Math.abs(position - springPosition) < precision
      ) {
        element.style.transform = "";
        velocityRef.current = 0;
        return;
      }

      const springForce = (springPosition - position) * stiffness;
      const dampingForce = -velocity * damping;
      const totalForce = springForce + dampingForce;
      const nextVelocity = velocity + totalForce * timeDelta;
      const nextPosition = position + nextVelocity * timeDelta;

      element.style.transform = `translateX(${position}px)`;

      time = t;
      velocityRef.current = nextVelocity;
      position = nextPosition;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [flip]);

  return (
    <>
      <p ref={ref} className="fixed text-9xl">
        FLIP
      </p>
      <button
        className="fixed top-80 text-9xl"
        onClick={() => {
          setFlip((x) => !x);
        }}
      >
        Action!
      </button>
    </>
  );
}
