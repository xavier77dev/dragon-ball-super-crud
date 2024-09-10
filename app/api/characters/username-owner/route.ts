import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/lib/mongoose'
import { userModel } from '@/models/userModel'

export async function GET(request: NextRequest) {
  await connectDB()

  const userId = request.headers.get('userId')

  const username = await userModel.findById(userId).select('username -_id')

  return NextResponse.json(username, { status: 200 })
}
