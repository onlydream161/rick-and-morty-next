import { AxiosError, AxiosRequestConfig } from 'axios'
import { merge } from 'lodash'
import {
  InfiniteData,
  QueryClient,
  QueryFunction,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { httpClient } from '@/shared/lib'

export type CustomQueryKey = unknown[]

export type QueryType = 'query' | 'infinite'

export type QueryFetchFunction<Response> = (
  config?: AxiosRequestConfig | undefined
) => QueryFunction<Response, CustomQueryKey>

export type QueryParams<Response> = Omit<
  UseQueryOptions<Response, AxiosError, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
>

export type InfiniteQueryParams<Response> = Omit<
  UseInfiniteQueryOptions<Response, AxiosError, Response, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
>

export const queryFetchFactory =
  <Response, RequestData = undefined>(url: string, defaultConfig: AxiosRequestConfig = {}) =>
  (config?: AxiosRequestConfig) =>
  async () => {
    const { data } = await httpClient<Response, RequestData>(merge({ url }, defaultConfig, config))
    return data
  }

export type QueryFactoryReturnValue<
  Response,
  Filters,
  PrefetchResult extends Response | InfiniteData<Response>,
  Params extends QueryParams<Response> | InfiniteQueryParams<Response>,
  QueryResult extends UseQueryResult | UseInfiniteQueryResult
> = (
  primaryKey: CustomQueryKey,
  config?: (filters: Filters & { locale?: string }) => AxiosRequestConfig
) => {
  prefetch: (
    queryClient: QueryClient,
    preBuildFilters?: Partial<Filters & { locale: string }>
  ) => Promise<{
    response?: PrefetchResult
    currentQueryKey: CustomQueryKey
  }>
  useHookInitializer: (
    currentFitlers?: Partial<Filters & { locale: string }>,
    params?: Params
  ) => QueryResult & { currentQueryKey: CustomQueryKey }
}

export function queryFactory<Response, Filters = Record<string, unknown>>(
  fetch: QueryFetchFunction<Response>,
  initialFilters?: Filters,
  type?: 'query'
): QueryFactoryReturnValue<Response, Filters, Response, QueryParams<Response>, UseQueryResult<Response, AxiosError>>
export function queryFactory<Response, Filters = Record<string, unknown>>(
  fetch: QueryFetchFunction<Response>,
  initialFilters?: Filters,
  type?: 'infinite'
): QueryFactoryReturnValue<
  Response,
  Filters,
  InfiniteData<Response>,
  InfiniteQueryParams<Response>,
  UseInfiniteQueryResult<Response, AxiosError>
>
export function queryFactory<Response, Filters = Record<string, unknown>>(
  fetch: QueryFetchFunction<Response>,
  initialFilters: Filters = {} as Filters,
  type: QueryType = 'query'
): QueryFactoryReturnValue<
  Response,
  Filters,
  Response | InfiniteData<Response>,
  QueryParams<Response> | InfiniteQueryParams<Response>,
  UseQueryResult<Response, AxiosError> | UseInfiniteQueryResult<Response, AxiosError>
> {
  return (primaryKey, config) => {
    return {
      prefetch: async (queryClient, preBuildFilters) => {
        const filters = { ...initialFilters, ...preBuildFilters }
        const key = [...primaryKey] as CustomQueryKey
        Object.keys(filters).length && key.push(filters)
        if (type === 'query') {
          await queryClient.prefetchQuery(key, fetch(config?.(filters) || {}))
        } else {
          await queryClient.prefetchInfiniteQuery(key, fetch(config?.(filters) || {}))
        }
        return {
          response: queryClient.getQueryData<Response | InfiniteData<Response>>(key),
          currentQueryKey: key,
        }
      },
      useHookInitializer: (currentFitlers, params) => {
        const filters = { ...initialFilters, ...currentFitlers } as Filters
        const key = [...primaryKey] as CustomQueryKey
        Object.keys(filters).length && key.push(filters)

        let response

        if (type === 'query') {
          response = useQuery(key, fetch(config?.(filters) || {}), params as QueryParams<Response>) // eslint-disable-line react-hooks/rules-of-hooks
        } else {
          //TODO: Стоит сразу описать getNextPageParam для текущего проекта
          response = useInfiniteQuery(key, fetch(config?.(filters) || {}), params as InfiniteQueryParams<Response>) // eslint-disable-line react-hooks/rules-of-hooks
        }

        return {
          ...(response as UseQueryResult<Response, AxiosError> | UseInfiniteQueryResult<Response, AxiosError>),
          currentQueryKey: key,
        }
      },
    }
  }
}
