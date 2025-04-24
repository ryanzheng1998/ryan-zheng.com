import { preset } from "@/config/preset";
import { useRequestAnimation } from "@/hooks/useRequestAnimation";
import { useRef } from "react";

export const useSpring = <T extends HTMLElement | SVGElement>(config: {
  springPosition: number;
  stiffness?: number;
  damping?: number;
  precision?: number;
  timeSlowdown?: number;
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
    const {
      springPosition,
      stiffness = preset.noWobble.stiffness,
      damping = preset.noWobble.damping,
      precision = 0.01,
      timeSlowdown = 1,
    } = config;
    const timeDelta =
      (time - animationState.current.time) / 1000 / timeSlowdown;

    // Prevent animation jump when tab is inactive
    if (timeDelta > 0.1) {
      animationState.current.time = time;
      return true;
    }

    // Cancel animation frame when animation stop
    if (
      velocity < precision &&
      Math.abs(position - springPosition) < precision
    ) {
      config.transform?.(springPosition, element);
      animationState.current = {
        ...animationState.current,
        time,
        position: springPosition,
        velocity: 0,
      };
      return false;
    }

    // Spring force calculation
    const springForce = (springPosition - position) * stiffness;
    const dampingForce = -velocity * damping;
    const totalForce = springForce + dampingForce;
    const nextVelocity = velocity + totalForce * timeDelta;
    const nextPosition = position + nextVelocity * timeDelta;

    config.transform?.(nextPosition, element);

    animationState.current = {
      ...animationState.current,
      time,
      position: nextPosition,
      velocity: nextVelocity,
    };

    return true;
  }, []);

  return ref;
};
