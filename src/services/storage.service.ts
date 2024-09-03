import { CompleteMultipartUploadCommandOutput, DeleteObjectCommand, ListObjectsCommand, ListObjectsCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { s3Client } from '../config/s3client'
import { S3_BUCKET } from '../config/config'
import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'stream'

export class StorageService {
  public async getFiles (): Promise<ListObjectsCommandOutput> {
    const command = new ListObjectsCommand({
      Bucket: S3_BUCKET
    })
    return await s3Client.send(command)
  }

  public async upload (file: Express.Multer.File): Promise<CompleteMultipartUploadCommandOutput> {
    const params: PutObjectCommandInput = {
      Bucket: S3_BUCKET,
      Key: file.originalname,
      Body: Readable.from(file.buffer),
      ACL: 'public-read',
      ContentDisposition: 'inline',
      ContentType: file.mimetype
    }

    const parallelUploads3 = new Upload({
      client: s3Client,
      params,

      queueSize: 4,

      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false
    })

    return await parallelUploads3.done()
  }

  public async delete (key: string): Promise<void> {
    const bucketParams = { Bucket: S3_BUCKET, Key: key }
    const command = new DeleteObjectCommand(bucketParams)
    await s3Client.send(command)
  }
}
