import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'

export const handleDataSource = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
  if (AppDataSource.isInitialized) return next()

  AppDataSource.initialize().then(async () => {
    next()
  }).catch((error) => console.log(error))
}
