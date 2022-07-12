import getConfig from 'next/config'

const getEnv = (key: string) => {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

  const envVar = key.startsWith('NEXT_PUBLIC_') ? publicRuntimeConfig[key] : serverRuntimeConfig[key]

  if (envVar === undefined && typeof window === 'undefined') {
    throw new Error(`Env variable ${key} is required`)
  }

  return envVar
}

export const BASE_TARGET = getEnv('NEXT_PUBLIC_TARGET')
export const API_PREFIX = getEnv('NEXT_PUBLIC_API_PREFIX')
export const TOKEN_PATH = getEnv('NEXT_PUBLIC_TOKEN_PATH')
export const BASE_URL = BASE_TARGET + '/' + API_PREFIX

// Режим запуска программы
export const NODE_ENV = getEnv('NODE_ENV')
// Режим разработки
export const isDevEnv = NODE_ENV === 'development'
// Режим продакшена
export const isProdEnv = NODE_ENV === 'production'
