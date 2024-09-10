import type { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  username: string
  password: string
  characters?: Types.ObjectId | null
  createdAt: Date
  updatedAt: Date
}

export type UserLoginDto = Pick<User, 'username' | 'password'>

export type UserRegisterDto = Pick<User, 'username' | 'password'>

export type UserRequest = { _id: Types.ObjectId } & Pick<User, 'username'>
