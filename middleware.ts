import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const bearerToken = request.headers.get('Authorization')
  if (!bearerToken)
    return NextResponse.json(
      { message: 'No autorizado' },
      {
        status: 401
      }
    )

  const token = bearerToken.split(' ')[1]

  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY!)
    )

    const requestHeaders = new Headers(request.headers)

    if (decoded.payload.jti) requestHeaders.set('userId', decoded.payload.jti)

    return NextResponse.next({ request: { headers: requestHeaders } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Token invalido' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/characters/:path*']
}
