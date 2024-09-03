import { port } from './config/config'
import 'reflect-metadata'
import { AppDataSource } from './config/data-source'
import app from './app'
import { AuthService } from './services/auth.service'

AppDataSource.initialize()
  .then(async () => {
    const authService = new AuthService()
    await authService.createAdminPassword()
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  })
  .catch((error) => console.log(error))
