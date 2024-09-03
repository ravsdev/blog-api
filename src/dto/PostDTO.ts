import { Expose, Transform, Type } from 'class-transformer'
import { Category } from '../entity/Category'
import { Tag } from '../entity/Tag'

export class PostDTO {
  @Expose()
    id: number

  @Expose()
    title: string

  @Expose()
    body: string

  @Expose()
    category: Category

  @Expose()
    imageURL: string

  @Expose()
    isPublished: boolean

  @Expose()
  @Transform(({ value }) => value.map((tag: Tag) => tag.name))
    tags: string[]

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => value.toLocaleString())
    createdAt: Date

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => value.toLocaleString())
    updatedAt: Date
}
