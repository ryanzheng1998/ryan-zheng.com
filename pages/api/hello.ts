// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { delay } from '../../lib/side-effect/delay'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await delay(2)
  // res.status(200).send('fa')
  res.status(200).json({ name: 'John Doe' })
  // res.status(404).end()
  // res.status(203).end()
}

export default handler
