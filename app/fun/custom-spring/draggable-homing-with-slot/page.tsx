"use client";

import { useRef } from "react";

interface State {
  draggablePositionIndex: number;
  elementPosition: { x: number; y: number };
  element: HTMLDivElement | null;
  parent: HTMLDivElement | null;
  slotPosition: DOMRect[];
}

export default function Home() {
  const stateRef = useRef<State>({
    draggablePositionIndex: 0,
    elementPosition: { x: 0, y: 0 },
    element: null,
    parent: null,
    slotPosition: [],
  });

  return (
    <>
      <div
        ref={(el) => (stateRef.current.parent = el)}
        className="grid h-screen w-screen grid-cols-3 place-items-center overflow-hidden"
      >
        <div className="select-none rounded px-9 py-6 text-3xl text-transparent outline outline-8 outline-gray-500">
          Draggable
        </div>
        <div className="select-none rounded px-9 py-6 text-3xl text-transparent outline outline-8 outline-gray-500">
          Draggable
        </div>
        <div className="select-none rounded px-9 py-6 text-3xl text-transparent outline outline-8 outline-gray-500">
          Draggable
        </div>
      </div>
      <div
        ref={(el) => (stateRef.current.element = el)}
        className="fixed left-0 top-0 cursor-grab select-none rounded bg-green-400 px-9 py-6 text-3xl"
        onPointerDown={(e) => {
          const element = e.currentTarget;
          element.setPointerCapture(e.pointerId);
          element.style.cursor = "grabbing";

          const positionX = stateRef.current.elementPosition.x;
          const positionY = stateRef.current.elementPosition.y;
          const mouseDownX = e.pageX - positionX;
          const mouseDownY = e.pageY - positionY;

          const onPointerMove = (e: PointerEvent) => {
            const dx = e.pageX - mouseDownX;
            const dy = e.pageY - mouseDownY;

            element.style.transform = `translate(${dx}px, ${dy}px)`;

            stateRef.current.elementPosition = { x: dx, y: dy };
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
        Draggable
      </div>
    </>
  );
}
