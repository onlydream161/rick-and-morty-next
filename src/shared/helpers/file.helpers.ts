import { FileModel } from '@/shared/@types'
import { extension } from 'mime-types'

export const getFileExtension = (file: FileModel) => extension(file.mimeType)

export const getFileNameWithoutExtension = (name: string) => name.replace(/\.[^.]*$/, '')

export const forceDownload = async (url: string, filename: string) => {
  const a = document.createElement('a')
  a.download = filename
  a.href = url
  // For Firefox https://stackoverflow.com/a/32226068
  document.body.appendChild(a)
  a.click()
  a.remove()
  return url
}
export const convertBase64ToBlob = (base64: string) =>
  new Blob([Buffer.from(base64.split(',')[1], 'base64')], { type: 'image/png' })
