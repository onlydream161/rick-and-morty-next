import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { parseCookies } from 'nookies'
import { BASE_URL, TOKEN_PATH } from '@/shared/config'

interface Request {
  resolve: (value: unknown) => void
  config: AxiosRequestConfig
}

let isRefreshing = false
let requestQueue: Request[] = []

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(requestInterceptor)

async function requestInterceptor(config: AxiosRequestConfig) {
  const cookies = parseCookies()

  const refresh_token = cookies['refresh_token']
  const access_token = cookies['access_token']

  if (config.url?.includes(TOKEN_PATH)) {
    return config
  }

  if (isRefreshing) {
    return new Promise(resolve => {
      requestQueue.push({ resolve, config })
    })
  }

  if (!access_token && refresh_token) {
    isRefreshing = true
    // Здесб должен быть запрос на смену токена, добавляется свой в зависимости от проекта
    // const token = await auth(refresh_token)
    isRefreshing = false
    for (const request of requestQueue) {
      request.resolve(request.config)
    }
    requestQueue = []
    // Присваивается новый access_token полученный из запроса выше
    // access_token = token
  }

  config.headers = {
    Accept: 'application/ld+json',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
    ...config.headers,
  }

  return config
}

export const httpClient = <T, D = undefined>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance(config)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
