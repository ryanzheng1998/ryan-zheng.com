import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export const useSpring = <T extends HTMLElement>(config: {
  springPosition: number;
  stiffness?: number;
  damping?: number;
  precision?: number;
  transform?: (position: number, ref: T) => void;
}) => {
  const ref = useRef<T>(null);
  const animationState = useRef({
    time: 0,
    position: 0,
    velocity: 0,
  });

  useRequestAnimation((time) => {
    const element = ref.current;

    if (element === null) return;

    const { position, velocity } = animationState.current;
    const { springPosition } = config;
    const stiffness = config.stiffness ?? 0.4 / 16 / 16 / 16;
    const damping = config.damping ?? 0.8 / 16;
    const precision = config.precision ?? 0.01;
    const timeDelta = time - animationState.current.time;

    // Cancel animation frame when animation stop
    if (
      velocity < precision &&
      Math.abs(position - springPosition) < precision
    ) {
      config.transform?.(springPosition, element);
      return false;
    }

    // Prevent animation jump when tab is inactive
    if (timeDelta > 100) {
      animationState.current.time = time;
      return true;
    }

    // Apply spring force
    const springForce = (springPosition - position) * stiffness;
    const nextVelocity = velocity + springForce * timeDelta;

    const nextPosition = position + velocity * timeDelta;
    const nextVelocity2 = nextVelocity * damping * timeDelta;

    config.transform?.(nextPosition, element);

    animationState.current = {
      ...animationState.current,
      time,
      position: nextPosition,
      velocity: nextVelocity2,
    };
  }, []);

  return ref;
};
