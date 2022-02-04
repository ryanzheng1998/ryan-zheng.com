import jwt from 'jsonwebtoken'

export const verifyToken = (key: string, token: string) => {
  try {
    const decode = jwt.verify(token, key)
    return decode
  } catch {
    const INVALID_TOKEN = new Error(
      'Invalid token. Maybe the token is expired.'
    )
    return INVALID_TOKEN
  }
}
