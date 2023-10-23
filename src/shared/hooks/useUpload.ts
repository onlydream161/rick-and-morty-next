import { AxiosError, AxiosRequestConfig, AxiosResponse, Cancel } from 'axios'
import { RcFile, UploadRequestError, UploadRequestOption } from 'rc-upload/lib/interface'
import { useRef, useState } from 'react'
import { FileModel, HydraError, Nullable } from '@/shared/@types'
import { notify, uploadFiles, useTranslate } from '@/shared/lib'

export interface UploadHookProps {
  multiple?: boolean
  optimistic?: boolean
  withOffline?: boolean
  // Изменить возвращаемое значение в зависимости с бэком
  customRequest?: (file: RcFile, config?: AxiosRequestConfig<RcFile>) => Promise<AxiosResponse<FileModel>>
}

export const useUpload = ({ multiple, optimistic, withOffline, customRequest }: UploadHookProps) => {
  const { t } = useTranslate(['common'])

  const [isLoading, setIsLoading] = useState(false)
  const abortController = useRef<Nullable<AbortController>>(null)

  const upload = async ({
    file,
    onSuccess,
    onError,
  }: UploadRequestOption<Partial<FileModel> & { uid: string; loading: boolean; withOffline?: boolean }>) => {
    const rcFile = file as RcFile
    try {
      setIsLoading(true)
      if (!multiple && abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()

      const optimisticFileData = {
        uid: rcFile.uid,
        name: rcFile.name,
        path: rcFile.name,
      }

      optimistic &&
        onSuccess?.({
          ...optimisticFileData,
          loading: true,
        })

      const request = customRequest || uploadFiles

      const response = await request(rcFile, {
        signal: abortController.current.signal,
        withOffline,
      })
      onSuccess?.({ ...response.data, loading: false, uid: rcFile.uid })
    } catch (error) {
      onError?.(error as UploadRequestError)
      if ((error as Cancel).message === 'canceled') return
      if ((error as AxiosError<HydraError>).response?.data?.['hydra:description'] === 'unsupported file format') {
        return notify(t('Unsupported file format'), { status: 'error' })
      }
      notify(t('fileUploadError'), { status: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    setIsLoading,
    upload,
  }
}
