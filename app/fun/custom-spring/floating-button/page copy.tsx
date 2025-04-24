"use client";

import { preset } from "@/config/preset";
import { useRef, useState } from "react";

const buttons = ["red", "green", "blue", "orange"];

export default function Home() {
  const [float, setFloat] = useState(true);
  const refs = useRef<HTMLDivElement[]>([]);

  return (
    <div className="grid h-screen w-screen justify-center pb-[100px]">
      <div className="flex flex-col-reverse gap-7">
        <div
          className="z-30 aspect-square w-[100px] cursor-pointer rounded-full bg-black"
          onClick={() => {
            setFloat((x) => !x);
            const firsts = refs.current.map((element) =>
              element.getBoundingClientRect(),
            );

            refs.current.forEach((element) => {
              element.style.transform = "";
              element.style.position = float ? "absolute" : "relative";
            });

            refs.current.forEach((element, i) => {
              if (element === null) return;
              const first = firsts[i];
              if (first === undefined) return;
              const last = element.getBoundingClientRect();

              // invert
              element.style.transform = `translateY(${first.top - last.top}px)`;

              // play
              let position = first.top - last.top;
              let velocity = 0;
              let time = performance.now();

              const springPosition = 0;
              const stiffness = preset.wobbly.stiffness;
              const damping = preset.wobbly.damping;
              const precision = 0.01;
              const timeSlowdown = 1;

              const step = (t: number) => {
                const timeDelta = (t - time) / 1000 / timeSlowdown;

                if (timeDelta > 0.1) {
                  time = t;
                  requestAnimationFrame(step);
                }

                if (
                  velocity < precision &&
                  Math.abs(position - springPosition) < precision
                ) {
                  element.style.transform = "";
                  return;
                }

                const springForce = (springPosition - position) * stiffness;
                const dampingForce = -velocity * damping;
                const totalForce = springForce + dampingForce;
                const nextVelocity = velocity + totalForce * timeDelta;
                const nextPosition = position + nextVelocity * timeDelta;

                element.style.transform = `translateY(${position}px)`;

                time = t;
                velocity = nextVelocity;
                position = nextPosition;
                requestAnimationFrame(step);
              };

              requestAnimationFrame(step);
            });
          }}
        />
        {buttons.map((color, i) => {
          return (
            <div
              ref={(element) => {
                if (element === null) return;
                refs.current[i] = element;
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
