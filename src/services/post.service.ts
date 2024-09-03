import { Repository } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import { Post } from '../entity/Post'
import { Category } from '../entity/Category'

export class PostService {
  private readonly postRepository: Repository<Post>

  constructor () {
    this.postRepository = AppDataSource.getRepository(Post)
  }

  public async findAll (): Promise<Post[]> {
    return await this.postRepository.find({
      relations: {
        tags: true
      }
    })
  }

  public async findAllByCategory (category: Category): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        category
      },
      relations: {
        tags: true
      }
    })
  }

  public async findById (id: number): Promise<Post | null> {
    return await this.postRepository.findOne({
      where: {
        id
      },
      relations: {
        tags: true
      }
    })
  }

  public async findLatest (): Promise<Post | null> {
    return await this.postRepository.createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .getOne()
  }

  public async findLatestByCategory (category: Category): Promise<Post | null> {
    return await this.postRepository.createQueryBuilder('post')
      .where('post.category = :category', { category })
      .orderBy('post.createdAt', 'DESC')
      .getOne()
  }

  public async create (post: Partial<Post>): Promise<Post> {
    const newPost = this.postRepository.create(post)
    return await this.postRepository.save(newPost)
  }

  public async update (id: number, post: Partial<Post>): Promise<Post | null> {
    const updatePost = this.postRepository.create(post)
    updatePost.updatedAt = new Date()
    return await this.postRepository.save(updatePost)
  }

  public async delete (id: number): Promise<void> {
    await this.postRepository.delete(id)
  }
}
