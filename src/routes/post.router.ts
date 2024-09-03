import { Router } from 'express'
import * as postController from '../controllers/post.controller'
import expressAsyncHandler from 'express-async-handler'
import { authenticateToken } from '../middleware/authenticateToken'

const publicPostRouter = Router()
const protectedPostRouter = Router()
const postRouter = Router()

protectedPostRouter.use(expressAsyncHandler(authenticateToken))

publicPostRouter.get('/', expressAsyncHandler(postController.findAll))
publicPostRouter.get('/:id', expressAsyncHandler(postController.findById))

protectedPostRouter.post('/', expressAsyncHandler(postController.create))
protectedPostRouter.put('/:id', expressAsyncHandler(postController.update))
protectedPostRouter.delete('/:id', expressAsyncHandler(postController.remove))

postRouter.use(publicPostRouter, protectedPostRouter)

export default postRouter
