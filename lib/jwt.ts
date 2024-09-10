import { SignJWT } from 'jose'
import type { Types } from 'mongoose'

interface UserPayload {
  _id: Types.ObjectId
}

export const generateJWT = async (payload: UserPayload) => {
  const secretKey = process.env.SECRET_KEY

  if (!secretKey) throw new Error('SECRET_KEY is not defined')

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(payload._id.toString())
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(secretKey))

  return token
}
