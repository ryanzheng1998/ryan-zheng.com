// Todo: fix this

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

export const objectMap =
  <T extends Record<string | number | symbol, U>, U>(object: T) =>
  <V>(fn: (value: U) => U): T => {
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => [k, fn(v)])
    ) as any
  }
