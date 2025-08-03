// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signJwt } from '@/lib/jwt'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    const user = Array.isArray(rows) && rows[0]

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = signJwt({ id: user.id, email: user.email })

    return NextResponse.json({ token })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
