import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './Category'
import { IsBoolean, IsDate, IsEnum, IsNotEmpty } from 'class-validator'
import { Tag } from './Tag'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    length: 100,
    type: String
  })
  @IsNotEmpty({ message: 'El título es obligatorio' })
    title: string

  @Column('text')
  @IsNotEmpty({ message: 'El cuerpo es obligatorio' })
    body: string

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.BLOG
  })
  @IsEnum(Category)
    category: Category

  @Column({
    nullable: true,
    type: String
  })
    imageURL: string

  @Column({
    default: true,
    type: Boolean
  })
  @IsBoolean()
    isPublished: boolean

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
    tags: Tag[]

  @CreateDateColumn()
  @IsDate()
    createdAt: Date

  @UpdateDateColumn()
  @IsDate()
    updatedAt: Date
}
