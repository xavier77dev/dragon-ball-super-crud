import CryptoJS from 'crypto-js'
import { NextResponse } from 'next/server'

import { generateJWT } from '@/lib/jwt'
import { userModel } from '@/models/userModel'
import { UserLoginDto } from '@/interfaces/user'
import { connectDB } from '@/lib/mongoose'

export async function POST(request: Request) {
  try {
    await connectDB()

    const body: UserLoginDto = await request.json()
    const { username, password } = body

    const userFound = await userModel.findOne({ username })

    if (!userFound)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const decryptedPassword = CryptoJS.AES.decrypt(
      userFound.password,
      process.env.PASSWORD_SECRET!
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPassword !== password)
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )

    const token = await generateJWT({ _id: userFound._id })

    return NextResponse.json({
      message: 'Login successful',
      token
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 })
  }
}
