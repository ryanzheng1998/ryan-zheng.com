export const adjust =
  (index: number) =>
  <T, U>(fn: (a: T) => U) =>
  (list: T[]): (T | U)[] => {
    if (index >= list.length || index < 0) return list

    return [...list.slice(0, index), fn(list[index]), ...list.slice(index + 1)]
  }
