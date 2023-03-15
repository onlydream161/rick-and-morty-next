import { BaseEntity, FileModel, Nullable } from '@/shared/@types'

export interface User extends BaseEntity {
  name: string
  publicName: string
  firstName: string
  lastName: string
  middleName: string
  avatar: Nullable<FileModel>
  experience: number
}
