import { Request, Response } from 'express'
import { TagService } from '../services/tag.service'

const tagService = new TagService()

export const findAll = async (_req: Request, res: Response): Promise<void> => {
  const tags = await tagService.findAll()
  res.json(tags.map(tag => tag.name))
}
