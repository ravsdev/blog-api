import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../error/NotFoundError'

export const unknownEndpoint = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError('Endpoint not found'))
}
