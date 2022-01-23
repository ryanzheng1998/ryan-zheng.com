import { mathMod } from './mathMod'

export const circularRestrict =
  (min: number) =>
  (max: number) =>
  (value: number): number => {
    return mathMod(value - min)(max) + min
  }
