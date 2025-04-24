"use client";

import { useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [x, setX] = useState(0);

  const ref = useSpring<HTMLDivElement>({
    springPosition: x,
    stiffness: 0.4 / 16 / 16 / 16,
    damping: 0.8 / 16,
    transform: (position, element) => {
      element.style.transform = `translateX(${position}px)`;
    },
  });

  return (
    <div>
      <div className="h-[300px] w-[300px] bg-green-500" ref={ref} />
      <button
        onClick={() => {
          setX(x === 0 ? 500 : 0);
        }}
      >
        Reverse Spring
      </button>
    </div>
  );
}
