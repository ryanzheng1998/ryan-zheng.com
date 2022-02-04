export type Role = 'admin' | 'user' | 'visitor'

export interface SubmitBody {
  username: string
  password: string
  rememberMe: boolean
}

export interface UserData {
  name: string
  token: string
  permissions: Role
  redirect: string
}
