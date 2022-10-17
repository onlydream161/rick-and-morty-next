import { BASE_URL } from '@/shared/config'
import { matchRequestUrl, MockedRequest } from 'msw'
import { SetupServerApi } from 'msw/lib/node'

export const addBaseDataURL = (path: string) => BASE_URL + path

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
