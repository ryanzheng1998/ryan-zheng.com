"use client";

import { useEffect, useRef, useState } from "react";

const buttons = ["red", "green", "blue", "orange"];

interface AnimationState {
  time: number;
  elements: {
    position: number;
    velocity: number;
    element: HTMLElement | SVGElement | null;
    transform: (position: number, element: HTMLElement | SVGElement) => void;
  }[];
}

export default function Home() {
  const [float, setFloat] = useState(true);

  const timeSlowdown = 2;

  const spring = {
    position: float ? 180 : 0,
    damping: 12,
    springStiffness: 180,
    precision: 0.01,
  };

  const animationState = useRef<AnimationState>({
    time: 0,
    elements: buttons.map(() => ({
      position: 0,
      velocity: 0,
      element: null,
      transform: (position, element) => {
        element.style.transform = `translateY(${position}px)`;
      },
    })),
  });

  useEffect(() => {
    let animationId = 0;

    const step = (time: number) => {
      const timeDelta =
        (time - animationState.current.time) / 1000 / timeSlowdown;

      // prevent animation jump when tab is inactive
      if (timeDelta > 0.1) {
        animationState.current.time = time;
        animationId = requestAnimationFrame(step);
        return;
      }

      // stop animation to save battery
      const allElementsAreAtRest = animationState.current.elements.every(
        (el) => el.velocity === 0 && spring.position === el.position,
      );
      if (allElementsAreAtRest) {
        return;
      }

      // calculate next position and velocity
      const next = animationState.current.elements.map((el, i) => {
        const {
          damping,
          position: springPosition,
          springStiffness,
          precision,
        } = spring;

        const { position, velocity, element, transform } = el;
        if (element === null) throw new Error("Element is null");

        const springForce = (springPosition - position) * springStiffness;
        const dampingForce = -velocity * damping;
        const totalForce = springForce + dampingForce;
        const nextVelocity = velocity + totalForce * timeDelta;
        const nextPosition = position + nextVelocity * timeDelta;

        if (
          Math.abs(velocity) < precision &&
          Math.abs(springPosition - position) < precision
        ) {
          return {
            ...el,
            position: springPosition,
            velocity: 0,
          };
        }

        return {
          ...el,
          position: nextPosition,
          velocity: nextVelocity,
        };
      });

      // start transform
      next.forEach((el) => {
        el.transform(el.position, el.element!);
      });

      // update state
      animationState.current = {
        ...animationState.current,
        time,
        elements: next,
      };

      // next frame
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [spring]);

  return (
    <div className="grid h-screen w-screen justify-center pb-[100px]">
      <div className="flex flex-col-reverse gap-7">
        <div
          className="z-30 aspect-square w-[100px] cursor-pointer rounded-full bg-black"
          onClick={() => {
            setFloat((x) => !x);
          }}
        />
        {buttons.map((color, i) => {
          return (
            <div
              ref={(element) => {
                if (element === null) return;
                animationState.current.elements[i]!.element = element;
              }}
              key={color}
              className="aspect-square w-[100px] rounded-full"
              style={{
                backgroundColor: color,
                zIndex: 10 - i,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
