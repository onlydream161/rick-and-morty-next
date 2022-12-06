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
> = (config?: (filters: Filters & { locale?: string }) => AxiosRequestConfig) => {
  prefetch: (
    queryClient: QueryClient,
    preBuildFilters?: Partial<Filters & { locale: string }>,
    params?: Params
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
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters?: Filters,
  type?: 'query'
): QueryFactoryReturnValue<Response, Filters, Response, QueryParams<Response>, UseQueryResult<Response, AxiosError>>
export function queryFactory<Response, Filters = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
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
  primaryKey: CustomQueryKey,
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
  return config => {
    return {
      prefetch: async (queryClient, preBuildFilters, params) => {
        const filters = { ...initialFilters, ...preBuildFilters }
        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key = [...primaryKey, Object.values(filters).join()] as CustomQueryKey

        if (type === 'query') {
          await queryClient.prefetchQuery(key, fetch(config?.(filters) || {}), params as QueryParams<Response>)
        } else {
          await queryClient.prefetchInfiniteQuery(
            key,
            fetch(config?.(filters) || {}),
            params as InfiniteQueryParams<Response>
          )
        }
        return {
          response: queryClient.getQueryData<Response | InfiniteData<Response>>(key),
          currentQueryKey: key,
        }
      },
      useHookInitializer: (currentFitlers, params) => {
        const filters = { ...initialFilters, ...currentFitlers }
        // TODO: Нужно протестить, что ключ такого формата не ломает логику react-query
        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key = [...primaryKey, Object.values(filters).join()] as CustomQueryKey

        let response

        if (type === 'query') {
          // eslint-disable-next-line
          response = useQuery(key, fetch(config?.(filters) || {}), params as QueryParams<Response>)
        } else {
          //TODO: Стоит сразу описать getNextPageParam для текущего проекта
          // eslint-disable-next-line
          response = useInfiniteQuery(key, fetch(config?.(filters) || {}), params as InfiniteQueryParams<Response>)
        }

        return {
          ...(response as UseQueryResult<Response, AxiosError> | UseInfiniteQueryResult<Response, AxiosError>),
          currentQueryKey: key,
        }
      },
    }
  }
}
