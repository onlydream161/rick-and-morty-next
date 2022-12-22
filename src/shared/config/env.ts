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

export const BASE_TARGET = IS_STORYBOOK ? 'http://storybook.mocks:3000' : getEnv('NEXT_PUBLIC_TARGET')
export const API_PREFIX = IS_STORYBOOK ? 'api' : getEnv('NEXT_PUBLIC_API_PREFIX')
export const TOKEN_PATH = IS_STORYBOOK ? 'token' : getEnv('NEXT_PUBLIC_TOKEN_PATH')
export const BASE_URL = BASE_TARGET + '/' + API_PREFIX
export const API_MOCKING = getEnv('NEXT_PUBLIC_API_MOCKING')

// Режим запуска программы
export const NODE_ENV = getEnv('NODE_ENV')
// Режим тестирования
export const isTestEnv = NODE_ENV === 'test'
// Режим разработки
export const isDevEnv = NODE_ENV === 'development'
// Режим продакшена
export const isProdEnv = NODE_ENV === 'production'
