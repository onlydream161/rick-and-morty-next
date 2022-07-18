import { FileModel } from '@/shared/@types'

export const getFileExtension = (file: FileModel) => String(file.path.split('.').pop())
