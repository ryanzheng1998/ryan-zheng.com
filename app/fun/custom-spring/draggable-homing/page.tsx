"use client";

import { useRef } from "react";

export default function Home() {
  // use ref to prevent re-render
  const animationRef = useRef({
    x: { position: 0, velocity: 0 },
    y: { position: 0, velocity: 0 },
  });

  return (
    <div className="grid h-screen w-screen place-items-center overflow-hidden">
      <div
        className="cursor-grab select-none rounded bg-green-400 px-9 py-6 text-3xl"
        onPointerDown={(e) => {
          const element = e.currentTarget;
          element.setPointerCapture(e.pointerId);
          element.style.cursor = "grabbing";

          const mouseDownX = e.pageX - animationRef.current.x.position;
          const mouseDownY = e.pageY - animationRef.current.y.position;

          const onPointerMove = (e: PointerEvent) => {
            const dx = e.pageX - mouseDownX;
            const dy = e.pageY - mouseDownY;

            element.style.transform = `translate(${dx}px, ${dy}px)`;

            animationRef.current = {
              x: { position: dx, velocity: 0 },
              y: { position: dy, velocity: 0 },
            };
          };

          const onPointerUp = () => {
            element.releasePointerCapture(e.pointerId);
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
            element.style.cursor = "grab";

            let pointerDownAgain = false;

            element.addEventListener("pointerdown", () => {
              pointerDownAgain = true;
            });

            let lastTime = performance.now();
            const timeSlowdown = 1;
            const precision = 0.01;
            const stffness = 180;
            const damping = 12;

            const step = (t: number) => {
              if (pointerDownAgain) return;
              const timeDelta = (t - lastTime) / 1000 / timeSlowdown;

              if (timeDelta > 0.1) {
                lastTime = t;
                requestAnimationFrame(step);
                return;
              }

              const everyThingStopped = Object.values(
                animationRef.current,
              ).every((x) => x.velocity === 0 && x.position === 0);

              if (everyThingStopped) {
                element.style.transform = "";
                animationRef.current = {
                  x: { position: 0, velocity: 0 },
                  y: { position: 0, velocity: 0 },
                };
                return;
              }

              const next = Object.fromEntries(
                Object.entries(animationRef.current).map(([key, value]) => {
                  const springForce = (0 - value.position) * stffness;
                  const dampingForce = -value.velocity * damping;
                  const totalForce = springForce + dampingForce;
                  const nextVelocity = value.velocity + totalForce * timeDelta;
                  const nextPosition =
                    value.position + nextVelocity * timeDelta;

                  if (
                    Math.abs(value.velocity) < precision &&
                    Math.abs(0 - value.position) < precision
                  ) {
                    return [key, { position: 0, velocity: 0 }];
                  }

                  return [
                    key,
                    { position: nextPosition, velocity: nextVelocity },
                  ];
                }),
              ) as typeof animationRef.current;

              element.style.transform = `translate(${next.x.position}px, ${next.y.position}px)`;

              animationRef.current = next;
              lastTime = t;

              requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
          };

          document.addEventListener("pointermove", onPointerMove);
          document.addEventListener("pointerup", onPointerUp);
        }}
      >
        Draggable
      </div>
    </div>
  );
}
