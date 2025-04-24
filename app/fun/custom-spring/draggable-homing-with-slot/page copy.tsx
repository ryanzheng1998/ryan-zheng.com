"use client";

import { useLayoutEffect, useRef } from "react";

export default function Home() {
  const positionRef = useRef({ x: 0, y: 0 });
  const parentRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const slotPositionRef = useRef<DOMRect[]>([]);

  const updateElementPosition = () => {
    const slotRects = slotPositionRef.current;
    const elementDistance = slotRects.map((rect) => {
      const x = positionRef.current.x - rect.x;
      const y = positionRef.current.y - rect.y;
      return Math.sqrt(x * x + y * y);
    });
    const minDistance = Math.min(...elementDistance);
    const minIndex = elementDistance.indexOf(minDistance);
    const slotRect = slotRects[minIndex];

    if (slotRect === undefined) return;

    draggableRef.current!.style.transform = `translate(${slotRect.x}px, ${slotRect.y}px)`;

    positionRef.current = { x: slotRect.x, y: slotRect.y };
  };

  useLayoutEffect(() => {
    const element = parentRef.current;
    if (element === null) return;

    const updateSlotPosition = () => {
      const slotElements = Array.from(element.children);

      const rects = slotElements.map((slotElement) => {
        const rect = slotElement.getBoundingClientRect();
        return rect;
      });

      slotPositionRef.current = rects;
    };

    const observer = new ResizeObserver(() => {
      updateSlotPosition();
      updateElementPosition();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={parentRef}
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
        ref={draggableRef}
        className="fixed left-0 top-0 cursor-grab select-none rounded bg-green-400 px-9 py-6 text-3xl"
        onPointerDown={(e) => {
          const element = e.currentTarget;
          element.setPointerCapture(e.pointerId);
          element.style.cursor = "grabbing";

          const mouseDownX = e.pageX - positionRef.current.x;
          const mouseDownY = e.pageY - positionRef.current.y;

          const onPointerMove = (e: PointerEvent) => {
            const dx = e.pageX - mouseDownX;
            const dy = e.pageY - mouseDownY;

            element.style.transform = `translate(${dx}px, ${dy}px)`;

            positionRef.current = { x: dx, y: dy };
          };

          const onPointerUp = () => {
            element.releasePointerCapture(e.pointerId);
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
            element.style.cursor = "grab";

            updateElementPosition();
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
