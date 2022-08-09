import { AxiosError, AxiosRequestConfig } from 'axios'
import { merge } from 'lodash'
import { QueryClient, QueryFunction, useQuery, UseQueryOptions } from 'react-query'
import { httpClient } from '@/shared/lib'

export type CustomQueryKey = readonly unknown[]

export type QueryFetchFunction<Response> = (
  config?: AxiosRequestConfig | undefined
) => QueryFunction<Response, CustomQueryKey>

export type QueryParams<Response> = Omit<
  UseQueryOptions<Response, AxiosError, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
>

export const queryFetchFactory =
  <Response, RequestData = undefined>(url: string, defaultConfig: AxiosRequestConfig = {}) =>
  (config?: AxiosRequestConfig) =>
  async () => {
    const { data } = await httpClient<Response, RequestData>(merge({ url }, defaultConfig, config))
    return data
  }

export const queryFactory =
  <Filters = Record<string, unknown>>(initialFilters: Filters = {} as Filters) =>
  <Response>(
    primaryKey: string[],
    fetch: QueryFetchFunction<Response>,
    config?: (filters: Filters & { locale?: string }) => AxiosRequestConfig
  ) => {
    return {
      prefetch: async (queryClient: QueryClient, preBuildFilters?: Partial<Filters & { locale: string }>) => {
        const filters = { ...initialFilters, ...preBuildFilters }
        const key = [...primaryKey] as unknown[]
        Object.keys(filters).length && key.push(filters)
        await queryClient.prefetchQuery(key, fetch(config?.(filters) || {}))
        return {
          response: queryClient.getQueryData(key) as Response,
          currentQueryKey: key,
        }
      },
      useHookInitializer: (currentFitlers?: Partial<Filters & { locale: string }>, params?: QueryParams<Response>) => {
        const filters = { ...initialFilters, ...currentFitlers } as Filters
        const key = [...primaryKey] as unknown[]
        Object.keys(filters).length && key.push(filters)
        // TODO: Заменить на atomWithQuery, когда в реакт добавят OffScreen и переписать на Suspense
        const response = useQuery(
          key,
          fetch(config?.(filters) || {}),
          //@ts-expect-error
          params
        )

        return { ...response, currentQueryKey: key }
      },
    }
  }
