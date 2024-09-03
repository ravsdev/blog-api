import { Request, Response } from 'express'
import { PostService } from '../services/post.service'
import { NotFoundError } from '../error/NotFoundError'
import { plainToClass } from 'class-transformer'
import { PostDTO } from '../dto/PostDTO'
import { validate } from 'class-validator'
import { Category } from '../entity/Category'
import { TagService } from '../services/tag.service'
import { Tag } from '../entity/Tag'
import { Post } from '../entity/Post'

const postService = new PostService()
const tagService = new TagService()

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const categoryQuery: string = req.query.category as string

  const posts = categoryQuery !== undefined
    ? await postService.findAllByCategory(Category[categoryQuery.toUpperCase() as keyof typeof Category])
    : await postService.findAll()

  const postsDTO = posts.map(post => plainToClass(PostDTO, post))
  res.json(postsDTO)
}

export const findById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)

  if (isNaN(id)) throw new TypeError(`La id '${req.params.id}' no es correcta`)

  const post = await postService.findById(Number(id))

  if (post == null) throw new NotFoundError(`Post con id ${req.params.id} no encontrado`)

  const postDTO = plainToClass(PostDTO, post)
  res.json(postDTO)
}

export const create = async (req: Request, res: Response): Promise<void> => {
  /*
   #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Post"
                    }
                }
            }
        }
 */
  const tags = []
  if (req.body.tags !== undefined) {
    for (const tagName of req.body.tags) {
      let tag = await tagService.findByName(tagName)

      if (tag == null) {
        tag = new Tag()
        tag.name = tagName
      }
      tags.push(tag)
    }
  }

  const post = {
    ...req.body,
    tags
  }
  const newPost = await postService.create(post)

  await validate(newPost)

  const postDTO = plainToClass(PostDTO, newPost)
  res.status(201).json(postDTO)
}

export const update = async (req: Request, res: Response): Promise<void> => {
  /*
   #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Post"
                    }
                }
            }
        }
 */
  const id = Number(req.params.id)

  if (isNaN(id)) throw new TypeError(`La id '${req.params.id}' no es correcta`)

  const post = await postService.findById(id)
  let tags = []
  if (post == null) throw new NotFoundError(`Post con id '${req.params.id}' no encontrado`)

  if (req.body.tags !== undefined) {
    for (const tagName of req.body.tags) {
      let tag = await tagService.findByName(tagName)

      if (tag == null) {
        tag = new Tag()
        tag.name = tagName
      }
      tags.push(tag)
    }
  } else {
    tags = post.tags
  }

  const updatePost: Partial<Post> = {
    ...post,
    ...req.body,
    tags
  }

  const result = await postService.update(Number(req.params.id), updatePost)

  const resultDTO = plainToClass(PostDTO, result)
  res.json(resultDTO)
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  await postService.delete(Number(req.params.id))

  res.status(204).send()
}

// Swagger-autogen fix
export const swaggerIgnoreFn = (): void => {}
