import { Request, Response } from 'express'
import { StorageService } from '../services/storage.service'
import { S3_BUCKET, S3_PUBLIC_URL } from '../config/config'
import { getSubstringAfterPattern } from '../utils/getSubstringAfterPattern'

const storageService = new StorageService()

export const getFiles = async (_req: Request, res: Response): Promise<void> => {
  const result = await storageService.getFiles()
  res.json(result.Contents?.map(({ Key }) => `${S3_PUBLIC_URL}/${S3_BUCKET}/` + encodeURIComponent(Key as string)))
}

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
/*  #swagger.parameters['file'] = {
      in: 'formData',
      description: 'File to upload',
      required: true,
      type: 'file'
    }
*/
  const file = req.file as Express.Multer.File
  const result = await storageService.upload(file)

  res.json({
    status: 200,
    message: 'File uploaded',
    url: `${S3_PUBLIC_URL}/${S3_BUCKET}/` + encodeURIComponent(result?.Key as string)
  })
}

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
/*  #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/DeleteImage"
                  }
              }
          }
      }
*/
  const key = getSubstringAfterPattern(req.body.url, S3_BUCKET)
  await storageService.delete(decodeURIComponent(key))
  res.status(204).send()
}

// Swagger-autogen fix
export const swaggerIgnoreFn = (): void => {}
