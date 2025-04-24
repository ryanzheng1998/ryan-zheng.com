"use client";

import { useState } from "react";
import { useSpring } from "./useSpring";

export default function Home() {
  const [show, setShow] = useState(true);

  const ref = useSpring<HTMLDivElement>({
    springPosition: show ? 0 : 1,
    transform: (position, element) => {
      element.style.opacity = `${position}`;
    },
  });

  // const transition = useTransition(show, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });

  // const animatedContent = transition((style, item) => {
  //   if (!item) return;

  //   return (
  //     <a.div className="text-9xl" style={style}>
  //       ✌️
  //     </a.div>
  //   );
  // });

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="text-9xl" ref={ref}>
        ✌️
      </div>
      <button onClick={() => setShow((x) => !x)}>Toggle Show</button>
    </div>
  );
}
