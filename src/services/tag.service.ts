import { Repository } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import { Tag } from '../entity/Tag'

export class TagService {
  private readonly tagRepository: Repository<Tag>

  constructor () {
    this.tagRepository = AppDataSource.getRepository(Tag)
  }

  public async findAll (): Promise<Tag[]> {
    return await this.tagRepository.find()
  }

  public async findByName (name: string): Promise<Tag | null> {
    return await this.tagRepository.findOneBy({
      name
    })
  }

  public async create (post: Partial<Tag>): Promise<Tag> {
    const newPost = this.tagRepository.create(post)
    return await this.tagRepository.save(newPost)
  }

  // public async delete (name: string): Promise<void> {
  //   const tag = await this.findByName(name)
  //   if (tag?.id == null) return
  //   await this.tagRepository.delete(tag.id)
  // }
}
