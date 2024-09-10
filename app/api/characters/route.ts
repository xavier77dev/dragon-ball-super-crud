import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongoose'
import { userModel } from '@/models/userModel'
import { characterModel } from '@/models/characterModel'
import { CharacterCreateDto } from '@/interfaces/character'

export async function GET(request: NextRequest) {
  await connectDB()

  const userId = request.headers.get('userId')

  const characters = await characterModel.find({ owner: userId })

  return NextResponse.json(characters)
}

export async function POST(request: NextRequest) {
  await connectDB()

  const body: CharacterCreateDto = await request.json()

  const userId = request.headers.get('userId')

  const userFound = await userModel.findById(userId)
  if (!userFound)
    return NextResponse.json({ message: 'User not found' }, { status: 404 })

  const newCharacter = new characterModel({
    ...body,
    owner: userId
  })

  const savedCharacter = await newCharacter.save()

  return NextResponse.json(savedCharacter, { status: 201 })
}
