import { NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongoose'
import { characterModel } from '@/models/characterModel'
import { CharacterUpdateDto } from '@/interfaces/character'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()
  const body: CharacterUpdateDto = await request.json()

  const { name, ki, maxKi, race, gender, description, image, affiliation } =
    body

  const characterFound = await characterModel.findById(params.id)
  if (!characterFound)
    return NextResponse.json(
      { message: 'Character not found' },
      { status: 404 }
    )

  characterFound.ki = ki || characterFound.ki
  characterFound.name = name || characterFound.name
  characterFound.race = race || characterFound.race
  characterFound.image = image || characterFound.image
  characterFound.maxKi = maxKi || characterFound.maxKi
  characterFound.gender = gender || characterFound.gender
  characterFound.description = description || characterFound.description
  characterFound.affiliation = affiliation || characterFound.affiliation

  await characterFound.save()

  return NextResponse.json(
    { message: 'Character updated successfully', character: characterFound },
    { status: 200 }
  )
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const characterDeleted = await characterModel.findByIdAndDelete(params.id)

  if (!characterDeleted)
    return NextResponse.json(
      { message: 'Character not found' },
      { status: 404 }
    )

  return NextResponse.json(
    { message: 'Character deleted successfully' },
    { status: 200 }
  )
}
