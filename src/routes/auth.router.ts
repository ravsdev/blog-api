import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import expressAsyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import { authenticateToken } from '../middleware/authenticateToken'

const publicAuthRouter = Router()
const protectedAuthRouter = Router()
const authRouter = Router()

protectedAuthRouter.use(expressAsyncHandler(authenticateToken))

const changePasswordValidator = [
  body('oldPassword').exists(),
  body('newPassword').exists()
]

publicAuthRouter.post('/login', body('password').exists(), expressAsyncHandler(authController.login))
protectedAuthRouter.post('/change', changePasswordValidator, expressAsyncHandler(authController.changePassword))

authRouter.use(publicAuthRouter, protectedAuthRouter)

export default authRouter
