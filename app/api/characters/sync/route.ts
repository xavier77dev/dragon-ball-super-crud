import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongoose'
import { characterModel } from '@/models/characterModel'
import { CharacterResponse } from '@/interfaces/character'

const URL_DBZ_CHARACTERS = `${process.env.API_DRAGONBALL}/characters`

export async function GET(request: NextRequest) {
  await connectDB()

  const response = await fetch(URL_DBZ_CHARACTERS)
  const characters: CharacterResponse = await response.json()

  const userId = request.headers.get('userId')

  await characterModel.deleteMany({ owner: userId })

  for (const character of characters.items) {
    await characterModel.create({
      name: character.name,
      ki: character.ki || '',
      image: character.image || '',
      maxKi: character.maxKi || '',
      gender: character.gender || '',
      race: character.race || 'Unknown',
      description: character.description || '',
      affiliation: character.affiliation || '',
      owner: userId
    })
  }

  return NextResponse.json(
    { message: 'Characters synchronized successfully' },
    { status: 200 }
  )
}
