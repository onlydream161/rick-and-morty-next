import '@testing-library/jest-dom/extend-expect'
// Через import не хочет работать
const mockRouter = require('next-router-mock')

global.ResizeObserver = require('resize-observer-polyfill')

jest.mock('next-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

jest.mock('next/router', () => mockRouter)
jest.mock('next/dist/client/router', () => mockRouter)
jest.mock('next/dist/shared/lib/router-context', () => {
  const { createContext } = require('react')
  const router = mockRouter.default
  const RouterContext = createContext(router)
  return { RouterContext }
})
