// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Hello } from '../../api-interface/hello'
import { delay } from '../../lib/side-effects/delay'

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Hello>
) => {
  await delay(2)
  // res.status(200).send('fa')
  res.status(200).json({ name: 'John Doe' })
  // res.status(404).end()
  // res.status(203).end()
}

export default handler
