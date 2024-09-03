import { Repository } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import { AdminPassword } from '../entity/AdminPassword'
import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS, DEFAULT_ADMIN_PASSWORD } from '../config/config'

export class AuthService {
  private readonly authRepository: Repository<AdminPassword>

  constructor () {
    this.authRepository = AppDataSource.getRepository(AdminPassword)
  }

  public async createAdminPassword (): Promise<void> {
    const existingRecord = await this.authRepository.findAndCount()
    if (existingRecord[1] === 0) {
      const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS)
      const adminPassword = this.authRepository.create({ passwordHash })
      await this.authRepository.save(adminPassword)
    }
  }

  public async getAdminPassword (): Promise<string | null> {
    const adminConfig = await this.authRepository.createQueryBuilder('admin').getOne()
    return (adminConfig !== null) ? adminConfig.passwordHash : null
  }

  public async changeAdminPassword (newPassword: string): Promise<boolean> {
    await this.authRepository.createQueryBuilder()
      .update()
      .set({ passwordHash: newPassword })
      .execute()

    return true
  }
}
