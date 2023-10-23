import { BASE_URL } from '@/shared/config'
import { mock } from 'mockjs'
import { DefaultBodyType, matchRequestUrl, MockedRequest, PathParams, RestRequest } from 'msw'
import { SetupServerApi } from 'msw/lib/node'

export const addBaseDataURL = (path: string) => BASE_URL + path

export const getBaseResponseCollectionModel = (
  req: RestRequest<DefaultBodyType, PathParams<string>>,
  entity: Record<string, unknown>
) => {
  const pageSize = +(req.url.searchParams.get('itemsPerPage') || 1000)

  return mock({
    [`hydra:member|${pageSize}`]: [entity],
    'hydra:totalItems': pageSize,
  })
}

export const waitForRequest = (server: SetupServerApi, method: string, url: string) => {
  let requestId = ''
  return new Promise<MockedRequest>((resolve, reject) => {
    server.events.on('request:start', req => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase()
      const matchesUrl = matchRequestUrl(req.url, url).matches
      if (matchesMethod && matchesUrl) {
        requestId = req.id
      }
    })
    server.events.on('request:match', req => {
      if (req.id === requestId) {
        resolve(req)
      }
    })
    server.events.on('request:unhandled', req => {
      if (req.id === requestId) {
        reject(new Error(`The ${req.method} ${req.url.href} request was unhandled.`))
      }
    })
  })
}
