import { AxiosError, AxiosRequestConfig } from 'axios'
import { merge } from 'lodash'
import { useRouter } from 'next/router'
import { QueryClient, QueryFunction, useQuery, UseQueryOptions } from 'react-query'
import { httpClient } from '@/shared/lib'

export type CustomQueryKey = readonly unknown[] | [string]

export type QueryFetchFunction<Response> = (
  config?: AxiosRequestConfig | undefined
) => QueryFunction<Response, CustomQueryKey>

export type QueryParams<Response> = Omit<
  UseQueryOptions<Response, AxiosError, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
>

export const queryFetchFactory =
  <Response, RequestData = undefined>(
    url: string,
    defaultConfig: AxiosRequestConfig = {}
  ): QueryFetchFunction<Response> =>
  (config?: AxiosRequestConfig): QueryFunction<Response, CustomQueryKey> =>
  async () => {
    const { data } = await httpClient<Response, RequestData>(merge({ url }, defaultConfig, config))
    return data
  }

export const queryFactory = <Response, Filters = Record<string, unknown>>(
  primaryKey: string,
  fetch: QueryFetchFunction<Response>,
  initialFilters: Filters,
  config?: (filters: Filters & { locale?: string }) => AxiosRequestConfig
) => {
  return {
    prefetch: async (queryClient: QueryClient, locale?: string, preBuildFilters?: Filters) => {
      const filters = merge(initialFilters, preBuildFilters)
      const key = [primaryKey, locale, ...Object.values(filters)]
      await queryClient.prefetchQuery(key, fetch(config?.(filters) || {}))
      return queryClient.getQueryData(key) as Response
    },
    hookInitializer: (currentFitlers?: Filters) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter()
      const filters = merge(initialFilters, currentFitlers)
      // TODO: Заменить на atomWithQuery, когда в реакт добавят OffScreen и переписать на Suspense
      return (params?: QueryParams<Response>) =>
        useQuery(
          [primaryKey, locale, ...Object.values(filters)],
          fetch(config?.(merge(filters, { locale }) || {})),
          //@ts-expect-error
          params
        )
    },
  }
}
