import { Entity, Column } from 'typeorm'

@Entity('admin_password')
export class AdminPassword {
  @Column({
    primary: true,
    type: String
  })
    passwordHash: string
}
