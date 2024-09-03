import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import apiRouter from './routes/api.router'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import morgan from 'morgan'
import cors from 'cors'
import { unknownEndpoint } from './middleware/unkownEndPoint'
import expressAsyncHandler from 'express-async-handler'
import { handleDataSource } from './middleware/handleDataSource'

const app = express()
const options = {
  customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css'
}

// Middlewares
app.use(express.json())
app.use(morgan('combined')) // logger
app.use(cors())
app.use(expressAsyncHandler(handleDataSource), apiRouter)

// Routes
app.use('/api/v1', apiRouter)
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))

// Middleware unknown route
app.use(unknownEndpoint)

// Error handling
app.use(errorHandler)

export default app
