import { create } from "zustand";

interface State {
  from: number;
  springPosition: number;
  stiffness: number;
  damping: number;
  precision: number;
  mass: number;
  timeSlowdown: number;
  initialVelocity: number;
  setState: (config: {
    from?: number;
    springPosition?: number;
    stiffness?: number;
    damping?: number;
    precision?: number;
    mass?: number;
    timeSlowdown?: number;
    initialVelocity?: number;
  }) => void;
}

export const useStore = create<State>((set) => ({
  from: 1,
  springPosition: 0,
  stiffness: 180,
  damping: 12,
  precision: 0.01,
  mass: 1,
  timeSlowdown: 1,
  initialVelocity: 0,
  setState: (config: {
    from?: number;
    springPosition?: number;
    stiffness?: number;
    damping?: number;
    precision?: number;
    mass?: number;
    timeSlowdown?: number;
    initialVelocity?: number;
  }) => {
    set((state) => ({
      ...state,
      ...config,
    }));
  },
}));
