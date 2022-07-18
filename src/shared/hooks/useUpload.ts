import { AxiosRequestConfig, AxiosResponse, Cancel } from 'axios'
import { RcFile, UploadRequestError, UploadRequestOption } from 'rc-upload/lib/interface'
import { useRef, useState } from 'react'
import { FileModel, Nullable, TFunction } from '@/shared/@types'
import { notifyError, uploadFiles } from '@/shared/lib'

export interface UploadHookProps {
  multiple?: boolean
  optimistic?: boolean
  t: TFunction
  // Изменить возвращаемое значение в зависимости с бэком
  customRequest?: (file: RcFile, config?: AxiosRequestConfig<RcFile>) => Promise<AxiosResponse<FileModel>>
}

export const useUpload = ({ multiple, optimistic, t, customRequest }: UploadHookProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const abortController = useRef<Nullable<AbortController>>(null)

  const upload = async ({
    file,
    onSuccess,
    onError,
  }: UploadRequestOption<Partial<FileModel> & { loading: boolean }>) => {
    try {
      setIsLoading(true)
      if (!multiple && abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()
      const rcFile = file as RcFile
      const optimisticFileData = {
        uid: rcFile.uid,
        name: rcFile.name,
      }
      optimistic &&
        onSuccess?.({
          ...optimisticFileData,
          loading: true,
        })
      if (customRequest) {
        const response = await customRequest(rcFile, {
          signal: abortController.current.signal,
        })
        onSuccess?.({
          loading: false,
          ...response.data,
        })
      } else {
        await uploadFiles(rcFile, {
          signal: abortController.current.signal,
        })
        // onSuccess?.({ loading: false, ...response.data, uid: rcFile.uid })
      }
    } catch (error) {
      if ((error as Cancel).message === 'canceled') return
      notifyError(t('fileUploadError'))
      onError?.(error as UploadRequestError)
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
