export const remove =
  (start: number) =>
  (count: number) =>
  <T>(list: T[]) => {
    return [...list.slice(0, start), ...list.slice(start + count)]
  }
