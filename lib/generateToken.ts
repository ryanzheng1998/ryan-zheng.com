import jwt from 'jsonwebtoken'

export const generateToken = <T>(
  key: string,
  content: Record<string, T>
): string => {
  return jwt.sign(content, key)
}
