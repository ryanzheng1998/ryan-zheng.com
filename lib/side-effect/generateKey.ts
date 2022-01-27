export const generateKey = (): string => {
  const uuid = crypto.randomUUID?.()

  if (uuid) return uuid

  console.log('crypto.randomUUID?.() is not working')

  return `Fake UUID: ${Math.random()}`
}
