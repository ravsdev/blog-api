import dotenv from 'dotenv'

// Environment file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'

dotenv.config({ path: envFile })

// Port
export const port = parseInt(process.env.PORT ?? '3000', 10)

// Database
export const DB_HOST = process.env.DB_HOST as string
export const DB_PORT = process.env.DB_PORT as string
export const DB_USERNAME = process.env.DB_USERNAME as string
export const DB_PASSWORD = process.env.DB_PASSWORD as string
export const DB_DATABASE = process.env.DB_DATABASE as string
export const DB_TYPE = process.env.DB_TYPE as string

// AWS S3 Storage
export const S3_BUCKET = process.env.S3_BUCKET as string
export const S3_ENDPOINT = process.env.S3_ENDPOINT as string
export const S3_REGION = process.env.S3_REGION as string
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string
export const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL as string
// Auth
export const BCRYPT_SALT_ROUNDS = 10
export const JWT_SECRET = process.env.JWT_SECRET as string
export const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD as string
