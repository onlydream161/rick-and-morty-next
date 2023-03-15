import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import {
  ACCESS_TOKEN_COOKIES_NAME,
  BASE_URL,
  REFRESH_TOKEN_COOKIES_NAME,
  REFRESH_TOKEN_MAX_AGE,
  TOKEN_PATH,
} from '@/shared/config'

const DEFAULT_HEADERS = {
  Accept: 'application/ld+json',
  'Content-Type': 'application/ld+json',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
} as const

export interface AuthTokens {
  token_type: string
  expires?: number
  expires_in?: number
  access_token: string
  refresh_token: string
}

export const setAuthTokensInCookies = (tokens: AuthTokens) => {
  setCookie(null, ACCESS_TOKEN_COOKIES_NAME, tokens.access_token, {
    ...(tokens.expires && { expires: new Date(tokens.expires * 1000) }),
    ...(tokens.expires_in && { maxAge: tokens.expires_in * 60 }),
  })
  setCookie(null, REFRESH_TOKEN_COOKIES_NAME, tokens.refresh_token, { maxAge: REFRESH_TOKEN_MAX_AGE })
}

// Вернуть, если сервис авторизации CasDoor
// const REFRESH_TOKEN_REQUEST_TARGET = '/api/login/oauth/refresh_token'
// const REFRESH_TOKEN_GRANT_TYPE = 'refresh_token'
// const REFRESH_TOKEN_SCOPE = 'read'

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
    // Здесь должен быть запрос на смену токена, добавляется свой в зависимости от проекта
    // const token = await axios.post<AuthTokens>(
    //   CASDOOR_SERVER_URL + REFRESH_TOKEN_REQUEST_TARGET,
    //   {
    //     grant_type: REFRESH_TOKEN_GRANT_TYPE,
    //     scope: REFRESH_TOKEN_SCOPE,
    //     client_id: CASDOOR_CLIENT_ID,
    //     refresh_token,
    //   },
    //   {
    //     headers: DEFAULT_HEADERS,
    //   }
    // )
    // setAuthTokensInCookies(token.data)
    isRefreshing = false
    for (const request of requestQueue) {
      request.resolve(request.config)
    }
    requestQueue = []
    // Присваивается новый access_token полученный из запроса выше
    // access_token = token.data.access_token
  }

  config.headers = {
    ...DEFAULT_HEADERS,
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
