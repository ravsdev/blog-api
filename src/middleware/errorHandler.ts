import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../error/NotFoundError'
import { QueryFailedError } from 'typeorm'
import { UnauthorizedError } from '../error/UnauthrozedError'
import { ForbiddenError } from '../error/ForbiddenError'
import { JsonWebTokenError } from 'jsonwebtoken'
import { MulterError } from 'multer'
import { NoSuchKey } from '@aws-sdk/client-s3'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(error.stack)
  if (error instanceof SyntaxError ||
    error instanceof TypeError ||
    error instanceof QueryFailedError ||
    error instanceof JsonWebTokenError ||
    error instanceof MulterError ||
    error instanceof NoSuchKey) {
    res.status(400).json({
      status: 400,
      error: error.message
    })
  } else if (error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError) {
    res.status(error.status).json({
      status: error.status,
      error: error.message
    })
  } else {
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error'
    })
  }
}
