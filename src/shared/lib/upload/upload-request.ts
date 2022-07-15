import { FileModel } from '@/shared/@types'
import { httpClient } from '@/shared/lib'
import { AxiosRequestConfig } from 'axios'
import { RcFile } from 'rc-upload/lib/interface'

export const uploadFiles = (files: RcFile | RcFile[], config: Omit<AxiosRequestConfig<RcFile>, 'data'> = {}) => {
  const data = new FormData()
  if (Array.isArray(files)) {
    for (const file of files) {
      data.append('files', file)
    }
  } else {
    data.append('files', files)
  }
  return httpClient<FileModel, FormData>({
    ...config,
    data,
    url: '/files',
    method: 'POST',
  })
}
