import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
const EXPIRATION = '1d'

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION })
}

export function verifyJwt(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
