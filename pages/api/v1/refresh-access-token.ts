import { NextApiRequest, NextApiResponse } from 'next'
import { generateToken } from '../../../lib/generateToken'
import { verifyToken } from '../../../lib/verifyToken'
import { ACCESS_KEY, global, REFRESH_KEY } from './login'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      const { refreshToken } = req.cookies

      if (typeof refreshToken !== 'string') {
        res.status(400).end()
        return
      }

      const payload = verifyToken(REFRESH_KEY, refreshToken)

      if (payload instanceof Error) {
        res.status(401).end()
        return
      }

      if (typeof payload === 'string' || payload.username === undefined) {
        res.status(400).end()
        return
      }

      const username = payload.username as string

      if (global[username] !== refreshToken) {
        res.status(403).end()
        return
      }

      const newAccessToken = generateToken(ACCESS_KEY, {
        username,
        iat: ~~(Date.now() / 1000),
        exp: ~~(Date.now() / 1000 + 15 * 60),
      })

      res.status(200).json({
        token: newAccessToken,
      })
  }

  res.status(404).end()
}

export default handler
