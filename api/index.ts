import app from '../src/app'
import { AppDataSource } from '../src/config/data-source'
import { AuthService } from '../src/services/auth.service'

AppDataSource.initialize().then(async () => {
  const authService = new AuthService()
  await authService.createAdminPassword()
}).catch((error) => console.log(error))

export default app
