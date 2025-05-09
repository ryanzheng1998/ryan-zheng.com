import { DependencyList, useEffect, useRef } from "react";

export const useRequestAnimation = (
  callback: (time: DOMHighResTimeStamp) => void | boolean,
  deps?: DependencyList,
) => {
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const step = (time: number) => {
      const shouldContinue = callback(time);

      if (shouldContinue === false) {
        return;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...(deps ?? [])]);
};
