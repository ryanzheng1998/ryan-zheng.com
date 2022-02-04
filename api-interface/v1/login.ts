export type Role = 'admin' | 'user' | 'visitor'

export interface UserData {
  name: string
  token: string
  permissions: Role
  redirect: string
}
