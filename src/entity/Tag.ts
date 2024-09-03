import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './Post'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    length: '100',
    unique: true,
    type: String
  })
    name: string

  @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[]
}
