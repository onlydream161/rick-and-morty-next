import { AxiosError, AxiosRequestConfig } from 'axios'

export interface OnSubmitProps<T, R extends (config: AxiosRequestConfig<T>) => ReturnType<R>> {
  submitRequest: R
  onSuccess?: (formData: T, response: ReturnType<R>) => Promise<void> | void
  onError?: (error: AxiosError) => Promise<void> | void
}

export const onSubmit =
  <T, R extends (config: AxiosRequestConfig<T>) => ReturnType<R>>(data: T) =>
  async ({ submitRequest, onSuccess, onError }: OnSubmitProps<T, R>) => {
    try {
      const response = await submitRequest({ data })
      onSuccess?.(data, response)
    } catch (error) {
      onError?.(error as AxiosError)
    }
  }
