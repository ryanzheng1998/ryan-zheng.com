export const mathMod =
  (dividend: number) =>
  (modulus: number): number => {
    if (modulus < 1) return NaN
    return ((dividend % modulus) + modulus) % modulus
  }
