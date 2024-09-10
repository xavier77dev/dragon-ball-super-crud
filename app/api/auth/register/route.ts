import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'

import { connectDB } from '@/lib/mongoose'
import { userModel } from '@/models/userModel'
import { UserRegisterDto } from '@/interfaces/user'

export async function POST(request: NextRequest) {
  await connectDB()

  try {
    const body: UserRegisterDto = await request.json()
    const { username, password } = body

    const userFound = await userModel.findOne({ username })
    if (userFound)
      return NextResponse.json(
        { message: 'Username already exists' },
        {
          status: 409
        }
      )

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET!
    ).toString()

    const newUser = new userModel({
      username,
      password: encryptedPassword,
      characters: null
    })

    await newUser.save()

    return NextResponse.json(
      { message: 'User registered successfully' },
      {
        status: 201
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error registering user' },
      {
        status: 500
      }
    )
  }
}
