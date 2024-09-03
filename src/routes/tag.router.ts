import { Router } from 'express'
import * as tagController from '../controllers/tag.controller'
import expressAsyncHandler from 'express-async-handler'

const tagRouter = Router()

tagRouter.get('/', expressAsyncHandler(tagController.findAll))

export default tagRouter
