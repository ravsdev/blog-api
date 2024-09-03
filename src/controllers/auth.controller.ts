import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import * as bcrypt from 'bcrypt'
import { NotFoundError } from '../error/NotFoundError'
import { UnauthorizedError } from '../error/UnauthrozedError'
import { BCRYPT_SALT_ROUNDS, JWT_SECRET } from '../config/config'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

const authService = new AuthService()

export const login = async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body

  if (!validationResult(req).isEmpty()) throw new TypeError('Contraseña requerida')

  const adminPassword = await authService.getAdminPassword()

  if (adminPassword === null) throw new NotFoundError('Contraseña de administrador no encontrada')
  console.log(password, adminPassword)
  const isMatch = await bcrypt.compare(password, adminPassword)

  if (!isMatch) throw new UnauthorizedError('Contraseña incorrecta')

  // Create a JWT token
  const token = jwt.sign({}, JWT_SECRET, { expiresIn: '30d' })

  res.json({ token })
}

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  /*
   #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ChangePassword"
                    }
                }
            }
        }
    #swagger.responses[200] = { description: 'Contraseña cambiada correctamente.' }
    #swagger.responses[401] = { description: 'Contraseña incorrecta' }
 */
  const { newPassword, oldPassword } = req.body
  if (!validationResult(req).isEmpty()) throw new TypeError('Contraseña requerida')

  const adminPassword = await authService.getAdminPassword()

  if (adminPassword === null) throw new NotFoundError('Contraseña de administrador no encontrada')

  const isMatch = await bcrypt.compare(oldPassword, adminPassword)

  if (!isMatch) throw new UnauthorizedError('Contraseña incorrecta')

  const newPasswordHash = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS)

  const result = await authService.changeAdminPassword(newPasswordHash)

  if (!result) throw new Error()

  res.json({
    status: 200,
    message: 'Contraseña cambiada correctamente.'
  })
}

// Swagger-autogen fix
export const swaggerIgnoreFn = (): void => {}
