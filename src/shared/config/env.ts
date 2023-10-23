import getConfig from 'next/config'

const getEnv = (key: string) => {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

  const envVar = key.startsWith('NEXT_PUBLIC_') ? publicRuntimeConfig[key] : serverRuntimeConfig[key]

  if (!envVar && typeof window === 'undefined') {
    throw new Error(`Env variable ${key} is required`)
  }

  return envVar
}

export const IS_STORYBOOK = process.env.STORYBOOK_ENV

export const BASE_URL = IS_STORYBOOK ? 'http://storybook.mocks:3000' : getEnv('NEXT_PUBLIC_TARGET')
export const TOKEN_PATH = IS_STORYBOOK ? 'token' : getEnv('NEXT_PUBLIC_TOKEN_PATH')
export const REFRESH_TOKEN_REQUEST_TARGET = getEnv('NEXT_PUBLIC_REFRESH_TOKEN_REQUEST_TARGET')
export const REFRESH_TOKEN_GRANT_TYPE = getEnv('NEXT_PUBLIC_REFRESH_TOKEN_GRANT_TYPE')
export const REFRESH_TOKEN_SCOPE = getEnv('NEXT_PUBLIC_REFRESH_TOKEN_SCOPE')
export const API_MOCKING = getEnv('NEXT_PUBLIC_API_MOCKING')
export const CASDOOR_SERVER_URL = getEnv('NEXT_PUBLIC_CASDOOR_SERVER_URL')
export const CASDOOR_SESSION_STORAGE_NAME = getEnv('NEXT_PUBLIC_CASDOOR_SESSION_STORAGE_NAME')
export const CASDOOR_CLIENT_ID = getEnv('NEXT_PUBLIC_CASDOOR_CLIENT_ID')
export const CASDOOR_APP_NAME = getEnv('NEXT_PUBLIC_CASDOOR_APP_NAME')
export const CASDOOR_ORGANIZATION_NAME = getEnv('NEXT_PUBLIC_CASDOOR_ORGANIZATION_NAME')
export const MERCURE_TARGET = BASE_URL + getEnv('NEXT_PUBLIC_MERCURE_TARGET')
export const PROJECT_VERSION = getEnv('NEXT_PUBLIC_PROJECT_VERSION')
export const PROJECT_LAST_BUILD_DATE = getEnv('NEXT_PUBLIC_PROJECT_LAST_BUILD_DATE')

// Режим запуска программы
export const NODE_ENV = getEnv('NODE_ENV')
// Режим тестирования
export const isTestEnv = NODE_ENV === 'test'
// Режим разработки
export const isDevEnv = NODE_ENV === 'development'
// Режим продакшена
export const isProdEnv = NODE_ENV === 'production'
