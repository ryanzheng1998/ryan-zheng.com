import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export const useSpring = <T extends HTMLElement>(config: {
  springPosition: number;
  stiffness: number;
  damping: number;
  transform: (position: number, ref: T) => void;
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
    const { springPosition, stiffness, damping } = config;
    const timeDelta = time - animationState.current.time;

    const springForce = (springPosition - position) * stiffness;
    const dampingForce = -velocity * damping;
    const totalForce = springForce + dampingForce;
    const nextVelocity = velocity + totalForce * timeDelta;
    const nextPosition = position + nextVelocity * timeDelta;

    config.transform(nextPosition, element);

    animationState.current = {
      ...animationState.current,
      time,
      position: nextPosition,
      velocity: nextVelocity,
    };
  }, []);

  return ref;
};
