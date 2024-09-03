import { NotFoundError } from '../error/NotFoundError'

export function getSubstringAfterPattern (url: string, bucket: string): string {
  const patternIndex = url.indexOf(bucket)
  if (patternIndex === -1) {
    throw new NotFoundError(`Bucket '${bucket}' not found in URL`)
  }

  const startIndex = patternIndex + bucket.length + 1

  return url.substring(startIndex)
}
