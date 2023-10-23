import { FileModel } from '@/shared/@types'
import { httpClient } from '@/shared/lib'
import { AxiosRequestConfig } from 'axios'
import { RcFile } from 'rc-upload/lib/interface'

const createFileFormData = (formData: FormData, file: RcFile, withOffline?: boolean) => {
  formData.append('file', file)
  formData.append('originalName', file.name)
  formData.append('withOffline', withOffline ? 'true' : 'false')
}

export const uploadFiles = (
  files: RcFile | RcFile[],
  config: Omit<AxiosRequestConfig<RcFile>, 'data'> & { withOffline?: boolean } = {}
) => {
  const data = new FormData()
  if (Array.isArray(files)) {
    for (const file of files) {
      createFileFormData(data, file, config.withOffline)
    }
  } else {
    createFileFormData(data, files, config.withOffline)
  }
  return httpClient<FileModel, FormData>({
    ...config,
    data,
    url: '/files',
    method: 'POST',
  })
}
