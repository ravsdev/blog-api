import { DataSource } from 'typeorm'
import { Post } from '../entity/Post'
import getDatabaseType from '../utils/getDatabaseType'
import { Tag } from '../entity/Tag'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from './config'
import { AdminPassword } from '../entity/AdminPassword'

const databaseType = getDatabaseType(DB_TYPE != null ? DB_TYPE : '')

// Database connection
export const AppDataSource = new DataSource({
  type: databaseType,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Post, Tag, AdminPassword],
  synchronize: true,
  dateStrings: true
})
