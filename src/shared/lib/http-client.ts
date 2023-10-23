import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  ACCESS_TOKEN_COOKIES_NAME,
  BASE_URL,
  CASDOOR_CLIENT_ID,
  CASDOOR_SERVER_URL,
  CASDOOR_SESSION_STORAGE_NAME,
  REFRESH_TOKEN_COOKIES_NAME,
  REFRESH_TOKEN_GRANT_TYPE,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_REQUEST_TARGET,
  REFRESH_TOKEN_SCOPE,
  TOKEN_PATH,
} from '../config'
import { captureException, withScope } from '@sentry/core'

const DEFAULT_HEADERS = {
  Accept: 'application/ld+json',
  'Content-Type': 'application/ld+json',
  'Cache-Control': 'no-cache',
} as const

export interface AuthTokens {
  token_type: string
  expires?: number
  expires_in?: number
  access_token: string
  refresh_token: string
}

export const getOrSaveCasdoorState = () => {
  let state = sessionStorage.getItem(CASDOOR_SESSION_STORAGE_NAME)
  if (state !== null) {
    return state
  }
  state = Math.random().toString(36).slice(2)
  sessionStorage.setItem(CASDOOR_SESSION_STORAGE_NAME, state)
  return state
}

export const getSigninUrl = (redirectPath: string) => {
  return `${CASDOOR_SERVER_URL}/login/oauth/authorize?client_id=${CASDOOR_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectPath
  )}&scope=read&state=${getOrSaveCasdoorState()}`
}

const logout = () => {
  destroyCookie(null, REFRESH_TOKEN_COOKIES_NAME, { path: '/' })
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentRole')
    window.location.href = getSigninUrl(window.location.href)
  }
}

const refreshTokenRequest = (refresh_token: string) =>
  axios
    .post<AuthTokens>(
      CASDOOR_SERVER_URL + REFRESH_TOKEN_REQUEST_TARGET,
      {
        grant_type: REFRESH_TOKEN_GRANT_TYPE,
        scope: REFRESH_TOKEN_SCOPE,
        client_id: CASDOOR_CLIENT_ID,
        refresh_token,
      },
      {
        headers: DEFAULT_HEADERS,
      }
    )
    .then(res => {
      setAuthTokensInCookies(res.data)
      return res.data
    })
    .catch(() => logout())

export const setAuthTokensInCookies = (tokens: AuthTokens) => {
  setCookie(null, ACCESS_TOKEN_COOKIES_NAME, tokens.access_token, {
    path: '/',
    ...(tokens.expires && { expires: new Date(tokens.expires * 1000) }),
    ...(tokens.expires_in && { maxAge: tokens.expires_in * 60 }),
  })
  setCookie(null, REFRESH_TOKEN_COOKIES_NAME, tokens.refresh_token, {
    path: '/',
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })
}

interface Request {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
  config: AxiosRequestConfig
}

let isRefreshing = false
let requestQueue: Request[] = []

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use(config => config, responseInterceptor)

async function requestInterceptor(config: AxiosRequestConfig) {
  const cookies = parseCookies()

  const refresh_token = cookies['refresh_token']
  let access_token = cookies['access_token']

  if (config.url?.includes(TOKEN_PATH)) {
    return config
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ resolve, reject, config })
    })
  }

  if (!access_token && refresh_token && typeof window !== 'undefined' && navigator.onLine) {
    isRefreshing = true
    const tokens = await refreshTokenRequest(refresh_token)
    isRefreshing = false
    for (const request of requestQueue) {
      request.config.headers && (request.config.headers.Authorization = `Bearer ${tokens?.access_token}`)
      request.resolve(request.config)
    }
    requestQueue = []
    tokens?.access_token && (access_token = tokens.access_token)
  }

  config.headers = {
    ...DEFAULT_HEADERS,
    ...(config.method === 'GET' && { Pragma: 'no-cache' }),
    ...config.headers,
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
  }
  delete config.params?.sort

  return config
}

async function responseInterceptor(error: AxiosError) {
  const cookies = parseCookies()

  const isOnline = typeof window !== 'undefined' && navigator.onLine

  const refresh_token = cookies['refresh_token']
  if (error.response?.status === 401 && isOnline) {
    if (refresh_token) {
      isRefreshing = true
      destroyCookie(null, ACCESS_TOKEN_COOKIES_NAME, { path: '/' })
      const tokens = await refreshTokenRequest(refresh_token)
      isRefreshing = false
      const authorizationHeader = `Bearer ${tokens?.access_token}`
      for (const request of requestQueue) {
        request.config.headers && (request.config.headers.Authorization = authorizationHeader)
        request.resolve(request.config)
      }
      requestQueue = []
      error.config.headers && (error.config.headers.Authorization = authorizationHeader)
      return httpClient(error.config)
    } else {
      logout()
    }
  }
  if (
    error.response?.status === 400 &&
    (error as AxiosError<{ error_description: string }>).response?.data?.error_description ===
      'refresh token is invalid, expired or revoked' &&
    isOnline
  ) {
    logout()
  }

  withScope(function (scope) {
    scope.addBreadcrumb({
      category: 'HTTP Client',
      message: 'Не обработанная ошибка при выполнении запроса, кроме 401 и обновления refresh_token',
      level: 'error',
    })

    error.config && scope.setContext('config', error.toJSON() as Record<string, unknown>)

    captureException(error)
  })

  return Promise.reject(error)
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
