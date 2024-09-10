import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongoose'
import { characterModel } from '@/models/characterModel'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const characterFound = await characterModel.findById(params.id)

  return NextResponse.json(characterFound, { status: 200 })
}
