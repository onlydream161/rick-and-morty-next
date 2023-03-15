import { useRouter } from 'next/router'
import { queryFactory, QueryParams } from '@/shared/lib'
import { queryFetchViewer } from './viewer-request'
import { User, VIEWER_PRIMARY_KEY } from '../lib'

const viewerQuery = queryFactory(VIEWER_PRIMARY_KEY, queryFetchViewer)()

export const useCurrentViewer = (params?: QueryParams<User>) => {
  const { locale } = useRouter()

  return viewerQuery.useHookInitializer({
    ...params,
    filters: {
      locale,
      ...params?.filters,
    },
  })
}
