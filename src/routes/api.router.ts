import { Router } from 'express'
import postRouter from './post.router'
import tagRouter from './tag.router'
import authRouter from './auth.router'
import storageRouter from './storage.router'

const apiRouter = Router()

// Routes
apiRouter.use('/posts', postRouter)
apiRouter.use('/tags', tagRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/storage', storageRouter)

export default apiRouter
