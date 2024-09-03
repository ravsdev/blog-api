import { CustomError } from './CustomError'

export class ForbiddenError extends CustomError {
  constructor (message: string) {
    super(message)
    this.name = 'ForbiddenError'
    this.status = 403
  }
}
