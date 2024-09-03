import { Router } from 'express'
import * as storageController from '../controllers/storage.controller'
import expressAsyncHandler from 'express-async-handler'
import { handleUpload } from '../middleware/handleUpload'
import { authenticateToken } from '../middleware/authenticateToken'

const publicStorageRouter = Router()
const protectedStorageRouter = Router()
const storageRouter = Router()

protectedStorageRouter.use(expressAsyncHandler(authenticateToken))

publicStorageRouter.get('/', expressAsyncHandler(storageController.getFiles))
protectedStorageRouter.post('/upload', handleUpload.single('file'), expressAsyncHandler(storageController.uploadFile))
protectedStorageRouter.delete('/', expressAsyncHandler(storageController.deleteFile))

storageRouter.use(publicStorageRouter, protectedStorageRouter)

export default storageRouter
