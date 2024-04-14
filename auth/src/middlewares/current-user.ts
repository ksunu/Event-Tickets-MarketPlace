import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayloadProps {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayloadProps
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next()
  
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayloadProps
    req.currentUser = payload
  } catch (err) {

  }

  next()
}