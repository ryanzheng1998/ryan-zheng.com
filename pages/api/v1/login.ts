import { NextApiRequest, NextApiResponse } from 'next'
import { Role, SubmitBody, UserData } from '../../../api-interface/v1/login'
import { generateToken } from '../../../lib/generateToken'

// ----------------------
// fake data
// ----------------------
const userList: {
  username: string // unique identifier
  name: string
  role: Role
  password: string
}[] = [
  {
    username: 'Ryan',
    name: 'random name',
    role: 'admin',
    password: 'test123',
  },
  {
    username: 'Iris',
    name: 'random name',
    role: 'user',
    password: 'test123',
  },
  {
    username: 'Billy',
    name: 'random name',
    role: 'visitor',
    password: 'test123',
  },
  {
    username: 'Kyrie',
    name: 'random name',
    role: 'user',
    password: 'test123',
  },
  {
    username: 'Bob',
    name: 'random name',
    role: 'admin',
    password: 'test123',
  },
]

// ----------------------
// enviroment variable. should set this in the .env file in production
// ----------------------
export const ACCESS_KEY = 'randomstring'
export const REFRESH_KEY = 'randomstring2'

// ----------------------
// session cache. should replace it with redis in production
// ----------------------
export const global: Record<string, string> = {}

// ----------------------
// handler
// ----------------------
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserData>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      const { username, password, rememberMe } = req.body

      console.log(username, password, rememberMe)
      console.log(req)

      if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof rememberMe !== 'boolean' ||
        username === '' ||
        password === ''
      ) {
        res.status(400).end()
        return
      }

      const currentUser = userList.find((v) => v.username === username)

      // username not found
      if (currentUser === undefined) {
        res.status(404).end()
        return
      }

      if (currentUser.password !== password) {
        res.status(403).end()
        return
      }

      if (rememberMe) {
        const expiresAt = new Date(Date.now() / 1000 + 7 * 24 * 60 * 60) // 7 days

        const refreshToken = generateToken(REFRESH_KEY, {
          username,
          iat: ~~(Date.now() / 1000),
          exp: ~~expiresAt,
        })

        res.setHeader('Set-Cookie', [
          `refreshToken=${refreshToken}; expires=${expiresAt.toUTCString()}; path=/; HttpOnly`,
        ])

        global[username] = refreshToken
      } else {
        const expiresAt = new Date(Date.now() / 1000 + 20 * 60) // 20 min

        const refreshToken = generateToken(REFRESH_KEY, {
          username,
          iat: ~~(Date.now() / 1000),
          exp: ~~expiresAt,
        })

        // session only cookie
        res.setHeader('Set-Cookie', [
          `refreshToken=${refreshToken}; path=/; HttpOnly`,
        ])
      }

      const accessToken = generateToken(ACCESS_KEY, {
        username,
        iat: ~~(Date.now() / 1000),
        exp: ~~(Date.now() / 1000 + 15 * 60),
      })

      res.status(200).json({
        name: currentUser.username,
        token: accessToken,
        permissions: currentUser.role,
        redirect: '/post-login',
      })

      return
  }

  res.status(404).end()
}

export default handler
