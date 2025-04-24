"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    let animationId = 0;

    const step = (time: number) => {
      if (stop) return;
      const element = ref.current;
      if (element === null) return;
      element.innerHTML = time.toString();
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [stop]);

  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="grid place-items-center">
        <p ref={ref}>0</p>
        <button
          onClick={() => {
            setStop((x) => !x);
          }}
        >
          {stop ? "Start" : "Stop"}
        </button>
      </div>
    </div>
  );
}
