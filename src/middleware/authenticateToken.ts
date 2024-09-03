import { NextFunction, Request, Response } from 'express'
import { JWT_SECRET } from '../config/config'
import { UnauthorizedError } from '../error/UnauthrozedError'
import jwt from 'jsonwebtoken'

export const authenticateToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  // const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token == null) {
    return next(new UnauthorizedError('Debes iniciar sesión como administrador'))
  }

  jwt.verify(token, JWT_SECRET)

  next()
}
