"use client";

import { useRef } from "react";

const list = [
  { value: "hello", color: "red" },
  { value: "world", color: "blue" },
  { value: "this", color: "green" },
  { value: "is", color: "yellow" },
  { value: "a", color: "purple" },
  { value: "list", color: "orange" },
  { value: "of", color: "pink" },
  { value: "items", color: "cyan" },
];

export default function Home() {
  const positionRef = useRef(list.map(() => ({ x: 0, y: 0 })));

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid gap-5">
        {list.map((x, i) => {
          return (
            <div
              key={x.value}
              className="cursor-grab select-none rounded px-5 py-2 text-center"
              style={{ backgroundColor: x.color }}
              onPointerDown={(e) => {
                const element = e.currentTarget;
                element.setPointerCapture(e.pointerId);
                element.style.cursor = "grabbing";

                const mouseDownX = e.pageX - positionRef.current[i]!.x;
                const mouseDownY = e.pageY - positionRef.current[i]!.y;

                const onPointerMove = (e: PointerEvent) => {
                  const dx = e.pageX - mouseDownX;
                  const dy = e.pageY - mouseDownY;

                  element.style.transform = `translate(${dx}px, ${dy}px)`;

                  positionRef.current[i] = { x: dx, y: dy };
                };

                const onPointerUp = () => {
                  element.releasePointerCapture(e.pointerId);
                  document.removeEventListener("pointermove", onPointerMove);
                  document.removeEventListener("pointerup", onPointerUp);
                  element.style.cursor = "grab";
                };

                document.addEventListener("pointermove", onPointerMove);
                document.addEventListener("pointerup", onPointerUp);
              }}
            >
              {x.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
