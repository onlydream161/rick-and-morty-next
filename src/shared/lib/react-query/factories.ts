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
import { getBetweenFilterValue } from '@/shared/helpers'
import { ParsedUrlQuery } from 'querystring'

export type CustomQueryKey = unknown[]

export type QueryType = 'query' | 'infinite'

export type QueryFetchFunction<Response> = (
  config?: AxiosRequestConfig | undefined
) => QueryFunction<Response, CustomQueryKey>

export type QueryFilters<Filters> = Partial<Filters & { locale: string }>

export type QueryParams<Response, FiltersContent = {}> = Omit<
  UseQueryOptions<Response, AxiosError, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
> & { key?: string[]; filters?: QueryFilters<FiltersContent> }

export type InfiniteQueryParams<Response, FiltersContent = {}> = Omit<
  UseInfiniteQueryOptions<Response, AxiosError, Response, Response, CustomQueryKey>,
  'queryKey' | 'queryFn'
> & { key?: string[]; filters?: QueryFilters<FiltersContent> }

export const getSingleRequestTarget = (id: number | string, target: string): string =>
  // eslint-disable-next-line
  target.replace(/\:id/, String(id))

export const queryFetchFactory =
  <Response, RequestData = undefined>(url: string, defaultConfig: AxiosRequestConfig = {}) =>
  (config?: AxiosRequestConfig) =>
  async () => {
    const { data } = await httpClient<Response, RequestData>(merge({ url }, defaultConfig, config))
    return data
  }

export type QueryFactoryReturnValue<
  Response,
  FiltersContent,
  PrefetchResult extends Response | InfiniteData<Response>,
  Params extends QueryParams<Response, FiltersContent> | InfiniteQueryParams<Response, FiltersContent>,
  QueryResult extends UseQueryResult | UseInfiniteQueryResult
> = (config?: (filters: FiltersContent & { locale?: string }) => AxiosRequestConfig) => {
  prefetch: (
    queryClient: QueryClient,
    preBuildFilters?: ParsedUrlQuery,
    params?: Params
  ) => Promise<{
    response?: PrefetchResult
    currentQueryKey: CustomQueryKey
  }>
  useHookInitializer: (params?: Params) => QueryResult & { currentQueryKey: CustomQueryKey }
}

export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters?: FiltersContent,
  type?: 'query'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  Response,
  QueryParams<Response, FiltersContent>,
  UseQueryResult<Response, AxiosError>
>
export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters?: FiltersContent,
  type?: 'infinite'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  InfiniteData<Response>,
  InfiniteQueryParams<Response, FiltersContent>,
  UseInfiniteQueryResult<Response, AxiosError>
>
export function queryFactory<Response, FiltersContent = Record<string, unknown>>(
  primaryKey: CustomQueryKey,
  fetch: QueryFetchFunction<Response>,
  initialFilters: FiltersContent = {} as FiltersContent,
  type: QueryType = 'query'
): QueryFactoryReturnValue<
  Response,
  FiltersContent,
  Response | InfiniteData<Response>,
  QueryParams<Response, FiltersContent> | InfiniteQueryParams<Response, FiltersContent>,
  UseQueryResult<Response, AxiosError> | UseInfiniteQueryResult<Response, AxiosError>
> {
  return config => {
    let serverSideFilters: CustomQueryKey

    return {
      prefetch: async (queryClient, preBuildFilters = {}, params) => {
        // Сделано под Symphony backend
        let filtersKey: keyof typeof preBuildFilters
        for (filtersKey in preBuildFilters) {
          const value = preBuildFilters[filtersKey] as string
          if (value) {
            // eslint-disable-next-line
            if (/\[\d+\,\d+\]/.test(value)) {
              preBuildFilters[filtersKey] = getBetweenFilterValue(JSON.parse(value)) as string
              continue
            }
            // eslint-disable-next-line
            if (/\[[\d+\,?]*\]/.test(value)) {
              preBuildFilters[filtersKey] = JSON.parse(value)
            }
          }
        }

        const filters = { ...initialFilters, ...preBuildFilters }

        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key = [...primaryKey, ...(params?.key || []), Object.entries(filters).join()] as CustomQueryKey

        // useHydrate не работает на atomWithUrlLocation, так что нужно на server side передавать initial filters через замыкание
        serverSideFilters = key

        if (type === 'query') {
          await queryClient.prefetchQuery(
            key,
            fetch(config?.(filters) || {}),
            params as QueryParams<Response, FiltersContent>
          )
        } else {
          await queryClient.prefetchInfiniteQuery(
            key,
            fetch(config?.(filters) || {}),
            params as InfiniteQueryParams<Response, FiltersContent>
          )
        }
        return {
          response: queryClient.getQueryData<Response | InfiniteData<Response>>(key),
          currentQueryKey: key,
        }
      },
      useHookInitializer: (params = {}) => {
        const filters = { ...initialFilters, ...params.filters } as FiltersContent & { locale: string }

        // TODO: Нужно протестить, что ключ такого формата не ломает логику react-query
        // Нужно делать копию, т.к. без нее будет мутация оригинального primaryKey из-за push ниже и react-query будет спамить запросы без остановки
        const key =
          serverSideFilters ||
          ([...primaryKey, ...(params?.key || []), Object.entries(filters).join()] as CustomQueryKey)

        let response

        if (type === 'query') {
          // eslint-disable-next-line
          response = useQuery(key, fetch(config?.(filters) || {}), params as QueryParams<Response, FiltersContent>)
        } else {
          //TODO: Стоит сразу описать getNextPageParam для текущего проекта
          // eslint-disable-next-line
          response = useInfiniteQuery(
            key,
            fetch(config?.(filters) || {}),
            params as InfiniteQueryParams<Response, FiltersContent>
          )
        }

        return {
          ...(response as UseQueryResult<Response, AxiosError> | UseInfiniteQueryResult<Response, AxiosError>),
          currentQueryKey: key,
        }
      },
    }
  }
}
