import { AxiosError, AxiosRequestConfig } from 'axios'

export interface OnSubmitProps<T, R extends (config: AxiosRequestConfig<T>) => ReturnType<R>> {
  submitRequest: R
  onSuccess?: (formData: T, response: Awaited<ReturnType<R>>) => Promise<void> | void
  onError?: (error?: AxiosError<unknown>) => Promise<void> | void
}

export const onSubmit =
  <T,>(data: T) =>
  async <R extends (config: AxiosRequestConfig<T>) => ReturnType<R>>({
    submitRequest,
    onSuccess,
    onError,
  }: OnSubmitProps<T, R>) => {
    try {
      const response = await submitRequest({ data })
      onSuccess?.(data, response)
    } catch (error) {
      onError?.(error as AxiosError<unknown>)
    }
  }
