// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Response } from '../../../api-interface/v1/auth-hello'
import { delay } from '../../../lib/side-effect/delay'
import { verifyToken } from '../../../lib/verifyToken'
import { ACCESS_KEY } from './login'

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const tokenBearer = req.headers.authorization
  const token = tokenBearer?.slice(7)

  await delay(2)

  if (token === undefined || !verifyToken(ACCESS_KEY, token)) {
    res.status(401).end()
    return
  }

  res.status(200).json({ name: 'John Doe' })
}

export default handler
